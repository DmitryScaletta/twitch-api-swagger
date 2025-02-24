import { JSDOM } from 'jsdom';

/** @deprecated */
const parseEventSubSubscriptionTypes = (html: string) => {
  const { document } = new JSDOM(html).window;
  const typesTd = document.querySelectorAll(
    '#subscription-types + table > tbody > tr > td:nth-child(2)',
  );
  const uniqueTypes = new Set<string>();
  for (const td of typesTd) {
    uniqueTypes.add(td.textContent!.trim());
  }
  return Array.from(uniqueTypes);
};

export default parseEventSubSubscriptionTypes;
