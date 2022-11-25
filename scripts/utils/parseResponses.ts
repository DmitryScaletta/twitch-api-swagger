import type { ResponseObject, ResponsesObject } from '../types';
import parseMarkdown from './parseMarkdown.js';

const parseResponses = (
  table: Element,
  endpointId: string,
): ResponsesObject => {
  const responses: ResponsesObject = {};
  table.querySelectorAll('tbody tr').forEach((tr) => {
    const [codeEl, descriptionEl] = tr.children;
    const code = codeEl!.textContent!.trim();
    const description = parseMarkdown(descriptionEl!.innerHTML);

    // no thead
    // https://dev.twitch.tv/docs/api/reference#get-channel-information
    if (code.toLowerCase().startsWith('http')) return;

    let statusCode = code.slice(0, 3);

    // wrong response code: 204 -> 200
    // https://dev.twitch.tv/docs/api/reference#get-vips
    if (endpointId === 'get-vips' && statusCode === '204') {
      statusCode = '200';
    }

    responses[statusCode!] = { description } as ResponseObject;
  });
  return responses;
};

export default parseResponses;
