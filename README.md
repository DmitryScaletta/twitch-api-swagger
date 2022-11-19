# twitch-api-ts

TypeScript definitions for Twitch API.

* Generated automatically from the [docs](https://dev.twitch.tv/docs/api/reference)
* Includes types for all endpoints
  * _Request Query Parameters_
  * _Request Body_
  * _Response Body_
* Includes descriptions for the fields
* Generated `TwitchApi` class with all methods _(uses `fetch` under the hood)_

`api.json` contains all parsed data from the docs so types can also be generated for other languages.

## Installation

```
npm i twitch-api-ts
```

```
yarn add twitch-api-ts
```

## Usage

### Types only

```ts
import type {
  UpdateAutoModSettingsParams,
  UpdateAutoModSettingsBody,
  UpdateAutoModSettingsResponse,
} from 'twitch-api-ts';

const updateAutoModSettings = async (
  params: UpdateAutoModSettingsParams,
  body: UpdateAutoModSettingsBody,
) => {
  const searchParams = new URLSearchParams(params);
  const url = `https://api.twitch.tv/helix/moderation/automod/settings?${searchParams}`;

  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      'Client-Id': process.env.CLIENT_ID,
      'Content-Type': 'application/json',
    },
  });

  return response.json() as Promise<UpdateAutoModSettingsResponse>;
}
```

### Generated `TwitchApi` class

```ts
import { TwitchApi } from 'twitch-api-ts';

const twitchApi = new TwitchApi({
  accessToken: process.env.ACCESS_TOKEN,
  clientId: process.env.CLIENT_ID,
});

const response = await twitchApi.chat.updateChatSettings(
  // query params
  { broadcaster_id: '1', moderator_id: '2' },
  // body
  { emote_mode: true },
);

if (response.ok) {
  console.log(response.data);
} else {
  console.error(response.status);
}

const streams = await twitchApi.streams.getStreams(
  {
    // some endpoints accepts multiple ids like this: `id=1234&id=5678`
    // for such parameters, a single value or an array of values can be passed
    user_id: ['1', '2']
  },
  // override accessToken and/or clientId for different requests
  '<accessToken>',
  '<clientId>',
);

if (streams.ok) {
  console.log(streams.data);
}
```

## Type examples

```ts
export interface GetChatSettingsParams {
  /** The ID of the broadcaster whose chat settings you want to get. */
  broadcaster_id: string;
  /**
   * The ID of a user that has permission to moderate the broadcaster’s chat room, or the broadcaster’s ID if they’re getting the settings.  
   *   
   * This field is required only if you want to include the `non_moderator_chat_delay` and `non_moderator_chat_delay_duration` settings in the response.  
   *   
   * If you specify this field, this ID must match the user ID in the user access token.
   */
  moderator_id?: string;
}

export interface GetChatSettingsResponse {
  /** The list of chat settings. The list contains a single object with all the settings. */
  data: {
    /** The ID of the broadcaster specified in the request. */
    broadcaster_id: string;
    /** A Boolean value that determines whether chat messages must contain only emotes. Is **true** if chat messages may contain only emotes; otherwise, **false**. */
    emote_mode: boolean;
    /**
     * A Boolean value that determines whether the broadcaster restricts the chat room to followers only.  
     *   
     * Is **true** if the broadcaster restricts the chat room to followers only; otherwise, **false**.  
     *   
     * See the `follower_mode_duration` field for how long users must follow the broadcaster before being able to participate in the chat room.
     */
    follower_mode: boolean;
    /** The length of time, in minutes, that users must follow the broadcaster before being able to participate in the chat room. Is **null** if `follower_mode` is **false**. */
    follower_mode_duration: number;
    /** The moderator’s ID. The response includes this field only if the request specifies a user access token that includes the **moderator:read:chat\_settings** scope. */
    moderator_id: string;
    /**
     * A Boolean value that determines whether the broadcaster adds a short delay before chat messages appear in the chat room. This gives chat moderators and bots a chance to remove them before viewers can see the message. See the `non_moderator_chat_delay_duration` field for the length of the delay. Is **true** if the broadcaster applies a delay; otherwise, **false**.  
     *   
     * The response includes this field only if the request specifies a user access token that includes the **moderator:read:chat\_settings** scope and the user in the _moderator\_id_ query parameter is one of the broadcaster’s moderators.
     */
    non_moderator_chat_delay: boolean;
    /**
     * The amount of time, in seconds, that messages are delayed before appearing in chat. Is **null** if `non_moderator_chat_delay` is **false**.  
     *   
     * The response includes this field only if the request specifies a user access token that includes the **moderator:read:chat\_settings** scope and the user in the _moderator\_id_ query parameter is one of the broadcaster’s moderators.
     */
    non_moderator_chat_delay_duration: number;
    /**
     * A Boolean value that determines whether the broadcaster limits how often users in the chat room are allowed to send messages.  
     *   
     * Is **true** if the broadcaster applies a delay; otherwise, **false**.  
     *   
     * See the `slow_mode_wait_time` field for the delay.
     */
    slow_mode: boolean;
    /**
     * The amount of time, in seconds, that users must wait between sending messages.  
     *   
     * Is **null** if slow\_mode is **false**.
     */
    slow_mode_wait_time: number;
    /**
     * A Boolean value that determines whether only users that subscribe to the broadcaster’s channel may talk in the chat room.  
     *   
     * Is **true** if the broadcaster restricts the chat room to subscribers only; otherwise, **false**.
     */
    subscriber_mode: boolean;
    /**
     * A Boolean value that determines whether the broadcaster requires users to post only unique messages in the chat room.  
     *   
     * Is **true** if the broadcaster requires unique messages only; otherwise, **false**.
     */
    unique_chat_mode: boolean;
  }[];
}
```
