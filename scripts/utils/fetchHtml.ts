import https from 'node:https';

const fetchHtml = (url: string): Promise<string> =>
  new Promise((resolve) => {
    https.get(url, (res) => {
      let responseBody = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => resolve(responseBody));
    });
  });

export default fetchHtml;
