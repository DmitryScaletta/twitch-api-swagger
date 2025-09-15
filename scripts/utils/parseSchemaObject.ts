import type { FieldSchema, ParameterObject, SchemaObject } from '../types.ts';
import { PARAMS_MORE_THAN_ONE_VALUES } from './constants.ts';

// prettier-ignore
const TYPES_MAP: Record<string, SchemaObject> = {
  String:               { type: 'string' },
  'String[]':           { type: 'array', items: { type: 'string' }},
  Integer:              { type: 'integer', format: 'int32' },
  'Unsigned Integer':   { type: 'integer', format: 'int32' },
  Int64:                { type: 'integer', format: 'int64' },
  float:                { type: 'number', format: 'float' },
  Boolean:              { type: 'boolean' },
  Bool:                 { type: 'boolean' },
  'Object':             { type: 'object' },
  'Object[]':           { type: 'array', items: { type: 'object' } },
  'map[string,string]': { type: 'object', additionalProperties: { type: 'string' } },
  'map[string]Object':  { type: 'object', additionalProperties: { type: 'object' } },

  'Session[]':          { type: 'array', items: { type: 'object' } },
  'Invite[]':           { type: 'array', items: { type: 'object' } },
  'Label[]':            { type: 'array', items: { type: 'object' } },
  'MediaSettings':      { type: 'object' },
};

const parseType = (rawType: string): SchemaObject | null =>
  TYPES_MAP[rawType] ? structuredClone(TYPES_MAP[rawType]!) : null;

export const parseParameterObject =
  (endpointId: string) =>
  ({
    name,
    type,
    required,
    description,
    enumValues,
    enumDefault,
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
      if (enumDefault !== null) {
        (parameter.schema as SchemaObject).default = enumDefault;
      }
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

export const parseSchemaObject = (
  fieldSchemas: FieldSchema[],
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
    enumDefault,
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
        if (enumDefault !== null) {
          property.items!.default = enumDefault;
        }
      } else {
        property.enum = enumValues;
        if (enumDefault !== null) {
          property.default = enumDefault;
        }
      }
    }

    // nullable
    if (description.toLowerCase().includes('**null**')) {
      property.nullable = true;
    }

    // required
    let _required = required === true;
    if (_required!) {
      schemaObject.required!.push(name);
    }

    // children
    if (children.length > 0) {
      // array
      if (property.type === 'array') {
        property.items = parseSchemaObject(children);
      }

      // object
      if (property.type === 'object') {
        if (type === 'map[string]Object') {
          property.additionalProperties = parseSchemaObject(children);
        } else {
          property = {
            description,
            ...parseSchemaObject(children),
          };
        }
      }

      if (property.type !== 'array' && property.type !== 'object') {
        console.warn('Wrong nested property type: ' + property.type);
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
