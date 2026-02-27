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

  // wrong quites
  replaceHtml(getCodeEl('get-shared-chat-session'), [
    ['“', '"', true],
    ['”', '"', true],
  ]);

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
  // https://github.com/DmitryScaletta/twitch-api-swagger/issues/11

  // https://dev.twitch.tv/docs/api/reference/#get-channel-guest-star-settings
  // https://dev.twitch.tv/docs/api/reference/#get-guest-star-session
  // https://dev.twitch.tv/docs/api/reference/#create-guest-star-session
  // https://dev.twitch.tv/docs/api/reference/#end-guest-star-session
  // https://dev.twitch.tv/docs/api/reference/#get-guest-star-invites
  // https://dev.twitch.tv/docs/api/reference/#send-guest-star-invite
  // https://dev.twitch.tv/docs/api/reference/#delete-guest-star-invite
  {
    const ids200 = [
      'get-channel-guest-star-settings',
      'get-guest-star-session',
      'create-guest-star-session',
      'end-guest-star-session',
      'get-guest-star-invites',
    ];
    for (const id of ids200) {
      replaceHtml(getDocsEl(id).querySelector('table:last-child')!, [
        ['<tbody>', '<tbody><tr><td>200 OK</td><td></td></tr>'],
      ]);
    }
    const ids204 = [
      'send-guest-star-invite', // NOT TESTED
      'delete-guest-star-invite',
    ];
    for (const id of ids204) {
      replaceHtml(getDocsEl(id).querySelector('table:last-child')!, [
        ['<tbody>', '<tbody><tr><td>204 No Content</td><td></td></tr>'],
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

  // Wrong padding for `video_id` and `markers` fields
  // https://dev.twitch.tv/docs/api/reference/#get-stream-markers
  replaceHtml(getDocsEl('get-stream-markers'), [
    [
      '<td>&nbsp;&nbsp;&nbsp;video_id</td>',
      '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;video_id</td>',
    ],
    [
      '<td>&nbsp;&nbsp;&nbsp;markers</td>',
      '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;markers</td>',
    ],
    [
      '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id</td>',
      '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id</td>',
    ],
    [
      '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;created_at</td>',
      '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;created_at</td>',
    ],
    [
      '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description</td>',
      '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description</td>',
    ],
    [
      '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;position_seconds</td>',
      '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;position_seconds</td>',
    ],
    [
      '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url</td>',
      '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url</td>',
    ],
  ]);

  // Replace type `Array` to `String[]`
  // https://dev.twitch.tv/docs/api/reference#add-suspicious-status-to-chat-user
  // https://dev.twitch.tv/docs/api/reference#remove-suspicious-status-from-chat-user
  {
    const ids = [
      'add-suspicious-status-to-chat-user',
      'remove-suspicious-status-from-chat-user',
    ];
    for (const id of ids) {
      replaceHtml(getDocsEl(id), [['<td>Array</td>', '<td>String[]</td>']]);
    }
  }

  // Add missing pagination
  {
    const paginationFieldsHtml = `
      <tr>
        <td>pagination</td>
        <td>Object</td>
        <td>
          Contains the information used to page through the list of results.
          The object is empty if there are no more pages left to page through.
          <a href="/docs/api/guide#pagination">Read More</a>
        </td>
      </tr>
      <tr>
        <td>&nbsp;&nbsp;&nbsp;cursor</td>
        <td>String</td>
        <td>
          The cursor used to get the next page of results.
          Use the cursor to set the request’s <em>after</em> query parameter.
        </td>
      </tr>
    `;
    const ids = [
      // has pagination in the examples
      'get-custom-reward-redemption',
      'search-categories',
      'search-channels',
      // actually has pagination
      'get-user-block-list',
      // TODO: maybe has pagination ('get-user-emotes' has pagination in the docs)
      // 'get-channel-editors',
      // 'get-channel-emotes',
      // 'get-global-emotes',
      // 'get-emote-sets',
      // 'get-channel-chat-badges',
      // 'get-global-chat-badges',
    ];
    for (const id of ids) {
      replaceHtml(getDocsEl(id).querySelectorAll('table')[1]!, [
        ['</tbody>', `${paginationFieldsHtml}</tbody>`],
      ]);
    }
  }

  // Wrong type for `snooze_refresh_at`, `next_ad_at`, `last_ad_at`
  // https://dev.twitch.tv/docs/api/reference#get-ad-schedule
  // https://dev.twitch.tv/docs/api/reference#snooze-next-ad
  {
    const ZERO = '<code class="highlighter-rouge">0</code>';
    const ids = ['get-ad-schedule', 'snooze-next-ad'];
    for (const id of ids) {
      replaceHtml(getDocsEl(id), [
        [
          'The UTC timestamp when the broadcaster will gain an additional snooze, in RFC3339 format.',
          `The UTC timestamp when the broadcaster will gain an additional snooze, in RFC3339 format. Can be ${ZERO}.`,
        ],
      ]);
    }
    replaceHtml(getDocsEl('get-ad-schedule'), [
      ['Empty if the channel', `${ZERO} if the channel`],
      [
        'snooze_refresh_at</td>\n      <td>String</td>',
        'snooze_refresh_at</td>\n      <td>Int64</td>',
      ],
      [
        'next_ad_at</td>\n      <td>String</td>',
        'next_ad_at</td>\n      <td>Int64</td>',
      ],
      [
        'last_ad_at</td>\n      <td>String</td>',
        'last_ad_at</td>\n      <td>Int64</td>',
      ],
    ]);
    replaceHtml(getDocsEl('snooze-next-ad'), [
      [
        'snooze_refresh_at</td>\n      <td>String</td>',
        'snooze_refresh_at</td>\n      <td>Int64</td>',
      ],
      [
        'next_ad_at</td>\n      <td>String</td>',
        'next_ad_at</td>\n      <td>Int64</td>',
      ],
      [
        'The UTC timestamp of the broadcaster’s next scheduled ad, in RFC3339 format.',
        `The UTC timestamp of the broadcaster’s next scheduled ad, in RFC3339 format. ${ZERO} if the channel has no ad scheduled or is not live.`,
      ],
    ]);
  }
};

export default normalizeReferenceHtml;
