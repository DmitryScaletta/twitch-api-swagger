import type {
  ApiReference,
  Descriptions,
  ExampleObject,
  FieldSchema,
  MediaTypeObject,
  Method,
  OpenApi,
  OperationObject,
  ParameterObject,
  PathItemObject,
  RequestBodyObject,
  ResponseObject,
  ResponsesObject,
  SchemaObject,
} from '../types.ts';
import { getBodySchemaName, getResponseSchemaName } from './getSchemaName.ts';
import { RESPONSE_BODY_SCHEMA_NAMES } from './constants.ts';
import parseExamples from './parseExamples.ts';
import parseMarkdown from './parseMarkdown.ts';
import parseResponses from './parseResponses.ts';
import parseTableSchema from './parseTableSchema.ts';
import {
  parseParameterObject,
  parseSchemaObject,
} from './parseSchemaObject.ts';
import parseTableAsMarkdown from './parseTableAsMarkdown.ts';
import getDescriptionText from './getDescriptionText.ts';

// https://regex101.com/r/omJKyZ/1
const SCOPE_REGEX = /(:?\*\*([a-z:_\\]+)\*\*|`([a-z:_]+)`)/g;

const EXTENSION_SCHEMA_NAMES = {
  panel: 'UserExtensionPanel',
  overlay: 'UserExtensionOverlay',
  component: 'UserExtensionComponent',
} as const;

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
        [method, url] = el.textContent!.trim().split(' ') as [string, string];
      }

      // Request Body
      if (currentSection.toLocaleLowerCase().includes('request body')) {
        if (el.tagName === 'TABLE') {
          const fieldSchemas = parseTableSchema(el);

          // if there is no required column in the table - set all parameters to required
          const setRequired = (f: FieldSchema) => {
            if (f.required === null) f.required = true;
            f.children.forEach(setRequired);
          };
          fieldSchemas.forEach(setRequired);

          // All fields are required
          // https://dev.twitch.tv/docs/api/reference#start-commercial
          if (id === 'start-commercial') {
            fieldSchemas.forEach((f) => {
              f.required = true;
            });
          }

          // All fields are optional
          // https://dev.twitch.tv/docs/api/reference#update-chat-settings
          // https://dev.twitch.c:\Program Files\Microsoft VS Code\resources\app\out\vs\code\electron-sandbox\workbench\workbench.htmltv/docs/api/reference#update-automod-settings
          if (
            id === 'update-chat-settings' ||
            id === 'update-automod-settings'
          ) {
            fieldSchemas.forEach((f) => {
              f.required = false;
            });
          }

          const schemaName = getBodySchemaName(name);
          const schemaObject = parseSchemaObject(fieldSchemas);

          // https://dev.twitch.tv/docs/api/reference#update-user-extensions
          if (id === 'update-user-extensions') {
            const description = schemaObject.properties!['data']!.description!;
            // prettier-ignore
            schemaObject.properties!['data'] = {
              description,
              properties: {
                panel: {
                  type: 'object',
                  additionalProperties: { $ref: `#/components/schemas/${EXTENSION_SCHEMA_NAMES.panel}Update` },
                },
                overlay: {
                  type: 'object',
                  additionalProperties: { $ref: `#/components/schemas/${EXTENSION_SCHEMA_NAMES.overlay}Update` },
                },
                component: {
                  type: 'object',
                  additionalProperties: { $ref: `#/components/schemas/${EXTENSION_SCHEMA_NAMES.component}Update` },
                },
              },
            };
          }

          openApi.components.schemas[schemaName] = schemaObject;

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

          parameters = fieldSchemas.map(parseParameterObject(id));
        } else {
          descriptions.queryParameters.push(parseMarkdown(el.innerHTML));
        }
      }

      if (currentSection.toLowerCase().includes('response body')) {
        if (el.tagName === 'TABLE') {
          let fieldSchemas = parseTableSchema(el);

          const setRequired = (f: FieldSchema) => {
            if (f.required === null) {
              f.required = true;

              // "pagination" and "cursor" are always optional
              // https://dev.twitch.tv/docs/api/guide#pagination
              if (f.name === 'pagination' || f.name === 'cursor') {
                f.required = false;
              }

              // https://dev.twitch.tv/docs/api/reference#get-extension-configuration-segment
              if (
                id === 'get-extension-configuration-segment' &&
                f.name === 'broadcaster_id'
              ) {
                f.required = false;
              }

              // https://dev.twitch.tv/docs/api/reference#create-eventsub-subscription
              // https://dev.twitch.tv/docs/api/reference#get-eventsub-subscriptions
              if (
                (id === 'create-eventsub-subscription' ||
                  id === 'get-eventsub-subscriptions') &&
                [
                  'callback',
                  'session_id',
                  'connected_at',
                  'disconnected_at',
                ].includes(f.name)
              ) {
                f.required = false;
              }

              // only "active" is required
              // https://dev.twitch.tv/docs/api/reference#get-user-active-extensions
              // https://dev.twitch.tv/docs/api/reference#update-user-extensions
              if (
                id === 'get-user-active-extensions' ||
                (id === 'update-user-extensions' &&
                  ['id', 'version', 'name', 'x', 'y'].includes(f.name))
              ) {
                f.required = false;
              }
            }

            f.children.forEach(setRequired);
          };
          fieldSchemas.forEach(setRequired);

          const schemaName = getResponseSchemaName(name);
          const schemaObject = parseSchemaObject(fieldSchemas);

          // map[string]Object type
          // https://dev.twitch.tv/docs/api/reference#get-user-active-extensions
          // https://dev.twitch.tv/docs/api/reference#update-user-extensions
          if (
            id === 'get-user-active-extensions' ||
            id === 'update-user-extensions'
          ) {
            const props = schemaObject.properties!['data']!.properties!;
            const propNames = Object.keys(
              EXTENSION_SCHEMA_NAMES,
            ) as (keyof typeof EXTENSION_SCHEMA_NAMES)[];

            for (const propName of propNames) {
              const schemaName = EXTENSION_SCHEMA_NAMES[propName];
              const schemaObject = props[propName]!.additionalProperties!;

              openApi.components.schemas[schemaName] = schemaObject;
              props[propName]!.additionalProperties = {
                $ref: `#/components/schemas/${schemaName}`,
              };

              // Add update schemas UserExtension${type}Update
              const updateSchema = structuredClone(schemaObject);
              delete updateSchema.properties!['name'];
              openApi.components.schemas[schemaName + 'Update'] = updateSchema;
            }
          }

          // https://dev.twitch.tv/docs/api/reference#get-cheermotes
          // Response: data[] -> tiers[] -> images
          if (id === 'get-cheermotes') {
            const cheermoteImagesSchemaName = 'CheermoteImages';
            openApi.components.schemas['CheermoteImageFormat'] = {
              type: 'object',
              properties: {
                '1': { type: 'string' },
                '1.5': { type: 'string' },
                '2': { type: 'string' },
                '3': { type: 'string' },
                '4': { type: 'string' },
              },
            };
            openApi.components.schemas['CheermoteImageTheme'] = {
              type: 'object',
              properties: {
                animated: { $ref: '#/components/schemas/CheermoteImageFormat' },
                static: { $ref: '#/components/schemas/CheermoteImageFormat' },
              },
            };
            openApi.components.schemas[cheermoteImagesSchemaName] = {
              type: 'object',
              properties: {
                light: { $ref: '#/components/schemas/CheermoteImageTheme' },
                dark: { $ref: '#/components/schemas/CheermoteImageTheme' },
              },
            };
            // prettier-ignore
            schemaObject.properties!['data']!.items!.properties!['tiers']!.items!.properties!['images'] = {
              $ref: `#/components/schemas/${cheermoteImagesSchemaName}`,
            };
          }

          // https://dev.twitch.tv/docs/api/reference#get-extensions
          // https://dev.twitch.tv/docs/api/reference#get-released-extensions
          // Response: data[] -> icon_urls
          if (id === 'get-extensions' || id === 'get-released-extensions') {
            const dataProps =
              schemaObject.properties!['data']!.items!.properties!;
            const extensionIconUrlsSchemaName = 'ExtensionIconUrls';
            const extensionIconUrlsSchema = {
              type: 'object',
              description: dataProps['icon_urls']!.description!,
              properties: {
                '100x100': { type: 'string' },
                '24x24': { type: 'string' },
                '300x200': { type: 'string' },
              },
            };
            openApi.components.schemas[extensionIconUrlsSchemaName] =
              extensionIconUrlsSchema;
            dataProps['icon_urls'] = {
              $ref: `#/components/schemas/${extensionIconUrlsSchemaName}`,
            };
          }

          // https://dev.twitch.tv/docs/api/reference#get-soundtrack-current-track
          // Response: data[] -> track
          if (id === 'get-soundtrack-current-track') {
            schemaObject.properties!['data']!.items!.properties!['track'] = {
              $ref: '#/components/schemas/SoundtrackTrack',
            };
          }

          // TODO: move to separate function
          const replaces = RESPONSE_BODY_SCHEMA_NAMES[id];
          if (replaces) {
            replaces.reverse().forEach(([path, nestedSchemaName]) => {
              let prop: SchemaObject = schemaObject;
              if (path === 'data[0]') {
                prop = schemaObject.properties!['data']!;
              } else {
                const fullPath = path.split('.');
                if (fullPath.length > 2)
                  throw new Error('Invalid path: ' + path);
                const [path1, path2] = fullPath;
                prop =
                  path1 === 'data[0]'
                    ? schemaObject.properties!['data']!.items!.properties![
                        path2!
                      ]!
                    : schemaObject.properties!['data']!.properties![path2!]!;
              }

              if (!prop) throw new Error('No property for replacing: ' + id);
              if (prop.type !== 'array') {
                throw new Error('Wrong property type: ' + id);
              }

              const nestedSchema = prop.items!;
              prop.items = { $ref: `#/components/schemas/${nestedSchemaName}` };

              openApi.components.schemas[nestedSchemaName] = nestedSchema;
            });
          }

          openApi.components.schemas[schemaName] = schemaObject;

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
      responseObjectOk.description = [
        responseObjectOk.description!,
        '__Examples__',
        ...examplesOk.map((example) => example.description),
      ].join('\n\n');
    } else {
      console.warn('No SUCCESS response code: ' + id);
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
