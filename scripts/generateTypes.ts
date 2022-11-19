import type { ApiEndpoint, Interface, Parameter } from './types';
import {
  getBodyInterfaceName,
  getParamsInterfaceName,
  getResponseInterfaceName,
  moreThanOneValues,
} from './utils.js';

const typesMap: Record<string, string> = {
  String: 'string',
  'String[]': 'string[]',
  Integer: 'number',
  Int64: 'number',
  'Unsigned Integer': 'number',
  float: 'number',
  Boolean: 'boolean',
  Dictionary: 'Record<string, any>',
  'map[string]string': 'Record<string, string>',
  'map[string]Object': 'Record<string, Record<string, any>>',
  'map[string,string]': 'Record<string, string>',
};

const parseType = (rawType: string): string => typesMap[rawType] || rawType;

const generateTypes = (apiEndpoints: ApiEndpoint[]): string => {
  let types = '';

  apiEndpoints.forEach(
    ({ id, name, requestBody, requestQueryParams, responseBody }) => {
      const renderParameter = (
        interfaceName: string,
        p: Parameter,
        depth = 0,
      ) => {
        const offset = Array.from({ length: depth + 1 }, () => '  ').join('');

        if (p.description) {
          types += `${offset}/**\n`;
          types +=
            p.description
              .split('\n')
              .map((s) => `${offset} * ${s}`)
              .join('\n') + '\n';
          types += `${offset} */\n`;
        }

        const type = parseType(p.type);
        let finalType = type;

        let isArray = type.includes('[]');

        if (interfaceName.endsWith('Params')) {
          const isMoreThanOneIds = moreThanOneValues[id]?.includes(p.name);
          if (isMoreThanOneIds) {
            finalType = `${type} | ${type}[]`;
          }
        }

        let possibleValues = null;
        const possibleValuesMap: Record<string, string> = {
          // https://dev.twitch.tv/docs/api/reference#send-extension-pubsub-message
          'whisper-<user-id>': '`whisper-${string}`',
          // https://dev.twitch.tv/docs/api/reference#get-users
          '""': "''",
        };
        if (p.possibleValues.length > 0) {
          if (type.startsWith('number')) {
            possibleValues = p.possibleValues.join(' | ');
          }
          if (type.startsWith('string')) {
            possibleValues = p.possibleValues
              .map((v) => possibleValuesMap[v] || `'${v}'`)
              .join(' | ');
          }
          if (isArray) possibleValues += '[]';
          if (possibleValues) {
            finalType = possibleValues;
          }
        }
        const required = p.required ? '' : '?';

        if (p.children.length > 0) {
          types += `${offset}${p.name}${required}: {\n`;
          p.children.forEach((p1) =>
            renderParameter(interfaceName, p1, depth + 1),
          );
          types += `${offset}}${isArray ? '[];' : ';'}\n`;
        } else {
          types += `${offset}${p.name}${required}: ${finalType};\n`;
        }
      };

      const renderInterface = (
        name: string,
        { description, parameters }: Interface,
      ) => {
        if (description.length > 0) {
          types += `/**\n`;
          types += description.map((s) => ` * ${s}\n`).join(' *\n');
          types += ` */\n`;
        }

        types += `export interface ${name} {\n`;
        parameters.forEach((p) => renderParameter(name, p));
        types += `}\n\n`;
      };

      if (requestBody.parameters.length > 0) {
        renderInterface(getBodyInterfaceName(name), requestBody);
      }

      if (requestQueryParams.parameters.length > 0) {
        renderInterface(getParamsInterfaceName(name), requestQueryParams);
      }

      if (responseBody.parameters.length > 0) {
        renderInterface(getResponseInterfaceName(name), responseBody);
      }

      types += '\n\n';
    },
  );

  return types;
};

export default generateTypes;
