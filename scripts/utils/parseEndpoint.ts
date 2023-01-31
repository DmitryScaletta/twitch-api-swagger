import type {
  ApiReference,
  Descriptions,
  ExampleObject,
  MediaTypeObject,
  Method,
  OpenApi,
  OperationObject,
  ParameterObject,
  PathItemObject,
  RequestBodyObject,
  ResponseObject,
  ResponsesObject,
} from '../types';
import { getBodySchemaName, getResponseSchemaName } from './getSchemaName.js';
import { SCHEMA_OBJECT_TYPE } from './constants.js';
import parseExamples from './parseExamples.js';
import parseMarkdown from './parseMarkdown.js';
import parseResponses from './parseResponses.js';
import parseTableSchema from './parseTableSchema.js';
import parseSchemaObject from './parseSchemaObject.js';
import parseTableAsMarkdown from './parseTableAsMarkdown.js';
import getDescriptionText from './getDescriptionText.js';

// https://regex101.com/r/omJKyZ/1
const SCOPE_REGEX = /(:?\*\*([a-z:_\\]+)\*\*|`([a-z:_]+)`)/g;

const parseScopes = (lines: string[]) => {
  const scopes: string[] = [];
  for (const line of lines) {
    let m = SCOPE_REGEX.exec(line);
    while (m !== null) {
      const scope = m[2] || m[3];
      if (scope?.includes(':')) {
        scopes.push(scope.replaceAll('\\', ''));
      }
      m = SCOPE_REGEX.exec(line);
    }
  }
  return scopes;
};

const getOpenApiExamples = (examples: ExampleObject[]) =>
  examples.reduce((acc, example, i) => {
    let exampleTitle = 'Example';
    if (examples.length > 1) exampleTitle += ` ${i + 1}`;
    acc[exampleTitle] = example;
    return acc;
  }, {} as Record<string, ExampleObject>);

