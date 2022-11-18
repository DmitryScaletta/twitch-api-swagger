import { JSDOM } from 'jsdom';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import type { ApiEndpoint, Interface, Parameter } from './types';

const nhm = new NodeHtmlMarkdown();

const parseMarkdown = (html: string) => {
  const normalizedHtml = html
    .replaceAll('<ul>', '<br><br><ul>')
    .replaceAll('</ul>', '</ul><br>')
    .replaceAll('href="#', 'href="https://dev.twitch.tv/docs/api/reference#')
    .replaceAll('href="/docs/', 'href="https://dev.twitch.tv/docs/');
  return nhm.translate(normalizedHtml).trim();
};

const parseTableAsMarkdown = (table: Element): string => {
  let result = '';
  const ths: string[] = [];
  table.querySelectorAll('thead th').forEach((th) => {
    ths.push(th.textContent || '');
  });
  const dashes = Array.from({ length: ths.length }, () => '-');
  result += `| ${ths.join(' | ')} |\n`;
  result += `| ${dashes.join(' | ')} |\n`;
  table.querySelectorAll('tbody tr').forEach((tr) => {
    const tds = [...tr.children].map((td) => td.textContent);
    result += `| ${tds.join(' | ')} |\n`;
  });
  return result;
};

const parseParameters = (table: Element): Parameter[] => {
  const params: Parameter[] = [];

  table.querySelectorAll('tbody tr').forEach((tr) => {
    const parameterEl = tr.children[0]!;
    const typeEl = tr.children[1];
    const requiredEl = tr.children.length === 4 ? tr.children[2] : null;
    const descriptionEl =
      tr.children.length === 4 ? tr.children[3]! : tr.children[2]!;

    const name = parameterEl?.textContent?.trim()!;
    const type = typeEl?.textContent?.trim()!;

    // required
    let required: Parameter['required'] = null;
    const requiredText = requiredEl?.textContent?.trim();
    if (requiredText) {
      required = requiredText === 'Yes';
    }

    // depth
    let nbspCount = 0;
    for (let i = 0; i < parameterEl.textContent!.length; i += 1) {
      if (parameterEl.textContent![i] === '\xa0') nbspCount += 1;
      else break;
    }
    const depth = nbspCount / 3;

    const description = parseMarkdown(descriptionEl!.innerHTML!);

    // possibleValues
    const possibleValues: Parameter['possibleValues'] = [];
    if (
      [
        'values are:',
        'formats are:',
        'sizes are:',
        'tiers are:',
        'themes are:',
      ].some((s) => descriptionEl.textContent!.includes(s))
    ) {
      descriptionEl.querySelectorAll('ul li').forEach((li) => {
        const value = li.textContent?.split('—')[0]?.trim();
        if (value) possibleValues.push(value);
      });
    }

    params.push({
      name,
      type,
      possibleValues,
      required,
      depth,
      description,
      children: [],
    } as Parameter);
  });

  const result = [];

  for (let i = 0; i < params.length; i++) {
    const param = params[i]!;

    if (param.depth === 0) {
      result.push(param);
      continue;
    }

    if (param.depth === 1) {
      result.at(-1)!.children.push(param);
    }

    if (param.depth === 2) {
      // wrong depth: https://dev.twitch.tv/docs/api/reference#create-stream-marker
      if (result.at(-1)!.children.at(-1)) {
        result.at(-1)!.children.at(-1)!.children.push(param);
      } else {
        result.at(-1)!.children.push(param);
      }
    }
  }

  return result;
};

const parseResponseCodes = (table: Element): ApiEndpoint['responseCodes'] => {
  const responseCodes: ApiEndpoint['responseCodes'] = [];
  table.querySelectorAll('tbody tr').forEach((tr) => {
    const [codeEl, descriptionEl] = tr.children;
    const code = codeEl!.textContent!.trim();
    const description = parseMarkdown(descriptionEl!.innerHTML);
    responseCodes.push([code, description]);
  });
  return responseCodes;
};

