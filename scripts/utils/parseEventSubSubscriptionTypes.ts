import { JSDOM } from 'jsdom';

/** @deprecated */
const parseEventSubSubscriptionTypes = (html: string) => {
  const { document } = new JSDOM(html).window;
  const typesTd = document.querySelectorAll(
    '#subscription-types + table > tbody > tr > td:nth-child(2)',
  );
  return [...typesTd].map((td) => td.textContent!.trim());
};

export default parseEventSubSubscriptionTypes;
