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
      .replace(
        '<tbody>',
        '<tbody><tr><td>data</td><td>Object[]</td><td></td></tr>',
      )
      .replace('<td>edit_url</td>', '<td>&nbsp;&nbsp;&nbsp;edit_url</td>')
      .replace('<td>id</td>', '<td>&nbsp;&nbsp;&nbsp;id</td>');
  }

  // probably wrong Response Body
  // https://dev.twitch.tv/docs/api/reference/#get-content-classification-labels
  {
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
  }

  // missing Response Codes table
  // https://dev.twitch.tv/docs/api/reference/#get-content-classification-labels
  // https://dev.twitch.tv/docs/api/reference/#get-moderated-channels
  {
    // IMPORTANT: I didn't test response codes, it's just my guess
    const getTableHtml = (okDesc = '') => `<table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>200 OK</td>
          <td>${okDesc}</td>
        </tr>
        <tr>
          <td>400 Bad Request</td>
          <td></td>
        </tr>
        <tr>
          <td>401 Unauthorized</td>
          <td></td>
        </tr>
        <tr>
          <td>500 Internal Server Error</td>
          <td></td>
        </tr>
      </tbody>
    </table>`;

    const endpoints = [
      {
        id: 'get-content-classification-labels',
        okDesc: 'Successfully retrieved the list of CCLs available.',
      },
      {
        id: 'get-moderated-channels',
        okDesc: 'Successfully retrieved the list of moderated channels.',
      },
    ];

    for (const { id, okDesc } of endpoints) {
      const el = getDocsEl(id);
      el.innerHTML += '<h3>Response Codes</h3>' + getTableHtml(okDesc);
    }
  }

  // No SUCCESS response code
  // https://dev.twitch.tv/docs/api/reference/#get-channel-guest-star-settings
  // https://dev.twitch.tv/docs/api/reference/#get-guest-star-session
  // https://dev.twitch.tv/docs/api/reference/#create-guest-star-session
  // https://dev.twitch.tv/docs/api/reference/#end-guest-star-session
  // https://dev.twitch.tv/docs/api/reference/#get-guest-star-invites
  // https://dev.twitch.tv/docs/api/reference/#send-guest-star-invite
  // https://dev.twitch.tv/docs/api/reference/#delete-guest-star-invite
  {
    // IMPORTANT: I didn't test response codes, it's just my guess
    const ids200 = [
      'get-channel-guest-star-settings',
      'get-guest-star-session',
      'create-guest-star-session',
      'get-guest-star-invites',
    ];
    for (const id of ids200) {
      const tableEl = getDocsEl(id).querySelector('table:last-child')!;
      tableEl.innerHTML = tableEl.innerHTML.replace(
        '<tbody>',
        '<tr><td>200 OK</td><td></td></tr>',
      );
    }
    const ids204 = [
      'end-guest-star-session',
      'send-guest-star-invite',
      'delete-guest-star-invite',
    ];
    for (const id of ids204) {
      const tableEl = getDocsEl(id).querySelector('table:last-child')!;
      tableEl.innerHTML = tableEl.innerHTML.replace(
        '<tbody>',
        '<tr><td>204 No Content</td><td></td></tr>',
      );
    }
  }
};

export default normalizeReferenceHtml;
