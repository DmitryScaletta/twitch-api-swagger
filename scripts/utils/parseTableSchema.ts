import type { FieldSchema } from '../types';
import { SchemaObjectType, SCHEMA_OBJECT_TYPE } from './constants.js';
import parseMarkdown from './parseMarkdown.js';

// Not a table
// https://dev.twitch.tv/docs/api/reference#check-user-subscription
const checkUserSubscriptionFields: FieldSchema[] = [
  {
    name: 'broadcaster_id',
    type: 'String',
    required: true,
    depth: 0,
    description: 'The ID of a partner or affiliate broadcaster.',
    enumValues: null,
    children: [],
  },
  {
    name: 'user_id',
    type: 'String',
    required: true,
    depth: 0,
    description:
      'The ID of the user that you’re checking to see whether they subscribe to the broadcaster in broadcaster_id. This ID must match the user ID in the access Token.',
    enumValues: null,
    children: [],
  },
];

const parseTableSchema = (
  endpointId: string,
  table: Element,
  schemaObjectType: SchemaObjectType,
): FieldSchema[] => {
  const fieldSchemas: FieldSchema[] = [];

  if (schemaObjectType === SCHEMA_OBJECT_TYPE.params) {
    // not a table
    if (endpointId === 'check-user-subscription') {
      return checkUserSubscriptionFields;
    }
  }

  table.querySelectorAll('tbody tr').forEach((tr) => {
    const parameterEl = tr.children[0]!;
    const typeEl = tr.children[1];
    const requiredEl = tr.children.length === 4 ? tr.children[2] : null;
    const descriptionEl =
      tr.children.length === 4 ? tr.children[3]! : tr.children[2]!;

    const name = parameterEl?.textContent?.trim()!;

    // type
    const type = typeEl?.textContent?.trim()!;

    // required
    let required: FieldSchema['required'] = null;
    const requiredText = requiredEl?.textContent?.trim();
    if (requiredText) required = requiredText === 'Yes';

    // depth
    const parameterText = parameterEl.textContent!;
    let nbspCount = 0;
    for (let i = 0; i < parameterText.length; i += 1) {
      if (parameterText[i] === '\xa0') nbspCount += 1;
      else break;
    }
    // sometimes ident can be 2 so use Math.ceil
    let depth = Math.ceil(nbspCount / 3);
    // wrong depth
    // https://dev.twitch.tv/docs/api/reference#create-stream-marker
    if (
      schemaObjectType === SCHEMA_OBJECT_TYPE.response &&
      endpointId === 'create-stream-marker'
    ) {
      if (depth === 2) depth = 1;
    }
    if (schemaObjectType === SCHEMA_OBJECT_TYPE.params && depth > 0) {
      throw new Error("Query Parameters' depth cannot be greater than 0");
    }
    if (depth > 3) {
      throw new Error('Depth cannot be greater than 3: ' + endpointId);
    }

    const description = parseMarkdown(descriptionEl!.innerHTML!);

    // enum
    let enumValues: FieldSchema['enumValues'] = null;
    if (
      [
        'values are:',
        'formats are:',
        'sizes are:',
        'tiers are:',
        'themes are:',
        'following named color values',
      ].some((s) => descriptionEl.textContent!.includes(s))
    ) {
      enumValues = [];
      descriptionEl.querySelectorAll('ul li').forEach((li) => {
        const value = li.textContent?.split('—')[0]?.trim();
        if (value) enumValues!.push(value);
      });
    }

    const fieldSchema: FieldSchema = {
      name,
      type,
      required,
      description,
      depth,
      enumValues,
      children: [],
    };

    const addFieldSchema = (
      schemas: FieldSchema[],
      schema: FieldSchema,
      depth: number,
    ) => {
      if (depth === 0) {
        schemas.push(schema);
      } else {
        addFieldSchema(schemas.at(-1)!.children, schema, depth - 1);
      }
    };

    addFieldSchema(fieldSchemas, fieldSchema, depth);
  });

  return fieldSchemas;
};

export default parseTableSchema;