const parseEndpoint =
  (apiReference: Map<string, ApiReference>, openApi: OpenApi) =>
  (sectionEl: Element) => {
    const [leftDocs, rightDocs] = sectionEl.children;

    const id = leftDocs!.querySelector('h2')!.getAttribute('id')!;
    const name = leftDocs!.querySelector('h2')!.textContent!.trim();
    let requestBody: RequestBodyObject;
    let parameters: ParameterObject[] = [];
    let responses: ResponsesObject = {};
    const descriptions: Descriptions = {
      main: [],
      authentication: [],
      authorization: [],
      queryParameters: [],
      requestBody: [],
      responseBody: [],
    };
    let url = '';
    let method = '';

    let currentSection = 'description';
    let hasResponseSchema = false;

    const { bodyObjects, examples } = parseExamples(id, rightDocs!);

    for (const el of leftDocs!.children) {
      if (el.tagName === 'H2' || el.className === 'editor-link') continue;
      if (el.tagName === 'H3') {
        currentSection = el!.textContent!.trim();
        continue;
      }

      if (currentSection === 'description') {
        if (el.tagName === 'TABLE') {
          descriptions.main.push(parseTableAsMarkdown(el));
        } else {
          descriptions.main.push(parseMarkdown(el.innerHTML));
        }
      }

      if (currentSection === 'Authentication') {
        descriptions.authentication.push(parseMarkdown(el.innerHTML));
      }

      if (currentSection === 'Authorization') {
        descriptions.authorization.push(parseMarkdown(el.innerHTML));
      }

      // URL
      if (currentSection.toLowerCase().includes('url')) {
        // no method
        // https://dev.twitch.tv/docs/api/reference#get-stream-key
        if (id === 'get-stream-key') {
          el.textContent = 'GET ' + el.textContent;
        }

        [method, url] = el.textContent!.trim().split(' ') as [string, string];
      }

      // Request Body
      if (currentSection.toLocaleLowerCase().includes('request body')) {
        if (el.tagName === 'TABLE') {
          parseSchemaObject(
            id,
            name,
            parseTableSchema(el),
            SCHEMA_OBJECT_TYPE.body,
            openApi.components.schemas,
          );
          const schemaName = getBodySchemaName(name);
          const examples =
            bodyObjects.length > 0
              ? getOpenApiExamples(bodyObjects)
              : undefined;

          requestBody = {
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${schemaName}` },
                examples,
              } as MediaTypeObject,
            },
          };
        } else {
          descriptions.requestBody.push(parseMarkdown(el.innerHTML));
        }
      }

      // Request Query Parameters | Request Query Parameter
      if (currentSection.toLowerCase().includes('query parameter')) {
        if (el.tagName === 'TABLE') {
          const fieldSchemas = parseTableSchema(el);

          if (fieldSchemas.some((field) => field.children.length > 0)) {
            throw new Error("Query Parameters can't have children");
          }

          parameters = parseSchemaObject(
            id,
            name,
            fieldSchemas,
            SCHEMA_OBJECT_TYPE.params,
            openApi.components.schemas,
          );
        } else {
          descriptions.queryParameters.push(parseMarkdown(el.innerHTML));
        }
      }

      if (currentSection.toLowerCase().includes('response body')) {
        if (el.tagName === 'TABLE') {
          let fieldSchemas = parseTableSchema(el);

          // No "data" field in the response body
          // https://dev.twitch.tv/docs/api/reference#create-clip
          if (id === 'create-clip') {
            fieldSchemas = [
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

          parseSchemaObject(
            id,
            name,
            fieldSchemas,
            SCHEMA_OBJECT_TYPE.response,
            openApi.components.schemas,
          );
          hasResponseSchema = true;
        } else if (el.textContent!.trim().toLowerCase() !== 'none') {
          descriptions.responseBody.push(parseMarkdown(el.innerHTML));
        }
      }

      // Response Codes | Response codes
      if (currentSection.toLowerCase() === 'response codes') {
        responses = parseResponses(el);
      }
    }

    // add examples
    if (examples.length === 0) throw new Error('No examples: ' + id);

    let responseSchemaType: Pick<MediaTypeObject, 'schema'> = {};
    if (hasResponseSchema) {
      const schemaName = getResponseSchemaName(name);
      responseSchemaType = {
        schema: { $ref: `#/components/schemas/${schemaName}` },
      };
    }

    const responseCodeOk = Object.keys(responses!)[0]!;
    const responseObjectOk = responses![responseCodeOk] as ResponseObject;

    let examplesOk: ExampleObject[] = examples;
    let examplesError: ExampleObject[] = [];

    // The last example is for 400
    // https://dev.twitch.tv/docs/api/reference#ban-user
    // https://dev.twitch.tv/docs/api/reference#unban-user
    if (id === 'ban-user' || id === 'unban-user') {
      examplesOk = examples.slice(0, examples.length - 1);
      examplesError = examples.slice(-1);
    }

    // https://dev.twitch.tv/docs/api/reference#get-channel-icalendar
    let mimeType =
      id === 'get-channel-icalendar' ? 'text/calendar' : 'application/json';

    if (responseCodeOk === '200' || responseCodeOk === '202') {
      responseObjectOk.content = {
        [mimeType]: {
          ...responseSchemaType,
          examples: getOpenApiExamples(examplesOk),
        },
      };
    } else if (responseCodeOk === '204') {
      if (examplesOk.length > 1) {
        throw new Error('Too many examples for 204: ' + id);
      }
      responseObjectOk.description = [
        responseObjectOk.description!,
        '__Examples__',
        examplesOk[0]!.description,
      ].join('\n\n');
    } else {
      throw new Error('Wrong response code: ' + responseCodeOk + ' ' + id);
    }

    if (examplesError.length > 0) {
      const responseObjectError = responses![400]! as ResponseObject;
      responseObjectError.content = {
        [mimeType]: {
          examples: getOpenApiExamples(examplesError),
        },
      };
    }

    // check auth
    const authDesc = [
      ...descriptions.authentication,
      ...descriptions.authorization,
    ];
    const scopes = parseScopes(authDesc);
    const requiresAuth = authDesc.some(
      (line) =>
        line.includes('user access token') ||
        line.includes('app access token') ||
        line.includes('JSON Web Token'),
    );

    // add to openApi
    const { tag, summary } = apiReference.get(id)!;

    const operationObject: OperationObject = {
      summary,
      description: getDescriptionText(descriptions),
      tags: [tag],
      externalDocs: {
        description: name,
        url: `https://dev.twitch.tv/docs/api/reference#${id}`,
      },
      operationId: id,
    };
    if (parameters.length > 0) operationObject.parameters = parameters;
    if (requestBody!) operationObject.requestBody = requestBody;
    operationObject.responses = responses;
    if (requiresAuth) operationObject.security = [{ twitch_auth: scopes }];

    const path = url.replace('https://api.twitch.tv/helix', '');
    if (!openApi.paths[path]) openApi.paths[path] = {} as PathItemObject;
    const methodLower = method.toLowerCase() as Method;
    openApi.paths[path]![methodLower] = operationObject;
  };

export default parseEndpoint;
