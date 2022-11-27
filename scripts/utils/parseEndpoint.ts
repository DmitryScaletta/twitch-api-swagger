import type {
  ApiReference,
  Descriptions,
  ExampleObject,
  MediaTypeObject,
  Method,
  OpenApi,
  OperationObject,
  ResponseObject,
} from '../types';
import { getBodySchemaName, getResponseSchemaName } from './getSchemaName.js';
import { SCHEMA_OBJECT_TYPE } from './constants.js';
import parseExamples from './parseExamples.js';
import parseMarkdown from './parseMarkdown.js';
import parseResponses from './parseResponses.js';
import parseSchemaObject from './parseSchemaObject.js';
import parseTableAsMarkdown from './parseTableAsMarkdown.js';
import getDescriptionText from './getDescriptionText.js';

const parseEndpoint =
  (apiReference: Map<string, ApiReference>, openApi: OpenApi) =>
  (sectionEl: Element) => {
    const operationObject: OperationObject = {
      tags: [],
      parameters: [],
      responses: {},
    };

    const [leftDocs, rightDocs] = sectionEl.children;

    const id = leftDocs!.querySelector('h2')!.getAttribute('id')!;
    const name = leftDocs!.querySelector('h2')!.textContent!.trim();

    operationObject.externalDocs = {
      url: `https://dev.twitch.tv/docs/api/reference#${id}`,
    };

    const { bodyObjects, examples } = parseExamples(id, rightDocs!);

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

      // URL | URLs
      if (currentSection.startsWith('URL')) {
        // no method
        // https://dev.twitch.tv/docs/api/reference#get-stream-key
        if (id === 'get-stream-key') {
          el.textContent = 'GET ' + el.textContent;
        }

        // not full url
        // https://dev.twitch.tv/docs/api/reference#search-channels
        if (id === 'search-channels') {
          el.textContent = el.textContent!.replace(
            'helix',
            'https://api.twitch.tv/helix',
          );
        }

        [method, url] = el.textContent!.trim().split(' ') as [string, string];
      }

      // Request Body | Request Body Fields
      if (currentSection.startsWith('Request Body')) {
        if (el.tagName === 'TABLE') {
          parseSchemaObject(
            id,
            name,
            el,
            SCHEMA_OBJECT_TYPE.body,
            openApi.components.schemas,
          );
          const schemaName = getBodySchemaName(name);
          const examples = bodyObjects.reduce((acc, example, i) => {
            let exampleTitle = 'Example';
            if (bodyObjects.length > 1) exampleTitle += ` ${i + 1}`;
            acc[exampleTitle] = example;
            return acc;
          }, {} as Record<string, ExampleObject>);

          operationObject.requestBody = {
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${schemaName}` },
                ...(bodyObjects.length > 0 ? { examples } : {}),
              },
            },
          };
        } else {
          descriptions.requestBody.push(parseMarkdown(el.innerHTML));
        }
      }

      // Request Query Parameters | Required Query Parameters
      if (currentSection.endsWith('Query Parameters')) {
        if (el.tagName === 'TABLE') {
          operationObject.parameters = parseSchemaObject(
            id,
            name,
            el,
            SCHEMA_OBJECT_TYPE.params,
            openApi.components.schemas,
          );
        } else {
          descriptions.queryParameters.push(parseMarkdown(el.innerHTML));
        }
      }

      if (currentSection === 'Response Body') {
        if (el.tagName === 'TABLE') {
          parseSchemaObject(
            id,
            name,
            el,
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
        operationObject.responses = parseResponses(el, id);
      }
    }

    // add examples
    let responseSchemaType: Pick<MediaTypeObject, 'schema'> = {};
    let mimeType = 'none';
    if (hasResponseSchema) {
      const schemaName = getResponseSchemaName(name);
      responseSchemaType = {
        schema: { $ref: `#/components/schemas/${schemaName}` },
      };
      mimeType = 'application/json';
    }

    const responseCodeOk = Object.keys(operationObject.responses!)[0];
    if (
      responseCodeOk !== '200' &&
      responseCodeOk !== '202' &&
      responseCodeOk !== '204'
    ) {
      throw new Error('Wrong response code: ' + responseCodeOk + ' ' + id);
    }
    const responseObjectOk = operationObject.responses![
      responseCodeOk
    ] as ResponseObject;

    if (examples.length === 0) throw new Error('No examples: ' + id);

    let examplesOk: ExampleObject[] = examples;
    let examplesError: ExampleObject[] = [];

    // Example for 400
    // https://dev.twitch.tv/docs/api/reference#ban-user
    // https://dev.twitch.tv/docs/api/reference#unban-user
    if (id === 'ban-user' || id === 'unban-user') {
      examplesOk = examples.slice(0, examples.length - 1);
      examplesError = examples.slice(-1);
    }

    // https://dev.twitch.tv/docs/api/reference#get-channel-icalendar
    if (id === 'get-channel-icalendar') {
      responseObjectOk.content = {
        'text/calendar': {
          examples: { Example: examples[0]! },
        },
      };
    } else if (responseCodeOk === '200' || responseCodeOk === '202') {
      const examplesList = examplesOk.reduce((acc, example, i) => {
        let exampleTitle = 'Example';
        if (examples.length > 1) exampleTitle += ` ${i + 1}`;
        acc[exampleTitle] = example;
        return acc;
      }, {} as Record<string, ExampleObject>);

      responseObjectOk.content = {
        [mimeType]: {
          ...responseSchemaType,
          examples: examplesList,
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
    }

    if (examplesError.length > 0) {
      const responseObjectError =
        operationObject.responses![400]! as ResponseObject;
      responseObjectError.content = {
        'application/json': {
          examples: { Example: examplesError[0]! },
        },
      };
    }

    const { tag, summary } = apiReference.get(id)!;
    operationObject.tags!.push(tag);
    operationObject.summary = summary;
    operationObject.description = getDescriptionText(descriptions);

    const path = url.replace('https://api.twitch.tv/helix', '');
    if (!openApi.paths[path]) openApi.paths[path] = {} as any;
    openApi.paths[path]![method.toLowerCase() as Method] = operationObject;
  };

export default parseEndpoint;
