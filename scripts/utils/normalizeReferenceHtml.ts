const normalizeReferenceHtml = (document: Document) => {
  const getDocsEl = (endpointId: string) =>
    document.getElementById(endpointId)!.closest('.left-docs')!;
  const getCodeEl = (endpointId: string) =>
    document
      .getElementById(endpointId)!
      .closest('.doc-content')!
      .querySelector('.right-code')!;

  // wrong quotes and comments inside json
  // https://dev.twitch.tv/docs/api/reference/#modify-channel-information
  {
    const el = getCodeEl('modify-channel-information');
    el.innerHTML = el.innerHTML
      .replaceAll('“', '"')
      .replaceAll('”', '"')
      .replace('// adds this label', '')
      .replace('// removes this label', '');
  }

  // missing comma in the examples
  // https://dev.twitch.tv/docs/api/reference/#get-followed-channels
  // https://dev.twitch.tv/docs/api/reference/#get-channel-followers
  {
    const ids = ['get-followed-channels', 'get-channel-followers'];
    for (const id of ids) {
      const el = getCodeEl(id);
      el.innerHTML = el.innerHTML.replaceAll(
        '<span class="s2">"total"</span><span class="p">:</span><span class="w"> </span><span class="mi">8</span>',
        '<span class="s2">"total"</span><span class="p">:</span><span class="w"> </span><span class="mi">8</span><span class="p">,</span>',
      );
    }
  }

  // missing comma in the examples
  // https://dev.twitch.tv/docs/api/reference/#get-channel-chat-badges
  {
    const el = getCodeEl('get-channel-chat-badges');
    el.innerHTML = el.innerHTML.replace(
      '<span class="s2">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"cheer 1"</span>',
      '<span class="s2">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"cheer 1"</span><span class="p">,</span>',
    );
  }

  // no method
  // https://dev.twitch.tv/docs/api/reference#get-stream-key
  {
    const el = getDocsEl('get-stream-key');
    el.innerHTML = el.innerHTML.replace(
      'https://api.twitch.tv/helix/streams/key',
      'GET https://api.twitch.tv/helix/streams/key',
    );
  }

  // No "data" field in the response body
  // https://dev.twitch.tv/docs/api/reference#create-clip
  {
    const el = getDocsEl('create-clip').querySelectorAll('table')[1]!;
    el.innerHTML = el.innerHTML
      .replace('<tbody>', '<tr><td>data</td><td>Object[]</td><td></td></tr>')
      .replace('<td>edit_url</td>', '<td>&nbsp;&nbsp;&nbsp;edit_url</td>')
      .replace('<td>id</td>', '<td>&nbsp;&nbsp;&nbsp;id</td>');
  }

  // missing Response Codes table and probably wrong Response Body
  // https://dev.twitch.tv/docs/api/reference/#get-content-classification-labels
  {
    const table = `<table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>200 OK</td>
          <td>Successfully retrieved The list of CCLs available.</td>
        </tr>
      </tbody>
    </table>`;
    const el = getDocsEl('get-content-classification-labels');
    el.innerHTML = el.innerHTML
      .replace(
        '<tr>\n      <td>&nbsp;&nbsp;&nbsp;content_classification_labels</td>\n      <td>Label[]</td>\n      <td>The list of CCLs available.</td>\n    </tr>',
        '',
      )
      .replace(
        '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id</td>',
        '<td>&nbsp;&nbsp;&nbsp;id</td>',
      )
      .replace(
        '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description</td>',
        '<td>&nbsp;&nbsp;&nbsp;description</td>',
      )
      .replace(
        '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</td>',
        '<td>&nbsp;&nbsp;&nbsp;name</td>',
      );
    el.innerHTML += '<h3>Response Codes</h3>' + table;
  }
};

export default normalizeReferenceHtml;