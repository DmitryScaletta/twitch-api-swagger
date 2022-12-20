import { JSDOM } from 'jsdom';
import type { OpenApi } from '../types';
import { OPEN_API_DESCRIPTION, OPEN_API_TITLE } from './constants.js';
import addUndocumentedApi from './addUndocumentedApi.js';
import parseApiReference from './parseApiReference.js';
import parseEndpoint from './parseEndpoint.js';
import addEventSubSubscriptionTypes from './addEventSubSubscriptionTypes.js';

const generateOpenApi = (
  html: string,
  allScopes: Record<string, string>,
  eventSubSubscriptionTypes: string[],
  openApi: OpenApi,
): OpenApi => {
  const { document } = new JSDOM(html).window;
  const apiReference = parseApiReference(document);
  const tags = new Set<string>();
  apiReference.forEach(({ tag }) => tags.add(tag));
  openApi.tags = [...tags.values()].map((name) => ({ name }));
  openApi.info.title = OPEN_API_TITLE;
  openApi.info.description = OPEN_API_DESCRIPTION;

  [...document.querySelectorAll('.doc-content').values()]
    .slice(1)
    .forEach(parseEndpoint(apiReference, openApi));

  addEventSubSubscriptionTypes(openApi, eventSubSubscriptionTypes);

  openApi.components.securitySchemes['twitch_auth'].flows.implicit.scopes =
    allScopes;

  addUndocumentedApi(openApi);

  return openApi;
};

export default generateOpenApi;
