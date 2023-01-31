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
const TYPES_MAP: Record<string, SchemaObject> = {
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
  TYPES_MAP[rawType] ? structuredClone(TYPES_MAP[rawType]!) : null;

/** @deprecated */
const extensionSchemaNames = {
  panel: 'UserExtensionPanel',
  overlay: 'UserExtensionOverlay',
  component: 'UserExtensionComponent',
} as const;

export const parseParameter =
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
    if (TYPES_MAP[type]) {
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
  /** @deprecated */
  endpointId: string,
  fieldSchemas: FieldSchema[],
  /** @deprecated */
  schemaObjectType: SchemaObjectType,
  /** @deprecated */
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
    if (TYPES_MAP[type]) {
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

export const parseSchemaObject = (
  /** @deprecated */
  endpointId: string,
  fieldSchemas: FieldSchema[],
  /** @deprecated */
  schemaObjectType: SchemaObjectType,
  /** @deprecated */
  schemas: Record<string, SchemaObject>,
): SchemaObject => {
  return parseProperties(endpointId, fieldSchemas, schemaObjectType, schemas);
};