const parseDocs = (html: string): ApiEndpoint[] => {
  const apiEndpoints: ApiEndpoint[] = [];
  const apiEndpointsPartial = new Map<
    string,
    Pick<ApiEndpoint, 'id' | 'resource' | 'description'>
  >();
  const { document } = new JSDOM(html).window;

  document
    .querySelectorAll('#twitch-api-reference + table tbody tr')
    .forEach((tr) => {
      const [resourceTd, endpointTd, descriptionTd] = tr.children;
      const endpointA = endpointTd!.querySelector('a')!;

      const id = endpointA.getAttribute('href')!.slice(1);
      const resource = resourceTd!.textContent!.trim();
      const description = descriptionTd!.textContent!.trim();

      apiEndpointsPartial.set(id, {
        id,
        resource,
        description,
      });
    });

  [...document.querySelectorAll('.doc-content').values()]
    .slice(1)
    .forEach((sectionEl) => {
      const [leftDocs, rightDocs] = sectionEl.children;

      const id = leftDocs!.querySelector('h2')!.getAttribute('id')!;
      const name = leftDocs!.querySelector('h2')!.textContent!.trim();
      const descriptionFull = [];
      const authentication = [];
      const authorization = [];
      let url = '';
      let method = '';

      const requestBody: Interface = {
        description: [],
        parameters: [],
      };
      const requestQueryParams: Interface = {
        description: [],
        parameters: [],
      };
      const responseBody: Interface = {
        description: [],
        parameters: [],
      };
      let responseCodes: ApiEndpoint['responseCodes'] = [];

      const examples = parseMarkdown(rightDocs!.innerHTML);

      const sections = {
        description: '',
        authentication: 'Authentication',
        authorization: 'Authorization',
        url: 'URL', // URL | URLs
        requestBody: 'Request Body',
        requestQueryParams: 'Query Parameters', // Request Query Parameters | Required Query Parameters
        responseBody: 'Response Body',
        responseCodes: 'Response Codes', // Response codes
      };

      let currentSection = sections.description;

      for (const el of leftDocs!.children) {
        if (el.tagName === 'H2' || el.className === 'editor-link') continue;
        if (el.tagName === 'H3') {
          currentSection = el!.textContent!.trim();
          continue;
        }

        if (currentSection === sections.description) {
          if (el.tagName === 'TABLE') {
            descriptionFull.push(parseTableAsMarkdown(el));
          } else {
            descriptionFull.push(parseMarkdown(el.innerHTML));
          }
        }

        if (currentSection === sections.authentication) {
          authentication.push(parseMarkdown(el.innerHTML));
        }

        if (currentSection === sections.authorization) {
          authorization.push(parseMarkdown(el.innerHTML));
        }

        if (currentSection.startsWith(sections.url)) {
          [method, url] = el.textContent!.trim().split(' ') as [string, string];
        }

        if (currentSection === sections.requestBody) {
          if (el.tagName === 'TABLE') {
            requestBody.parameters = parseParameters(el);
          } else {
            requestBody.description.push(parseMarkdown(el.innerHTML));
          }
        }

        if (currentSection.endsWith(sections.requestQueryParams)) {
          if (el.tagName === 'TABLE') {
            requestQueryParams.parameters = parseParameters(el);
          } else {
            requestQueryParams.description.push(parseMarkdown(el.innerHTML));
          }
        }

        if (currentSection === sections.responseBody) {
          if (el.tagName === 'TABLE') {
            responseBody.parameters = parseParameters(el);
          } else {
            responseBody.description.push(parseMarkdown(el.innerHTML));
          }
        }

        if (
          currentSection.toLowerCase() === sections.responseCodes.toLowerCase()
        ) {
          responseCodes = parseResponseCodes(el);
        }
      }

      // https://dev.twitch.tv/docs/api/reference#get-clips
      // https://dev.twitch.tv/docs/api/reference#get-stream-markers
      // https://dev.twitch.tv/docs/api/reference#get-teams
      // https://dev.twitch.tv/docs/api/reference#get-videos
      const mutuallyExclusiveIds = [
        'get-clips',
        'get-stream-markers',
        'get-teams',
        'get-videos',
      ];
      if (mutuallyExclusiveIds.includes(id)) {
        requestQueryParams.parameters.forEach((p) => {
          p.required = false;
        });
      }

      const { resource, description } = apiEndpointsPartial.get(id)!;

      apiEndpoints.push({
        id,
        name,
        resource,
        description,
        descriptionFull,
        authentication,
        authorization,
        url,
        method,
        requestBody,
        requestQueryParams,
        responseBody,
        responseCodes,
        examples,
      } as ApiEndpoint);
    });

  return apiEndpoints;
};

export default parseDocs;
