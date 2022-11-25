import type { FieldSchema, ParameterObject, SchemaObject } from '../types';
import {
  getBodySchemaName,
  getResponseSchemaName,
  moreThanOneValues,
} from '../utils.js';
import { SchemaObjectType, SCHEMA_OBJECT_TYPE } from './constants.js';
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

  // 'map[string]string':  { $ref: '#/components/schemas/StringStringMap' },
  // 'map[string,string]': { $ref: '#/components/schemas/StringStringMap' },

  // https://dev.twitch.tv/docs/api/reference#get-stream-markers
  // 'Object[]': 'Record<string, any>',
};

const parseType = (rawType: string): SchemaObject | null =>
  typesMap[rawType] ? structuredClone(typesMap[rawType]!) : null;

const extensionSchemaNames = {
  panel: 'ExtensionPanel',
  overlay: 'ExtensionOverlay',
  component: 'ExtensionComponent',
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
      depth,
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

          schemas[schemaName] = parseProperties(children);
        }

        // array
        else if (property.type === 'array') {
          property.items = parseProperties(children);
        }

        // object
        else if (property.type === 'object') {
          property = parseProperties(children);
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

    // TODO: no "name" field
    // https://dev.twitch.tv/docs/api/reference#update-user-extensions
    if (endpointId === 'update-user-extensions') {
      const description = schemaObject.properties!['data']!.description!;
      // prettier-ignore
      schemaObject.properties!['data'] = {
        description,
        properties: {
          panel: {
            type: 'object',
            additionalProperties: { $ref: `#/components/schemas/${extensionSchemaNames.panel}` },
          },
          overlay: {
            type: 'object',
            additionalProperties: { $ref: `#/components/schemas/${extensionSchemaNames.overlay}` },
          },
          component: {
            type: 'object',
            additionalProperties: { $ref: `#/components/schemas/${extensionSchemaNames.component}` },
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
    // Response: data[] -> tiers[] -> images = $ref: CheermoteImages
    if (endpointId === 'get-cheermotes') {
      // prettier-ignore
      schemaObject.properties!['data']!.items!.properties!['tiers']!.items!.properties!['images'] = {
        $ref: '#/components/schemas/CheermoteImages',
      };
    }

    // https://dev.twitch.tv/docs/api/reference#get-extensions
    // https://dev.twitch.tv/docs/api/reference#get-released-extensions
    // Response: data[] -> icon_urls = $ref: ExtensionIconUrls;
    if (
      endpointId === 'get-extensions' ||
      endpointId === 'get-released-extensions'
    ) {
      schemaObject.properties!['data']!.items!.properties!['icon_urls'] = {
        $ref: '#/components/schemas/ExtensionIconUrls',
      };
    }

    schemas[schemaName] = schemaObject;
  }

  return [];
};

export default parseSchemaObject;
