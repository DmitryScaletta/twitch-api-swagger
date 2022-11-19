import fs from 'node:fs/promises';
import parseDocs from './parseDocs.js';
import generateTypes from './generateTypes.js';
import generateApi from './generateApi.js';
import parseTemplates from './parseTemplates.js';

const DOCS_URL = 'https://dev.twitch.tv/docs/api/reference';
const REFERENCE_FILENAME = './tmp/reference.html';

const fetchDocs = async () => {
  const response = await fetch(DOCS_URL);
  return response.text();
};

const main = async () => {
  const [html, templatesText] = await Promise.all([
    fetchDocs(),
    fs.readFile('./scripts/templates.md', 'utf8'),
  ]);

  const apiEndpoints = parseDocs(html);
  const templates = parseTemplates(templatesText);
  const types = generateTypes(apiEndpoints);
  const api = generateApi(apiEndpoints, templates);

  await Promise.all([
    fs.writeFile(REFERENCE_FILENAME, html),
    fs.writeFile('./api.json', JSON.stringify(apiEndpoints, null, 2)),
    fs.writeFile('./types.ts', types),
    fs.writeFile('./api.ts', api),
  ]);
};

main();
