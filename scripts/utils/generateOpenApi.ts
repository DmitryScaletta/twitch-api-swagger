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

  // deprecations
  const schemas = openApi.components.schemas;
  openApi.paths['/tags/streams']!['get'].deprecated = true;
  openApi.paths['/streams/tags']!['get'].deprecated = true;
  schemas['GetAllStreamTagsResponse']!.deprecated = true;
  schemas['GetStreamTagsResponse']!.deprecated = true;
  schemas['Channel']!.properties!['tag_ids']!.deprecated = true;
  schemas['Stream']!.properties!['tag_ids']!.deprecated = true;

  return openApi;
};

export default generateOpenApi;
