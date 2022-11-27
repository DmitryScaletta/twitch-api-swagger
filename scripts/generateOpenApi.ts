import { JSDOM } from 'jsdom';
import type { ApiReference, OpenApi } from './types';
import { OPEN_API_DESCRIPTION, OPEN_API_TITLE } from './utils/constants.js';
import parseEndpoint from './utils/parseEndpoint.js';

const generateOpenApi = (html: string, openApi: OpenApi): OpenApi => {
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
  openApi.info.title = OPEN_API_TITLE;
  openApi.info.description = OPEN_API_DESCRIPTION;

  [...document.querySelectorAll('.doc-content').values()]
    .slice(1)
    .forEach(parseEndpoint(apiReference, openApi));

  return openApi;
};

export default generateOpenApi;
