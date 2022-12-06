import type {
  FieldSchema,
  ParameterObject,
  SchemaObject,
  SchemaObjectType,
} from '../types';
import { getBodySchemaName, getResponseSchemaName } from './getSchemaName.js';
import {
  PARAMS_MORE_THAN_ONE_VALUES,
  RESPONSE_BODY_SCHEMA_NAMES,
  SCHEMA_OBJECT_TYPE,
} from './constants.js';

// prettier-ignore
const typesMap: Record<string, SchemaObject> = {
  String:               { type: 'string' },
  'String[]':           { type: 'array', items: { type: 'string' }},
  Integer:              { type: 'integer', format: 'int32' },
  'Unsigned Integer':   { type: 'integer', format: 'int32' },
  Int64:                { type: 'integer', format: 'int64' },
  float:                { type: 'number', format: 'float' },
  Boolean:              { type: 'boolean' },
  'Object':             { type: 'object' },
  'Object[]':           { type: 'array', items: { type: 'object' } },
  'map[string,string]': { type: 'object', additionalProperties: { type: 'string' } },
};

const parseType = (rawType: string): SchemaObject | null =>
  typesMap[rawType] ? structuredClone(typesMap[rawType]!) : null;

const extensionSchemaNames = {
  panel: 'UserExtensionPanel',
  overlay: 'UserExtensionOverlay',
  component: 'UserExtensionComponent',
} as const;

const parseParameter =
  (endpointId: string) =>
  ({
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
    // date-time
    if (
      (parameter.schema! as SchemaObject).type === 'string' &&
      (name.endsWith('_at') || description.includes('RFC3339'))
    ) {
      (parameter.schema! as SchemaObject).format = 'date-time';
    }

    // color can be either enum or string
    // https://dev.twitch.tv/docs/api/reference#update-user-chat-color
    if (endpointId === 'update-user-chat-color' && name === 'color') {
      // TODO: oneOf doesn't work with parameters
      // const colorEnum = parameter.schema!;
      // parameter.schema = {
      //   oneOf: [colorEnum, { type: 'string' }],
      // };
    }

    // required
    let _required = required === true;
    // mutually exclusive
    // https://dev.twitch.tv/docs/api/reference#get-clips
    // https://dev.twitch.tv/docs/api/reference#get-stream-markers
    // https://dev.twitch.tv/docs/api/reference#get-teams
    // https://dev.twitch.tv/docs/api/reference#get-videos
    // https://dev.twitch.tv/docs/api/reference#get-games
    const mutuallyExclusiveIds = [
      'get-clips',
      'get-stream-markers',
      'get-teams',
      'get-videos',
      'get-games',
    ];
    if (mutuallyExclusiveIds.includes(endpointId)) _required = false;
    if (_required) parameter.required = _required;

    // array
    const possibleArrays = PARAMS_MORE_THAN_ONE_VALUES[endpointId];
    if (possibleArrays && possibleArrays.includes(name)) {
      const s = parameter.schema as SchemaObject;
      s.items = { type: s.type! };
      s.type = 'array';
      parameter.explode = true;
    }
    return parameter;
  };

const parseProperties = (
  endpointId: string,
  fieldSchemas: FieldSchema[],
  schemaObjectType: SchemaObjectType,
  schemas: Record<string, SchemaObject>,
): SchemaObject => {
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

    // enum
    if (enumValues !== null) {
      if (property.type === 'array') {
        property.items!.enum = enumValues;
      } else {
        property.enum = enumValues;
      }
    }

    // nullable
    if (description.toLowerCase().includes('**null**')) {
      property.nullable = true;
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
    if (schemaObjectType === SCHEMA_OBJECT_TYPE.response && required === null) {
      _required = true;

      // "pagination" and "cursor" are always optional
      // https://dev.twitch.tv/docs/api/guide#pagination
      if (name === 'pagination' || name === 'cursor') {
        _required = false;
      }

      // https://dev.twitch.tv/docs/api/reference#get-extension-configuration-segment
      if (
        endpointId === 'get-extension-configuration-segment' &&
        name === 'broadcaster_id'
      ) {
        _required = false;
      }

      // https://dev.twitch.tv/docs/api/reference#create-eventsub-subscription
      // https://dev.twitch.tv/docs/api/reference#get-eventsub-subscriptions
      if (
        (endpointId === 'create-eventsub-subscription' ||
          endpointId === 'get-eventsub-subscriptions') &&
        ['callback', 'session_id', 'connected_at', 'disconnected_at'].includes(
          name,
        )
      ) {
        _required = false;
      }

      // only "active" is required
      // https://dev.twitch.tv/docs/api/reference#get-user-active-extensions
      // https://dev.twitch.tv/docs/api/reference#update-user-extensions
      if (
        endpointId === 'get-user-active-extensions' ||
        (endpointId === 'update-user-extensions' &&
          ['id', 'version', 'name', 'x', 'y'].includes(name))
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

        const schema = parseProperties(
          endpointId,
          children,
          schemaObjectType,
          schemas,
        );
        schemas[schemaName] = schema;

        // UserExtension${type}Update
        const updateSchema = structuredClone(schema);
        delete updateSchema.properties!['name'];
        schemas[schemaName + 'Update'] = updateSchema;
      }

      // array
      else if (property.type === 'array') {
        property.items = parseProperties(
          endpointId,
          children,
          schemaObjectType,
          schemas,
        );
      }

      // object
      else if (property.type === 'object') {
        property = {
          description,
          ...parseProperties(endpointId, children, schemaObjectType, schemas),
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

  if (schemaObject.type === 'object' && schemaObject.required!.length === 0) {
    delete schemaObject.required;
  }

  if (
    schemaObject.type === 'array' &&
    schemaObject.items!.required!.length === 0
  ) {
    delete schemaObject.items!.required;
  }

  return schemaObject;
};

const parseSchemaObject = (
  endpointId: string,
  endpointName: string,
  fieldSchemas: FieldSchema[],
  schemaObjectType: SchemaObjectType,
  schemas: Record<string, SchemaObject>,
): ParameterObject[] => {
  if (schemaObjectType === SCHEMA_OBJECT_TYPE.params) {
    return fieldSchemas.map(parseParameter(endpointId));
  }

  if (schemaObjectType === SCHEMA_OBJECT_TYPE.body) {
    const schemaName = getBodySchemaName(endpointName);
    const schemaObject = parseProperties(
      endpointId,
      fieldSchemas,
      schemaObjectType,
      schemas,
    );

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
    const schemaObject = parseProperties(
      endpointId,
      fieldSchemas,
      schemaObjectType,
      schemas,
    );

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

    const replaces = RESPONSE_BODY_SCHEMA_NAMES[endpointId];
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
