import type { FieldSchema, SchemaObjectType } from '../types';
import { SCHEMA_OBJECT_TYPE } from './constants.js';
import parseMarkdown from './parseMarkdown.js';

const parseTableSchema = (
  endpointId: string,
  table: Element,
  schemaObjectType: SchemaObjectType,
): FieldSchema[] => {
  const fieldSchemas: FieldSchema[] = [];

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
    if (schemaObjectType === SCHEMA_OBJECT_TYPE.params && depth > 0) {
      throw new Error("Query Parameters' depth cannot be greater than 0");
    }
    if (depth > 3) {
      throw new Error('Depth cannot be greater than 3: ' + endpointId);
    }

    const description = parseMarkdown(descriptionEl!.innerHTML!);

    // enum
    // TODO: whisper-<user-id>
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
      let liValues: string[] = [];
      descriptionEl.querySelectorAll('ul li').forEach((li) => {
        const value = li.textContent?.split('—')[0]!.trim();
        if (value) liValues!.push(value);
      });

      // "" in enum is an empty string
      // https://dev.twitch.tv/docs/api/reference#get-users
      liValues = liValues.map((s) => (s === '""' ? '' : s));

      if (liValues.length > 0) {
        enumValues =
          type === 'Integer'
            ? liValues.map((s) => Number.parseInt(s))
            : liValues;
      }
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

  // No "data" field in the response body
  // https://dev.twitch.tv/docs/api/reference#create-clip
  if (endpointId === 'create-clip' && schemaObjectType === 'response') {
    return [
      {
        name: 'data',
        type: 'Object[]',
        required: true,
        description: '',
        depth: 0,
        enumValues: null,
        children: fieldSchemas,
      },
    ];
  }

  return fieldSchemas;
};

export default parseTableSchema;
