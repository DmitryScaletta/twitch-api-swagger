import type { Templates } from './types';

const TEMPLATE_REGEX = /## ([\w-]+)\s*```(?:ts|md)\s*/gs;

const parseTemplates = (text: string): Templates => {
  const templates: Templates = {};
  const arr = text.split(TEMPLATE_REGEX).slice(1);

  for (let i = 0; i < arr.length; i += 2) {
    const name = arr[i]!.trim();
    const template = arr[i + 1]!.replace('```', '').trim();
    templates[name] = template;
  }

  return templates;
};

export default parseTemplates;
