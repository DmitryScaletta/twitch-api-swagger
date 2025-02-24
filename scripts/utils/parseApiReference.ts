import type { ApiReference } from '../types.ts';

const parseApiReference = (document: Document) => {
  const apiReference = new Map<string, ApiReference>();
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
  return apiReference;
};

export default parseApiReference;
