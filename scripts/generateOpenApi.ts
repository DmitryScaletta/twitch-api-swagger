import fs from 'fs/promises';
import { JSDOM } from 'jsdom';
import type {
  ExampleObject,
  MediaTypeObject,
  Method,
  OpenApi,
  OperationObject,
  ResponseObject,
} from './types';
import { getBodySchemaName, getResponseSchemaName } from './utils.js';
import { SCHEMA_OBJECT_TYPE } from './utils/constants.js';
import parseExamples, { ExampleItem } from './utils/parseExamples.js';
import parseMarkdown from './utils/parseMarkdown.js';
import parseResponses from './utils/parseResponses.js';
import parseSchemaObject from './utils/parseSchemaObject.js';
import parseTableAsMarkdown from './utils/parseTableAsMarkdown.js';

type Descriptions = {
  main: string[];
  authentication: string[];
  authorization: string[];
  queryParameters: string[];
  requestBody: string[];
  responseBody: string[];
};

const renderDescription = (descriptions: Descriptions): string => {
  let result = [...descriptions.main];

  if (descriptions.authentication.length > 0) {
    result.push('__Authentication:__');
    result.push(...descriptions.authentication);
  }

  if (descriptions.authorization.length > 0) {
    result.push('__Authorization:__');
    result.push(...descriptions.authorization);
  }

  if (descriptions.queryParameters.length > 0) {
    result.push('__Request Query Parameters:__');
    result.push(...descriptions.queryParameters);
  }

  if (descriptions.requestBody.length > 0) {
    result.push('__Request Body:__');
    result.push(...descriptions.requestBody);
  }

  if (descriptions.responseBody.length > 0) {
    result.push('__Response Body:__');
    result.push(...descriptions.responseBody);
  }

  return result.join('\n\n');
};

const examplesDebug: Record<string, ExampleItem[]> = {};

const generateOpenApi = (html: string, openApi: OpenApi): OpenApi => {
  type ApiReference = {
    id: string;
    tag: string;
    summary: string;
  };

  const apiReference = new Map<string, ApiReference>();
  const { document } = new JSDOM(html).window;

  document
    .querySelectorAll('#twitch-api-reference + table tbody tr')
    .forEach((tr) => {
      const [tagTd, endpointTd, summaryTd] = tr.children;
      const endpointA = endpointTd!.querySelector('a')!;

      const id = endpointA.getAttribute('href')!.slice(1);
      const tag = tagTd!.textContent!.trim();
      const summary = summaryTd!.textContent!.trim();

      apiReference.set(id, {
        id,
        tag,
        summary,
      });
    });

  const tags = new Set<string>();
  apiReference.forEach(({ tag }) => tags.add(tag));
  openApi.tags = [...tags.values()].map((name) => ({ name }));

  const endpointsEls = [
    ...document.querySelectorAll('.doc-content').values(),
  ].slice(1);

  endpointsEls.forEach((sectionEl) => {
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

    const { bodyObjects, examples } = parseExamples(
      id,
      rightDocs!,
      examplesDebug,
    );

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
          example: examples[0],
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
    operationObject.description = renderDescription(descriptions);

    const path = url.replace('https://api.twitch.tv/helix', '');
    if (!openApi.paths[path]) openApi.paths[path] = {} as any;
    openApi.paths[path]![method.toLowerCase() as Method] = operationObject;
  });

  // TODO: delete this debug code
  fs.writeFile('./out/examples.json', JSON.stringify(examplesDebug, null, 2));
  fs.writeFile(
    './out/examples.md',
    Object.entries(examplesDebug).reduce((acc, [key, value]) => {
      let i = 0;
      acc += `## # ${key}\n\n`;
      value.forEach(({ type, content }) => {
        if (type === 'example-request') i += 1;
        acc += `### ${type}-${i}\n\n`;
        acc += content.join('\n\n');
        acc += '\n\n';
      });
      acc += '\n<!-- --- -->\n\n';
      return acc;
    }, ''),
  );

  return openApi;
};

export default generateOpenApi;
