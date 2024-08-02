const replaceHtml = (
  el: Element,
  entries: [
    searchValue: string | RegExp,
    replaceValue: string,
    replaceAll?: boolean,
  ][],
) => {
  for (const [searchValue, replaceValue, replaceAll = false] of entries) {
    const oldHtml = el.innerHTML;
    if (replaceAll) {
      el.innerHTML = el.innerHTML.replaceAll(searchValue, replaceValue);
    } else {
      el.innerHTML = el.innerHTML.replace(searchValue, replaceValue);
    }
    if (oldHtml === el.innerHTML) {
      console.warn("The replace wasn't applied:");
      console.warn({ searchValue, replaceValue });
    }
  }
};

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
  replaceHtml(getCodeEl('modify-channel-information'), [
    ['“', '"', true],
    ['”', '"', true],
    ['// adds this label', ''],
    ['// removes this label', ''],
  ]);

  // missing comma in the examples
  // https://dev.twitch.tv/docs/api/reference/#get-followed-channels
  // https://dev.twitch.tv/docs/api/reference/#get-channel-followers
  {
    const ids = ['get-followed-channels', 'get-channel-followers'];
    for (const id of ids) {
      replaceHtml(getCodeEl(id), [
        [
          '<span class="s2">"total"</span><span class="p">:</span><span class="w"> </span><span class="mi">8</span>',
          '<span class="s2">"total"</span><span class="p">:</span><span class="w"> </span><span class="mi">8</span><span class="p">,</span>',
          true,
        ],
      ]);
    }
  }
  // https://dev.twitch.tv/docs/api/reference/#get-channel-chat-badges
  replaceHtml(getCodeEl('get-channel-chat-badges'), [
    [
      '<span class="s2">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"cheer 1"</span>',
      '<span class="s2">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"cheer 1"</span><span class="p">,</span>',
    ],
  ]);

  // no method
  // https://dev.twitch.tv/docs/api/reference#get-stream-key
  replaceHtml(getDocsEl('get-stream-key'), [
    [
      'https://api.twitch.tv/helix/streams/key',
      'GET https://api.twitch.tv/helix/streams/key',
    ],
  ]);

  // No "data" field in the response body
  // https://dev.twitch.tv/docs/api/reference#create-clip
  replaceHtml(getDocsEl('create-clip').querySelectorAll('table')[1]!, [
    ['<tbody>', '<tbody><tr><td>data</td><td>Object[]</td><td></td></tr>'],
    ['<td>edit_url</td>', '<td>&nbsp;&nbsp;&nbsp;edit_url</td>'],
    ['<td>id</td>', '<td>&nbsp;&nbsp;&nbsp;id</td>'],
  ]);

  // Wrong Response Body
  // https://dev.twitch.tv/docs/api/reference/#get-content-classification-labels
  replaceHtml(getDocsEl('get-content-classification-labels'), [
    [
      '<tr>\n      <td>&nbsp; &nbsp;content_classification_labels</td>\n      <td>Label[]</td>\n      <td>The list of CCLs available.</td>\n    </tr>',
      '',
    ],
    ['<td>&nbsp; &nbsp; &nbsp; id</td>', '<td>&nbsp;&nbsp;&nbsp;id</td>'],
    [
      '<td>&nbsp; &nbsp; &nbsp; description</td>',
      '<td>&nbsp;&nbsp;&nbsp;description</td>',
    ],
    ['<td>&nbsp; &nbsp; &nbsp; name</td>', '<td>&nbsp;&nbsp;&nbsp;name</td>'],
  ]);

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
      replaceHtml(getDocsEl(id).querySelector('table:last-child')!, [
        ['<tbody>', '<tr><td>200 OK</td><td></td></tr>'],
      ]);
    }
    const ids204 = [
      'end-guest-star-session',
      'send-guest-star-invite',
      'delete-guest-star-invite',
    ];
    for (const id of ids204) {
      replaceHtml(getDocsEl(id).querySelector('table:last-child')!, [
        ['<tbody>', '<tr><td>204 No Content</td><td></td></tr>'],
      ]);
    }
  }

  // Redundant semicolon after "pagination" in the example
  // https://dev.twitch.tv/docs/api/reference/#get-conduit-shards
  replaceHtml(getCodeEl('get-conduit-shards'), [
    ['<span class="p">{},</span>', '<span class="p">{}</span>'],
  ]);

  // Redundant and missing semicolons in the examples
  // https://dev.twitch.tv/docs/api/reference/#update-conduit-shards
  replaceHtml(getCodeEl('update-conduit-shards'), [
    [
      '"https://this-is-a-callback-3.com"',
      '"https://this-is-a-callback-3.com",',
    ],
  ]);

  // Wrong place for double quotes in the request body
  // https://dev.twitch.tv/docs/api/reference/#create-eventsub-subscription
  replaceHtml(getCodeEl('create-eventsub-subscription'), [
    ['"\n    type": "user.update"', '\n    "type": "user.update"'],
  ]);

  // `cost` html tag instead of `code`
  // https://dev.twitch.tv/docs/api/reference/#update-extension-bits-product
  replaceHtml(getDocsEl('update-extension-bits-product'), [
    ['&lt;cost&gt;cost&lt;/cost&gt;', '<code>cost</code>'],
  ]);

  // Wrong padding for the `broadcast` field
  // https://dev.twitch.tv/docs/api/reference/#get-extension-transactions
  replaceHtml(getDocsEl('get-extension-transactions'), [
    [
      '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; broadcast</td>',
      '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;broadcast</td>',
    ],
  ]);

  // Wrong padding after the `guests` field
  // https://dev.twitch.tv/docs/api/reference/#get-guest-star-session
  // https://dev.twitch.tv/docs/api/reference/#create-guest-star-session
  // https://dev.twitch.tv/docs/api/reference/#end-guest-star-session
  {
    const ids = [
      'get-guest-star-session',
      'create-guest-star-session',
      'end-guest-star-session',
    ];
    for (const id of ids) {
      const GUESTS_FIELD = '<td>Guest</td>';
      let addPadding = false;
      const trs = getDocsEl(id)
        .querySelectorAll('table')[1]!
        .querySelectorAll('tr')!;
      for (const tr of trs) {
        if (addPadding) {
          replaceHtml(tr, [['<td>', '<td>&nbsp;&nbsp;&nbsp']]);
        } else if (tr.innerHTML.includes(GUESTS_FIELD)) {
          replaceHtml(tr, [[GUESTS_FIELD, '<td>Object[]</td>']]);
          addPadding = true;
        }
      }
    }
  }

  // Wrong padding for the `broadcaster_name` field
  // https://dev.twitch.tv/docs/api/reference/#get-unban-requests
  replaceHtml(getDocsEl('get-unban-requests'), [
    [
      '<td>&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;broadcaster_name</td>',
      '<td>&nbsp;&nbsp;&nbsp;broadcaster_name</td>',
    ],
  ]);
};

export default normalizeReferenceHtml;
