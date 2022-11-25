import { NodeHtmlMarkdown } from 'node-html-markdown';

const nhm = new NodeHtmlMarkdown();

const parseMarkdown = (html: string) => {
  const normalizedHtml = html
    .replaceAll('<ul>', '<br><br><ul>')
    .replaceAll('</ul>', '</ul><br>')
    .replaceAll('href="#', 'href="https://dev.twitch.tv/docs/api/reference#')
    .replaceAll('href="/docs/', 'href="https://dev.twitch.tv/docs/');
  return nhm.translate(normalizedHtml).trim();
};

export default parseMarkdown;
