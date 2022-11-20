import type { ApiEndpoint, Templates } from './types';
import {
  getBodyInterfaceName,
  getMethodName,
  getParamsInterfaceName,
  getResponseInterfaceName,
  lowerFirstLetter,
  moreThanOneValues,
} from './utils.js';

type Line = [ident: number, text: string];

const joinLines = (lines: Line[]) =>
  lines.reduce((acc, [ident, text]) => {
    acc += Array.from({ length: ident }, () => '  ').join('');
    acc += text + '\n';
    return acc;
  }, '');

const generateApi = (
  apiEndpoints: ApiEndpoint[],
  templates: Templates,
): string => {
  const imports: string[] = [];
  let api: Line[] = [];

  const mainTemplate = templates['main']!;
  const methodCommentTemplate = templates['method-comment']!;

  const resources: Record<string, ApiEndpoint[]> = {};

  for (const endpoint of apiEndpoints) {
    if (!resources[endpoint.resource]) resources[endpoint.resource] = [];
    resources[endpoint.resource]!.push(endpoint);
  }

  for (const [resource, endpoints] of Object.entries(resources)) {
    const resourceName = lowerFirstLetter(resource.replaceAll(' ', ''));

    api.push([1, `${resourceName} = {`]);

    for (const {
      id,
      name,
      descriptionFull,
      authentication,
      authorization,
      url,
      method,
      requestBody,
      requestQueryParams,
      responseBody,
      responseCodes,
      examples,
    } of endpoints) {
      let auth = '';
      let authType = '';
      if (authorization.length > 0) {
        authType = 'Authorization';
        auth = authorization.join('\n\n');
      }
      if (authentication.length > 0) {
        authType = 'Authentication';
        auth = authentication.join('\n\n');
      }

      const responseCodesText = responseCodes
        .reduce((acc, [code, description]) => {
          acc += `### ${code}\n\n`;
          acc += description + '\n\n';
          return acc;
        }, '')
        .trim();

      const comment = methodCommentTemplate
        .replace('%DESCRIPTION%', descriptionFull.join('\n\n'))
        .replace('%AUTH_TYPE%', authType)
        .replace('%AUTH%', auth)
        .replace('%METHOD%', method)
        .replace('%URL%', url)
        .replace('%EXAMPLES%', examples)
        .replace('%RESPONSE_CODES%', responseCodesText)
        .replace(
          '%DOCS_URL%',
          `https://dev.twitch.tv/docs/api/reference#${id}`,
        );

      api.push([2, '/**']);
      comment
        .split('\n')
        .forEach((line) => api.push([2, ` * ${line}`.trimEnd()]));
      api.push([2, ' */']);

      const hasParams = requestQueryParams.parameters.length > 0;
      const hasBody = requestBody.parameters.length > 0;
      const hasResponse = responseBody.parameters.length > 0;

      let methodTemplate = '';

      if (!hasParams && !hasBody) {
        methodTemplate = templates['method-signature-no-params-no-body']!;
      }
      if (!hasParams && hasBody) {
        methodTemplate = templates['method-signature-no-params-body']!;
      }
      if (hasParams && !hasBody) {
        methodTemplate = templates['method-signature-params-no-body']!;
      }
      if (hasParams && hasBody) {
        methodTemplate = templates['method-signature-params-body']!;
      }

      const methodName = getMethodName(name);

      const responseType = getResponseInterfaceName(name);
      const paramsType = getParamsInterfaceName(name);
      const bodyType = getBodyInterfaceName(name);

      let methodSignature = methodTemplate
        .replace('%METHOD_NAME%', methodName)
        .replace('%URL%', url)
        .replace('%METHOD%', method)
        .replace("    method: 'GET',\n", '');

      if (hasResponse) {
        methodSignature = methodSignature.replace(
          '%RESPONSE_TYPE%',
          responseType,
        );
        imports.push(responseType);
      } else {
        methodSignature = methodSignature.replace('%RESPONSE_TYPE%', 'void');
      }

      if (hasParams) {
        const possibleArrays = moreThanOneValues[id]! || [];
        methodSignature = methodSignature
          .replace('%PARAMS_TYPE%', paramsType)
          .replace('%POSSIBLE_ARRAYS%', JSON.stringify(possibleArrays));
        imports.push(paramsType);
      }

      if (hasBody) {
        methodSignature = methodSignature.replace('%BODY_TYPE%', bodyType);
        imports.push(bodyType);
      }

      methodSignature.split('\n').map((line) => api.push([2, line]));
    }

    api.push([1, '};']);
  }

  return (
    mainTemplate
      .replace('%IMPORTS%', imports.map((line) => `  ${line},`).join('\n'))
      .replace('%CONTENT%', joinLines(api).trim()) + '\n'
  );
};

export default generateApi;
