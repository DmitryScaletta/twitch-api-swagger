import fs from 'node:fs/promises';
import YAML from 'yaml';
import fetchHtml from './utils/fetchHtml.js';
import generateOpenApi from './utils/generateOpenApi.js';
import { HTML_DESCRIPTION, OPEN_API_TITLE } from './utils/constants.js';
import parseScopes from './utils/parseScopes.js';

const REFERENCE_URL = 'https://dev.twitch.tv/docs/api/reference/';
const SCOPES_URL = 'https://dev.twitch.tv/docs/authentication/scopes/';
const EVENT_SUB_SUBSCRIPTION_TYPES_URL =
  'https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/';
const REFERENCE_FILENAME = './tmp/reference.html';
const SCOPES_FILENAME = './tmp/scopes.html';
const EVENT_SUB_SUBSCRIPTION_TYPES_FILENAME =
  './tmp/eventsub-subscription-types.html';

const main = async () => {
  const [
    referenceHtml,
    scopesHtml,
    eventSubSubscriptionTypesHtml,
    openApiTemplate,
    indexHtmlTemplate,
  ] = await Promise.all([
    fetchHtml(REFERENCE_URL),
    fetchHtml(SCOPES_URL),
    fetchHtml(EVENT_SUB_SUBSCRIPTION_TYPES_URL),
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
    fs.writeFile(REFERENCE_FILENAME, referenceHtml),
    fs.writeFile(SCOPES_FILENAME, referenceHtml),
    fs.writeFile(EVENT_SUB_SUBSCRIPTION_TYPES_FILENAME, referenceHtml),
    fs.writeFile('./openapi.json', JSON.stringify(openApi, null, 2)),
    fs.writeFile('./openapi.yaml', YAML.stringify(openApi)),
    fs.writeFile('./dist/openapi.json', JSON.stringify(openApi)),
    fs.writeFile('./dist/index.html', indexHtml),
  ]);
};

main();
