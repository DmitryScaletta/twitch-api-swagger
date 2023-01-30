import fs from 'node:fs/promises';
import YAML from 'yaml';
import fetchHtml from './utils/fetchHtml.js';
import generateOpenApi from './utils/generateOpenApi.js';
import { HTML_DESCRIPTION, OPEN_API_TITLE } from './utils/constants.js';
import parseScopes from './utils/parseScopes.js';

const PAGES = {
  reference: {
    url: 'https://dev.twitch.tv/docs/api/reference/',
    filename: './tmp/reference.html',
  },
  scopes: {
    url: 'https://dev.twitch.tv/docs/authentication/scopes/',
    filename: './tmp/scopes.html',
  },
  eventSubReference: {
    url: 'https://dev.twitch.tv/docs/eventsub/eventsub-reference/',
    filename: './tmp/eventsub-reference.html',
  },
  eventSubSubscriptionTypes: {
    url: 'https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/',
    filename: './tmp/eventsub-subscription-types.html',
  },
} as const;

const main = async () => {
  const [
    referenceHtml,
    scopesHtml,
    eventSubSubscriptionTypesHtml,
    openApiTemplate,
    indexHtmlTemplate,
  ] = await Promise.all([
    fetchHtml(PAGES.reference.url),
    fetchHtml(PAGES.scopes.url),
    fetchHtml(PAGES.eventSubSubscriptionTypes.url),
    fs.readFile('./scripts/templates/openapi.template.json', 'utf8'),
    fs.readFile('./scripts/templates/index.template.html', 'utf8'),
  ]);

  const allScopes = parseScopes(scopesHtml);
  const openApi = generateOpenApi(
    referenceHtml,
    allScopes,
    eventSubSubscriptionTypesHtml,
    JSON.parse(openApiTemplate),
  );
  const indexHtml = indexHtmlTemplate
    .replace('%TITLE%', OPEN_API_TITLE)
    .replace('%DESCRIPTION%', HTML_DESCRIPTION);

  await Promise.all([
    fs.writeFile(PAGES.reference.filename, referenceHtml),
    fs.writeFile(PAGES.scopes.filename, referenceHtml),
    fs.writeFile(PAGES.eventSubSubscriptionTypes.filename, referenceHtml),
    fs.writeFile('./openapi.json', JSON.stringify(openApi, null, 2)),
    fs.writeFile('./openapi.yaml', YAML.stringify(openApi)),
    fs.writeFile('./dist/openapi.json', JSON.stringify(openApi)),
    fs.writeFile('./dist/index.html', indexHtml),
  ]);
};

main();
