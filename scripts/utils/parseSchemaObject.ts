import type { FieldSchema, ParameterObject, SchemaObject } from '../types';
import {
  getBodySchemaName,
  getResponseSchemaName,
  moreThanOneValues,
} from '../utils.js';
import {
  responseBodySchemaNames,
  SchemaObjectType,
  SCHEMA_OBJECT_TYPE,
} from './constants.js';
import parseTableSchema from './parseTableSchema.js';

// prettier-ignore
const typesMap: Record<string, SchemaObject> = {
  String:             { type: 'string' },
  'String[]':         { type: 'array', items: { type: 'string' }},
  Integer:            { type: 'integer', format: 'int32' },
  'Unsigned Integer': { type: 'integer', format: 'int32' },
  Int64:              { type: 'integer', format: 'int64' },
  float:              { type: 'number', format: 'float' },
  Boolean:            { type: 'boolean' },
  'Object':           { type: 'object' },
  'Object[]':         { type: 'array', items: { type: 'object' } },
};

const parseType = (rawType: string): SchemaObject | null =>
  typesMap[rawType] ? structuredClone(typesMap[rawType]!) : null;

const extensionSchemaNames = {
  panel: 'UserExtensionPanel',
  overlay: 'UserExtensionOverlay',
  component: 'UserExtensionComponent',
} as const;

