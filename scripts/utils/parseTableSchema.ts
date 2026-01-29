import type { FieldSchema } from '../types.ts';
import parseMarkdown from './parseMarkdown.ts';

const parseTableSchema = (table: Element): FieldSchema[] => {
  const fieldSchemas: FieldSchema[] = [];

  let parameterIdx = -1;
  let typeIdx = -1;
  let requiredIdx = -1;
  let descriptionIdx = -1;

  table.querySelectorAll('thead th').forEach((th, i) => {
    const thText = th.textContent!.trim().toLowerCase();
    if (['fields', 'field', 'parameter', 'name'].includes(thText)) {
      return (parameterIdx = i);
    }
    if (thText === 'type') {
      return (typeIdx = i);
    }
    if (thText === 'required?' || thText === 'required') {
      return (requiredIdx = i);
    }
    if (thText === 'description') {
      return (descriptionIdx = i);
    }
    return;
  });

  if (parameterIdx === -1 || typeIdx === -1 || descriptionIdx === -1) {
    throw new Error(
      'Cannot find table schema headers: ' +
        table.querySelector('thead')!.textContent,
    );
  }

  table.querySelectorAll('tbody tr').forEach((tr) => {
    const parameterEl = tr.children[parameterIdx]!;
    const typeEl = tr.children[typeIdx];
    const requiredEl = requiredIdx !== -1 ? tr.children[requiredIdx] : null;
    const descriptionEl = tr.children[descriptionIdx]!;

    const name = parameterEl?.textContent?.trim()!;
    const descriptionText = descriptionEl.textContent!;
    const descriptionTextLower = descriptionText.toLowerCase();

    // type
    const type = typeEl?.textContent?.trim()!;

    // required
    // Not required description examples:
    //   NOTE: This field is required only if you don’t specify the id query parameter.
    //   The response includes this field only if
    //   The object includes this field only if
    //   Specify this field only if
    //   Included only if
    //   if any.
    let required: FieldSchema['required'] = null;
    const requiredText = requiredEl?.textContent?.trim();
    if (requiredText) required = requiredText === 'Yes';
    if (
      [
        'required only if',
        'included only if',
        'this field only if',
        'if any.',
      ].some((s) => descriptionTextLower.includes(s))
    ) {
      required = false;
    }

    // depth
    const parameterText = parameterEl.textContent!;
    let nbspCount = 0;
    for (let i = 0; i < parameterText.length; i += 1) {
      if (parameterText[i] === '\xa0' || parameterText[i] === ' ') {
        nbspCount += 1;
      } else break;
    }
    // sometimes indentation can be 2 so use Math.ceil
    let depth = Math.ceil(nbspCount / 3);
    if (depth > 4) {
      throw new Error("Depth can't be greater than 4: " + name);
    }

    const description = parseMarkdown(descriptionEl!.innerHTML!);

    // TODO: min, max, default
    // Possible values are: 0 (no restriction) through 129600 (3 months). The default is 0.
    // Possible values are: 3 (3 second delay) through 120 (2 minute delay). The default is 30 seconds.
    // The highest level that the Hype Train reached (the levels are 1 through 5).

    // enum
    // TODO: "Valid values are", "Possible values are" without ul li (follower_mode_duration, slow_mode_wait_time)
    // https://dev.twitch.tv/docs/api/reference/#update-chat-settings
    // TODO: add default value and enum for the `locale` query parameter
    // https://dev.twitch.tv/docs/api/reference/#get-content-classification-labels
    // TODO: whisper-<user-id>

    let enumValues: FieldSchema['enumValues'] = null;
    let enumDefault: FieldSchema['enumDefault'] = null;
    const ENUM_DESC = [
      'values are:',
      'formats are:',
      'sizes are:',
      'tiers are:',
      'themes are:',
      'following named color values',
      'following values',
    ];
    if (ENUM_DESC.some((s) => descriptionTextLower.includes(s))) {
      let enumValuesRaw: string[] = [];

      // get enum values from li
      descriptionEl.querySelectorAll('ul li').forEach((li) => {
        const value = li.textContent?.split(/([—:]| - )/)[0]!.trim();
        if (value) enumValuesRaw!.push(value);
      });

      // if empty, get enum values from description
      if (enumValuesRaw.length === 0) {
        const enumRegex = new RegExp(
          `(?:${ENUM_DESC.join('|')})\s*(?<values>[^.\n]+)`,
        );
        const m = descriptionText.match(enumRegex);
        if (m) {
          const { values } = m.groups as { values: string };
          // skip range values
          if (!values.includes(' through ')) {
            enumValuesRaw = values
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean);
          }
        } else {
          console.warn('Cannot find enum values:');
          console.warn({ name, descriptionText });
        }
      }

      if (enumValuesRaw.length > 0) {
        enumValues = enumValuesRaw.map((s) => {
          // "" in enum is an empty string
          // https://dev.twitch.tv/docs/api/reference#get-users
          if (s === '""') return '';

          // https://dev.twitch.tv/docs/api/reference/#send-chat-announcement
          if (s.endsWith(' (default)')) {
            s = s.replace(' (default)', '');
            enumDefault = s;
          }

          if (type === 'Integer') {
            const n = Number.parseInt(s);
            if (enumDefault !== null) enumDefault = n;
            return n;
          }
          return s;
        });
      }
    }

    const fieldSchema: FieldSchema = {
      name,
      type,
      required,
      description,
      depth,
      enumValues,
      enumDefault,
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
