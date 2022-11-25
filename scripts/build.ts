import fs from 'node:fs/promises';
import parseDocs from './parseDocs.js';
import generateTypes from './generateTypes.js';
import generateApi from './generateApi.js';
import parseTemplates from './parseTemplates.js';
import generateOpenApi from './generateOpenApi.js';

const DOCS_URL = 'https://dev.twitch.tv/docs/api/reference';
const REFERENCE_FILENAME = './tmp/reference.html';

const fetchDocs = async () => {
  const response = await fetch(DOCS_URL);
  return response.text();
};

const main = async () => {
  const [html, templatesText, openApiTemplate] = await Promise.all([
    fetchDocs(),
    fs.readFile('./scripts/templates.md', 'utf8'),
    fs.readFile('./scripts/openapi.template.json', 'utf8'),
  ]);

  const apiEndpoints = parseDocs(html);
  const templates = parseTemplates(templatesText);
  const types = generateTypes(apiEndpoints);
  const api = generateApi(apiEndpoints, templates);
  const openapi = generateOpenApi(html, JSON.parse(openApiTemplate));

  await Promise.all([
    fs.writeFile(REFERENCE_FILENAME, html),
    fs.writeFile('./api.json', JSON.stringify(apiEndpoints, null, 2)),
    fs.writeFile('./types.ts', types),
    fs.writeFile('./api.ts', api),
    fs.writeFile('./openapi.json', JSON.stringify(openapi, null, 2)),
    fs.writeFile('./dist/openapi.json', JSON.stringify(openapi)),
  ]);
};

main();
