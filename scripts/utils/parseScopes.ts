import { JSDOM } from 'jsdom';

const parseScopes = (html: string) => {
  const scopes: Record<string, string> = {};
  const { document } = new JSDOM(html).window;
  document.querySelectorAll('.main tbody tr').forEach((tr) => {
    const [tdScope, tdDesc] = tr.children;
    const scope = tdScope!.textContent!.trim();
    const desc = tdDesc!.childNodes[0]!.textContent!.trim();
    if (desc.startsWith('Deprecated')) return;
    scopes[scope] = desc;
  });
  return scopes;
};

export default parseScopes;
