import type { ExampleObject } from '../types';
import parseMarkdown from './parseMarkdown.js';

export type ExampleItem = {
  type: 'example-request' | 'example-response';
  content: string[];
};

// https://regex101.com/r/rksx7n/1
const BODY_REGEX = /(?:--data-raw|-d) '(.+)'/gs;

const parseJson = (text: string) => eval(`(() => (${text}))()`);

const parseExamples = (endpointId: string, examplesEl: Element) => {
  const bodyObjects: ExampleObject[] = [];
  const examples: ExampleObject[] = [];

  // Add missing "Example Request" header
  // https://dev.twitch.tv/docs/api/reference#get-soundtrack-playlists
  if (endpointId === 'get-soundtrack-playlists') {
    examplesEl.innerHTML = examplesEl.innerHTML.replace(
      '<p>Gets a single playlist.</p>',
      '<h3>Example Request</h3><p>Gets a single playlist.</p>',
    );
  }

  const examplesText: string[] = [];
  for (const el of examplesEl.children) {
    examplesText.push(parseMarkdown(el.innerHTML).trim());
  }

  const exampleItems: ExampleItem[] = [];
  for (const exampleText of examplesText) {
    const textLower = exampleText.toLowerCase();
    const isRequest = textLower.startsWith('example request');
    const isResponse = textLower.startsWith('example response');
    if (isRequest || isResponse) {
      exampleItems.push({
        type: isRequest ? 'example-request' : 'example-response',
        content: [],
      });
      continue;
    }
    let md = exampleText;
    if (md.startsWith('```') && md.endsWith('```')) {
      let code = md.slice(3, -3).trim();
      let type = 'text';
      if (code.startsWith('curl ')) type = 'bash';
      if (code.startsWith('# Twitch CLI')) type = 'bash';
      if (code.startsWith('{')) type = 'json';
      if (type === 'json') {
        code = code
          .split('\n')
          .filter((s) => !['...', '. . .'].includes(s.trim()))
          .filter((s) => s.trim() !== '')
          .join('\n');
      }
      md = '```' + type + '\n' + code + '\n```';
    }

    const lastExample = exampleItems.at(-1)!;

    // Ignore "Example Response" if body equals
    // "204 No Content"
    // https://dev.twitch.tv/docs/api/reference#modify-channel-information
    // https://dev.twitch.tv/docs/api/reference#delete-custom-reward
    // "The response body is empty."
    // https://dev.twitch.tv/docs/api/reference#delete-eventsub-subscription
    if (lastExample.type === 'example-response') {
      if (
        md.includes('204 No Content') ||
        md.includes('The response body is empty')
      ) {
        // remove last example
        exampleItems.splice(1, exampleItems.length - 1);
        continue;
      }
    }

    lastExample.content.push(md);
  }

  // "Example Request" is actually "Example Response"
  // https://dev.twitch.tv/docs/api/reference#get-vips
  if (endpointId === 'get-vips') {
    exampleItems[1]!.type = 'example-response';
  }

  type ExampleRequestResponse = {
    req?: string[];
    res?: string[];
  };

  const reqResPairs: ExampleRequestResponse[] = [];
  exampleItems.forEach(({ type, content }) => {
    let last = reqResPairs.at(-1);
    if (!last) {
      last = {};
      reqResPairs.push(last);
    }

    if (type === 'example-request') {
      if (last.req) {
        reqResPairs.push({ req: content });
      } else {
        last.req = content;
      }
    }

    if (type === 'example-response') {
      if (last.req) {
        if (last.res) throw new Error('2 responses in a row');
        last.res = content;
      } else {
        throw new Error('A request without a response');
      }

      // multiple responses with description
      // https://dev.twitch.tv/docs/api/reference#get-extension-configuration-segment
      // https://dev.twitch.tv/docs/api/reference#update-automod-settings
      if (
        endpointId === 'get-extension-configuration-segment' ||
        endpointId === 'update-automod-settings'
      ) {
        const [desc1, ex1, desc2, ex2] = content;
        last.res = [desc1!, ex1!];
        reqResPairs.push({ req: last.req, res: [desc2!, ex2!] });
      }
    }
  });

  reqResPairs.forEach(({ req, res }) => {
    const bodyObjectDesc: string[] = [];
    const reqDesc: string[] = [];
    req!.forEach((s) => {
      if (s.startsWith('```bash')) {
        const code = s.slice(8, -4);
        const m = BODY_REGEX.exec(code);
        if (m) {
          const exampleBody: ExampleObject = {};
          exampleBody.value = JSON.parse(m[1]!);
          if (bodyObjectDesc.length > 0) {
            exampleBody.description = bodyObjectDesc.join('\n\n');
          }
          bodyObjects.push(exampleBody);
        }
      } else {
        bodyObjectDesc.push(s);
      }
      reqDesc.push(s);
    });

    let value: any;
    const resDesc: string[] = [];

    if (res) {
      res.forEach((s) => {
        if (s.startsWith('```json\n')) {
          const code = s.slice(8, -4);
          value = parseJson(code);
        } else if (s.startsWith('```text\n')) {
          // not json response
          // https://dev.twitch.tv/docs/api/reference#get-channel-icalendar
          value = s.slice(8, -4);
        } else {
          resDesc.push(s);
        }
      });
    }

    const description = [...resDesc, '_Request:_', ...reqDesc]
      .filter(Boolean)
      .join('\n\n');

    examples.push({ description, value });
  });

  return {
    bodyObjects,
    examples,
  };
};

export default parseExamples;
