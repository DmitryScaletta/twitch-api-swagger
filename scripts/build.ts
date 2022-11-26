import fs from 'node:fs/promises';
import generateOpenApi from './generateOpenApi.js';
import { HTML_DESCRIPTION, OPEN_API_TITLE } from './utils/constants.js';

const DOCS_URL = 'https://dev.twitch.tv/docs/api/reference';
const REFERENCE_FILENAME = './tmp/reference.html';

const fetchDocs = async () => {
  const response = await fetch(DOCS_URL);
  return response.text();
};

const main = async () => {
  const [html, openApiTemplate, indexHtmlTemplate] = await Promise.all([
    fetchDocs(),
    fs.readFile('./scripts/openapi.template.json', 'utf8'),
    fs.readFile('./scripts/index.template.html', 'utf8'),
  ]);

  const openapi = generateOpenApi(html, JSON.parse(openApiTemplate));
  const indexHtml = indexHtmlTemplate
    .replace('%TITLE%', OPEN_API_TITLE)
    .replace('%DESCRIPTION%', HTML_DESCRIPTION);

  await Promise.all([
    fs.writeFile(REFERENCE_FILENAME, html),
    fs.writeFile('./openapi.json', JSON.stringify(openapi, null, 2)),
    fs.writeFile('./dist/openapi.json', JSON.stringify(openapi)),
    fs.writeFile('./dist/index.html', indexHtml),
  ]);
};

main();
