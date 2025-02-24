import type { ResponseObject, ResponsesObject } from '../types.ts';
import parseMarkdown from './parseMarkdown.ts';

const parseResponses = (table: Element): ResponsesObject => {
  const responses: ResponsesObject = {};
  table.querySelectorAll('tbody tr').forEach((tr) => {
    const [codeEl, descriptionEl] = tr.children;
    const code = codeEl!.textContent!.trim();
    const description = parseMarkdown(descriptionEl!.innerHTML);
    const statusCode = code.slice(0, 3);
    responses[statusCode!] = { description } as ResponseObject;
  });
  return responses;
};

export default parseResponses;