const parseSchemaObject = (
  endpointId: string,
  endpointName: string,
  table: Element,
  schemaObjectType: SchemaObjectType,
  schemas: Record<string, SchemaObject>,
): ParameterObject[] => {
  const fieldSchemas = parseTableSchema(endpointId, table, schemaObjectType);

  const parseParameter = ({
    name,
    type,
    required,
    description,
    enumValues,
  }: FieldSchema): ParameterObject => {
    let parameter: ParameterObject = {
      name,
      in: 'query',
      description,
      schema: {
        type,
      },
    };

    // enum
    if (enumValues !== null) {
      (parameter.schema as SchemaObject).enum = enumValues;
    }

    // type
    if (typesMap[type]) {
      parameter.schema = { ...parameter.schema, ...parseType(type)! };
    }

    // required
    let _required = required === true;
    // mutually exclusive
    // https://dev.twitch.tv/docs/api/reference#get-clips
    // https://dev.twitch.tv/docs/api/reference#get-stream-markers
    // https://dev.twitch.tv/docs/api/reference#get-teams
    // https://dev.twitch.tv/docs/api/reference#get-videos
    const mutuallyExclusiveIds = [
      'get-clips',
      'get-stream-markers',
      'get-teams',
      'get-videos',
    ];
    if (mutuallyExclusiveIds.includes(endpointId)) _required = false;
    if (_required) parameter.required = _required;

    // array
    const possibleArrays = moreThanOneValues[endpointId];
    if (possibleArrays && possibleArrays.includes(name)) {
      const s = parameter.schema as SchemaObject;
      s.items = { type: s.type! };
      s.type = 'array';
      parameter.explode = true;
    }
    return parameter;
  };

  const parseProperties = (fieldSchemas: FieldSchema[]): SchemaObject => {
    const schemaObject: SchemaObject = {
      type: 'object',
      required: [],
      properties: {},
    };

    const parseProperty = ({
      name,
      type,
      required,
      description,
      enumValues,
      children,
    }: FieldSchema) => {
      let property: SchemaObject = {
        type,
        description,
      };

      // enum
      if (enumValues !== null) {
        property.enum = enumValues;
      }

      // type
      if (typesMap[type]) {
        property = { ...property, ...parseType(type)! };
      }
      if (
        property.type === 'string' &&
        (name.endsWith('_at') || description.includes('RFC3339'))
      ) {
        property.format = 'date-time';
      }

      // required
      let _required = required === true;
      if (schemaObjectType === SCHEMA_OBJECT_TYPE.body) {
        // if there is no required column in the table - set all parameters to required
        if (required === null) _required = true;

        // All fields are required
        // https://dev.twitch.tv/docs/api/reference#start-commercial
        if (endpointId === 'start-commercial') {
          _required = true;
        }

        // All fields are optional
        // https://dev.twitch.tv/docs/api/reference#update-chat-settings
        // https://dev.twitch.tv/docs/api/reference#update-automod-settings
        if (
          endpointId === 'update-chat-settings' ||
          endpointId === 'update-automod-settings'
        ) {
          _required = false;
        }
      }
      if (_required!) {
        schemaObject.required!.push(name);
      }

      // children
      if (children.length > 0) {
        // map[string]Object type
        // https://dev.twitch.tv/docs/api/reference#get-user-active-extensions
        // https://dev.twitch.tv/docs/api/reference#update-user-extensions
        if (property.type === 'map[string]Object') {
          property.type = 'object';

          if (!Object.keys(extensionSchemaNames).includes(name)) {
            throw new Error(
              'Wrong property name for type map[string]Object: ' + endpointId,
            );
          }

          const schemaName =
            extensionSchemaNames[name as keyof typeof extensionSchemaNames];

          property.additionalProperties = {
            $ref: `#/components/schemas/${schemaName}`,
          };

          const schema = parseProperties(children);
          schemas[schemaName] = schema;

          // UserExtension${type}Update
          const updateSchema = structuredClone(schema);
          delete updateSchema.properties!['name'];
          schemas[schemaName + 'Update'] = updateSchema;
        }

        // array
        else if (property.type === 'array') {
          property.items = parseProperties(children);
        }

        // object
        else if (property.type === 'object') {
          property = {
            description,
            ...parseProperties(children),
          };
        }

        if (property.type !== 'array' && property.type !== 'object') {
          console.warn(
            'Wrong nested property type: ' + property.type + ' ' + endpointId,
          );
        }
      }

      schemaObject.properties![name] = property;
    };

    fieldSchemas.forEach(parseProperty);

    return schemaObject;
  };

  if (schemaObjectType === SCHEMA_OBJECT_TYPE.params) {
    return fieldSchemas.map(parseParameter);
  }

  if (schemaObjectType === SCHEMA_OBJECT_TYPE.body) {
    const schemaName = getBodySchemaName(endpointName);
    const schemaObject = parseProperties(fieldSchemas);

    // https://dev.twitch.tv/docs/api/reference#update-user-extensions
    if (endpointId === 'update-user-extensions') {
      const description = schemaObject.properties!['data']!.description!;
      // prettier-ignore
      schemaObject.properties!['data'] = {
        description,
        properties: {
          panel: {
            type: 'object',
            additionalProperties: { $ref: `#/components/schemas/${extensionSchemaNames.panel}Update` },
          },
          overlay: {
            type: 'object',
            additionalProperties: { $ref: `#/components/schemas/${extensionSchemaNames.overlay}Update` },
          },
          component: {
            type: 'object',
            additionalProperties: { $ref: `#/components/schemas/${extensionSchemaNames.component}Update` },
          },
        },
      };
    }

    schemas[schemaName] = schemaObject;
  }

  if (schemaObjectType === SCHEMA_OBJECT_TYPE.response) {
    const schemaName = getResponseSchemaName(endpointName);
    const schemaObject = parseProperties(fieldSchemas);

    // https://dev.twitch.tv/docs/api/reference#get-cheermotes
    // Response: data[] -> tiers[] -> images
    if (endpointId === 'get-cheermotes') {
      const cheermoteImagesSchemaName = 'CheermoteImages';
      schemas['CheermoteImageFormat'] = {
        type: 'object',
        properties: {
          '1': { type: 'string' },
          '1.5': { type: 'string' },
          '2': { type: 'string' },
          '3': { type: 'string' },
          '4': { type: 'string' },
        },
      };
      schemas['CheermoteImageTheme'] = {
        type: 'object',
        properties: {
          animated: { $ref: '#/components/schemas/CheermoteImageFormat' },
          static: { $ref: '#/components/schemas/CheermoteImageFormat' },
        },
      };
      schemas[cheermoteImagesSchemaName] = {
        type: 'object',
        properties: {
          light: { $ref: '#/components/schemas/CheermoteImageTheme' },
          dark: { $ref: '#/components/schemas/CheermoteImageTheme' },
        },
      };
      // prettier-ignore
      schemaObject.properties!['data']!.items!.properties!['tiers']!.items!.properties!['images'] = {
        $ref: `#/components/schemas/${cheermoteImagesSchemaName}`,
      };
    }

    // https://dev.twitch.tv/docs/api/reference#get-extensions
    // https://dev.twitch.tv/docs/api/reference#get-released-extensions
    // Response: data[] -> icon_urls
    if (
      endpointId === 'get-extensions' ||
      endpointId === 'get-released-extensions'
    ) {
      const dataProps = schemaObject.properties!['data']!.items!.properties!;
      const extensionIconUrlsSchemaName = 'ExtensionIconUrls';
      const extensionIconUrlsSchema = {
        type: 'object',
        description: dataProps['icon_urls']!.description!,
        properties: {
          '100x100': { type: 'string' },
          '24x24': { type: 'string' },
          '300x200': { type: 'string' },
        },
      };
      schemas[extensionIconUrlsSchemaName] = extensionIconUrlsSchema;
      dataProps['icon_urls'] = {
        $ref: `#/components/schemas/${extensionIconUrlsSchemaName}`,
      };
    }

    // https://dev.twitch.tv/docs/api/reference#get-soundtrack-current-track
    // Response: data[] -> track
    if (endpointId === 'get-soundtrack-current-track') {
      schemaObject.properties!['data']!.items!.properties!['track'] = {
        $ref: '#/components/schemas/SoundtrackTrack',
      };
    }

    const replaces = responseBodySchemaNames[endpointId];
    if (replaces) {
      replaces.reverse().forEach(([path, nestedSchemaName]) => {
        let prop: SchemaObject = schemaObject;
        if (path === 'data[0]') {
          prop = schemaObject.properties!['data']!;
        } else {
          const fullPath = path.split('.');
          if (fullPath.length > 2) throw new Error('Invalid path: ' + path);
          const [path1, path2] = fullPath;
          prop =
            path1 === 'data[0]'
              ? schemaObject.properties!['data']!.items!.properties![path2!]!
              : schemaObject.properties!['data']!.properties![path2!]!;
        }

        if (!prop) throw new Error('No property for replacing: ' + endpointId);
        if (prop.type !== 'array') {
          throw new Error('Wrong property type: ' + endpointId);
        }

        const nestedSchema = prop.items!;
        prop.items = { $ref: `#/components/schemas/${nestedSchemaName}` };

        schemas[nestedSchemaName] = nestedSchema;
      });
    }

    schemas[schemaName] = schemaObject;
  }

  return [];
};

export default parseSchemaObject;