import { JSDOM } from 'jsdom';
import type { OpenApi } from '../types.ts';
import { OPEN_API_DESCRIPTION, OPEN_API_TITLE } from './constants.ts';
import normalizeReferenceHtml from './normalizeReferenceHtml.ts';
import parseApiReference from './parseApiReference.ts';
import parseEndpoint from './parseEndpoint.ts';
import addEventSubSubscriptionTypes from './addEventSubSubscriptionTypes.ts';

const generateOpenApi = (
  html: string,
  allScopes: Record<string, string>,
  eventSubSubscriptionHtml: string,
  openApi: OpenApi,
): OpenApi => {
  const { document } = new JSDOM(html).window;
  normalizeReferenceHtml(document);
  const apiReference = parseApiReference(document);
  const tags = new Set<string>();
  apiReference.forEach(({ tag }) => tags.add(tag));
  openApi.tags = [...tags.values()].map((name) => ({ name }));
  openApi.info.title = OPEN_API_TITLE;
  openApi.info.description = OPEN_API_DESCRIPTION;

  [...document.querySelectorAll('.doc-content').values()]
    .slice(1)
    .forEach(parseEndpoint(apiReference, openApi));

  addEventSubSubscriptionTypes(openApi, eventSubSubscriptionHtml);

  openApi.components.securitySchemes['twitch_auth'].flows.implicit.scopes =
    allScopes;

  // scopes for GetAuthorizationByUser endpoint
  {
    const name = 'GetAuthorizationByUserResponse';
    const schema = openApi.components.schemas[name]!;
    schema.properties!['data']!.items!.properties!['scopes']!.items!.enum =
      Object.keys(allScopes);
  }

  return openApi;
};

export default generateOpenApi;
