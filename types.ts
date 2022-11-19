export interface StartCommercialBody {
  /** The ID of the broadcaster that wants to run the commercial. This ID must match the user ID found in the OAuth token. */
  broadcaster_id: string;
  /** The length of the commercial to run, in seconds. Twitch tries to serve a commercial that’s the requested length, but it may be shorter or longer. The maximum length you should request is 180 seconds. */
  length: number;
}

export interface StartCommercialResponse {
  /** An array that contains a single object with the status of your start commercial request. */
  data: {
    /** The length of the commercial you requested. If you request a commercial that’s longer than 180 seconds, the API uses 180 seconds. */
    length: number;
    /** A message that indicates whether Twitch was able to serve an ad. */
    message: string;
    /** The number of seconds you must wait before running another commercial. */
    retry_after: number;
  }[];
}

export interface GetExtensionAnalyticsParams {
  /** The extension’s client ID. If specified, the response contains a report for the specified extension. If not specified, the response includes a report for each extension that the authenticated user owns. */
  extension_id?: string;
  /**
   * The type of analytics report to get. Possible values are:  
   *   
   * * overview\_v2
   */
  type?: 'overview_v2';
  /**
   * The reporting window’s start date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-22T00:00:00Z).  
   *   
   * The start date must be on or after January 31, 2018\. If you specify an earlier date, the API ignores it and uses January 31, 2018\. If you specify a start date, you must specify an end date. If you don’t specify a start and end date, the report includes all available data since January 31, 2018.  
   *   
   * The report contains one row of data for each day in the reporting window.
   */
  started_at?: string;
  /**
   * The reporting window’s end date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-27T00:00:00Z). The report is inclusive of the end date.  
   *   
   * Specify an end date only if you provide a start date. Because it can take up to two days for the data to be available, you must specify an end date that’s earlier than today minus one to two days. If not, the API ignores your end date and uses an end date that is today minus one to two days.
   */
  ended_at?: string;
  /**
   * The maximum number of report URLs to return per page in the response. The minimum page size is 1 URL per page and the maximum is 100 URLs per page. The default is 20.  
   *   
   * **NOTE**: While you may specify a maximum value of 100, the response will contain at most 20 URLs per page.
   */
  first?: number;
  /**
   * The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)  
   *   
   * This parameter is ignored if the _extension\_id_ parameter is set.
   */
  after?: string;
}

export interface GetExtensionAnalyticsResponse {
  /** A list of reports. The reports are returned in no particular order; however, the data within each report is in ascending order by date (newest first). The report contains one row of data per day of the reporting window; the report contains rows for only those days that the extension was used. The array is empty if there are no reports. */
  data: {
    /** An ID that identifies the extension that the report was generated for. */
    extension_id: string;
    /** The URL that you use to download the report. The URL is valid for 5 minutes. */
    URL: string;
    /** The type of report. */
    type: string;
    /** The reporting window’s start and end dates, in RFC3339 format. */
    date_range: {
      /** The reporting window’s start date. */
      started_at: string;
      /** The reporting window’s end date. */
      ended_at: string;
    };
  }[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ query parameter. */
    cursor: string;
  };
}

export interface GetGameAnalyticsParams {
  /** The game’s client ID. If specified, the response contains a report for the specified game. If not specified, the response includes a report for each of the authenticated user’s games. */
  game_id?: string;
  /**
   * The type of analytics report to get. Possible values are:  
   *   
   * * overview\_v2
   */
  type?: 'overview_v2';
  /**
   * The reporting window’s start date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-22T00:00:00Z). If you specify a start date, you must specify an end date.  
   *   
   * The start date must be within one year of today’s date. If you specify an earlier date, the API ignores it and uses a date that’s one year prior to today’s date. If you don’t specify a start and end date, the report includes all available data for the last 365 days from today.  
   *   
   * The report contains one row of data for each day in the reporting window.
   */
  started_at?: string;
  /**
   * The reporting window’s end date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-22T00:00:00Z). The report is inclusive of the end date.  
   *   
   * Specify an end date only if you provide a start date. Because it can take up to two days for the data to be available, you must specify an end date that’s earlier than today minus one to two days. If not, the API ignores your end date and uses an end date that is today minus one to two days.
   */
  ended_at?: string;
  /**
   * The maximum number of report URLs to return per page in the response. The minimum page size is 1 URL per page and the maximum is 100 URLs per page. The default is 20.  
   *   
   * **NOTE**: While you may specify a maximum value of 100, the response will contain at most 20 URLs per page.
   */
  first?: number;
  /**
   * The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)  
   *   
   * This parameter is ignored if _game\_id_ parameter is set.
   */
  after?: string;
}

export interface GetGameAnalyticsResponse {
  /** A list of reports. The reports are returned in no particular order; however, the data within each report is in ascending order by date (newest first). The report contains one row of data per day of the reporting window; the report contains rows for only those days that the game was used. A report is available only if the game was broadcast for at least 5 hours over the reporting period. The array is empty if there are no reports. */
  data: {
    /** An ID that identifies the game that the report was generated for. */
    game_id: string;
    /** The URL that you use to download the report. The URL is valid for 5 minutes. */
    URL: string;
    /** The type of report. */
    type: string;
    /** The reporting window’s start and end dates, in RFC3339 format. */
    date_range: {
      /** The reporting window’s start date. */
      started_at: string;
      /** The reporting window’s end date. */
      ended_at: string;
    };
  }[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ query parameter. */
    cursor: string;
  };
}

export interface GetBitsLeaderboardParams {
  /** The number of results to return. The minimum count is 1 and the maximum is 100\. The default is 10. */
  count?: number;
  /**
   * The time period over which data is aggregated (uses the PST time zone). Possible values are:  
   *   
   * * day — A day spans from 00:00:00 on the day specified in _started\_at_ and runs through 00:00:00 of the next day.
   * * week — A week spans from 00:00:00 on the Monday of the week specified in _started\_at_ and runs through 00:00:00 of the next Monday.
   * * month — A month spans from 00:00:00 on the first day of the month specified in _started\_at_ and runs through 00:00:00 of the first day of the next month.
   * * year — A year spans from 00:00:00 on the first day of the year specified in _started\_at_ and runs through 00:00:00 of the first day of the next year.
   * * all — Default. The lifetime of the broadcaster's channel.
   */
  period?: 'day' | 'week' | 'month' | 'year' | 'all';
  /**
   * The start date, in RFC3339 format, used for determining the aggregation period. Specify this parameter only if you specify the _period_ query parameter. The start date is ignored if _period_ is all.  
   *   
   * If you don’t specify a start date, the time period specified by _period_ is assumed. For example, if _period_ is _month_, the data is aggregated for the current month.  
   *   
   * Note that the date is converted to PST before being used, so if you set the start time to `2022-01-01T00:00:00.0Z` and _period_ to month, the actual reporting period is December 2021, not January 2022\. If you want the reporting period to be January 2022, you must set the start time to `2022-01-01T08:00:00.0Z` or `2022-01-01T00:00:00.0-08:00`.  
   *   
   * If your start date uses the ‘+’ offset operator (for example, `2022-01-01T00:00:00.0+05:00`), you must URL encode the start date.
   */
  started_at?: string;
  /** An ID that identifies a user that cheered bits in the channel. If _count_ is greater than 1, the response may include users ranked above and below the specified user. To get the leaderboard’s top leaders, don’t specify a user ID. */
  user_id?: string;
}

export interface GetBitsLeaderboardResponse {
  /** A list of leaderboard leaders. The leaders are returned in rank order. The array is empty if nobody has cheered bits. */
  data: {
    /** An ID that identifies a user on the leaderboard. */
    user_id: string;
    /** The user’s login name. */
    user_login: string;
    /** The user’s display name. */
    user_name: string;
    /** The user’s position on the leaderboard. */
    rank: number;
    /** The number of Bits the user has cheered. */
    score: number;
  }[];
  /** The reporting window’s start and end dates, in RFC3339 format. The dates are calculated by using the _started\_at_ and _period_ query parameters. If you don’t specify the _started\_at_ query parameter, the fields contain empty strings. */
  date_range: {
    /** The reporting window’s start date. */
    started_at: string;
    /** The reporting window’s end date. */
    ended_at: string;
  };
  /** The number of ranked users in `data`. This is the value in the _count_ query parameter or the total number of entries on the leaderboard, whichever is less. */
  total: number;
}

export interface GetCheermotesParams {
  /**
   * The ID of the broadcaster whose custom Cheermotes you want to get. Specify the broadcaster’s ID if you want to include the broadcaster’s Cheermotes in the response (not all broadcasters upload Cheermotes). If not specified, the response contains only global Cheermotes.  
   *   
   * If the broadcaster uploaded Cheermotes, the `type` field in the response is set to **channel\_custom**.
   */
  broadcaster_id?: string;
}

export interface GetCheermotesResponse {
  /** The list of Cheermotes. The list is in ascending order by the `order` field’s value. */
  data: {
    /** The name portion of the Cheermote string that you use in chat to cheer Bits. The full Cheermote string is the concatenation of {prefix} + {number of Bits}. For example, if the prefix is “Cheer” and you want to cheer 100 Bits, the full Cheermote string is Cheer100\. When the Cheermote string is entered in chat, Twitch converts it to the image associated with the Bits tier that was cheered. */
    prefix: string;
    /** A list of tier levels that the Cheermote supports. Each tier identifies the range of Bits that you can cheer at that tier level and an image that graphically identifies the tier level. */
    tiers: {
      /** The minimum number of Bits that you must cheer at this tier level. The maximum number of Bits that you can cheer at this level is determined by the required minimum Bits of the next tier level minus 1\. For example, if `min_bits` is 1 and `min_bits` for the next tier is 100, the Bits range for this tier level is 1 through 99\. The minimum Bits value of the last tier is the maximum number of Bits you can cheer using this Cheermote. For example, 10000. */
      min_bits: number;
      /**
       * The tier level. Possible tiers are:  
       *   
       * * 1
       * * 100
       * * 500
       * * 1000
       * * 5000
       * * 10000
       * * 100000
       */
      id: '1' | '100' | '500' | '1000' | '5000' | '10000' | '100000';
      /** The hex code of the color associated with this tier level (for example, #979797). */
      color: string;
      /** The animated and static image sets for the Cheermote. The dictionary of images is organized by theme, format, and size. The theme keys are _dark_ and _light_. Each theme is a dictionary of formats: _animated_ and _static_. Each format is a dictionary of sizes: 1, 1.5, 2, 3, and 4\. The value of each size contains the URL to the image. */
      images: Record<string, any>;
      /** A Boolean value that determines whether users can cheer at this tier level. */
      can_cheer: boolean;
      /** A Boolean value that determines whether this tier level is shown in the Bits card. Is **true** if this tier level is shown in the Bits card. */
      show_in_bits_card: boolean;
    }[];
    /**
     * The type of Cheermote. Possible values are:  
     *   
     * * global\_first\_party — A Twitch-defined Cheermote that is shown in the Bits card.
     * * global\_third\_party — A Twitch-defined Cheermote that is not shown in the Bits card.
     * * channel\_custom — A broadcaster-defined Cheermote.
     * * display\_only — Do not use; for internal use only.
     * * sponsored — A sponsor-defined Cheermote. When used, the sponsor adds additional Bits to the amount that the user cheered. For example, if the user cheered Terminator100, the broadcaster might receive 110 Bits, which includes the sponsor's 10 Bits contribution.
     */
    type: 'global_first_party' | 'global_third_party' | 'channel_custom' | 'display_only' | 'sponsored';
    /** The order that the Cheermotes are shown in the Bits card. The numbers may not be consecutive. For example, the numbers may jump from 1 to 7 to 13\. The order numbers are unique within a Cheermote type (for example, global\_first\_party) but may not be unique amongst all Cheermotes in the response. */
    order: number;
    /** The date and time, in RFC3339 format, when this Cheermote was last updated. */
    last_updated: string;
    /** A Boolean value that indicates whether this Cheermote provides a charitable contribution match during charity campaigns. */
    is_charitable: boolean;
  }[];
}

export interface GetExtensionTransactionsParams {
  /** The ID of the extension whose list of transactions you want to get. */
  extension_id: string;
  /** A transaction ID used to filter the list of transactions. Specify this parameter for each transaction you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 100 IDs. */
  id?: string | string[];
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetExtensionTransactionsResponse {
  /** The list of transactions. */
  data: {
    /** An ID that identifies the transaction. */
    id: string;
    /** The UTC date and time (in RFC3339 format) of the transaction. */
    timestamp: string;
    /** The ID of the broadcaster that owns the channel where the transaction occurred. */
    broadcaster_id: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The ID of the user that purchased the digital product. */
    user_id: string;
    /** The user’s login name. */
    user_login: string;
    /** The user’s display name. */
    user_name: string;
    /**
     * The type of transaction. Possible values are:  
     *   
     * * BITS\_IN\_EXTENSION
     */
    product_type: 'BITS_IN_EXTENSION';
    /** Contains details about the digital product. */
    product_data: {
      /** An ID that identifies the digital product. */
      sku: string;
      /** Set to `twitch.ext.` \+ `<the extension's ID>`. */
      domain: string;
      /** Contains details about the digital product’s cost. */
      cost: Object;
      /** A Boolean value that determines whether the product is in development. Is **true** if the digital product is in development and cannot be exchanged. */
      inDevelopment: boolean;
      /** The name of the digital product. */
      displayName: string;
      /** This field is always empty since you may purchase only unexpired products. */
      expiration: string;
      /** A Boolean value that determines whether the data was broadcast to all instances of the extension. Is **true** if the data was broadcast to all instances. */
      broadcast: boolean;
    };
  }[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ query parameter. */
    cursor: string;
  };
}

export interface GetChannelInformationParams {
  /** The ID of the broadcaster whose channel you want to get. To specify more than one ID, include this parameter for each broadcaster you want to get. For example, `broadcaster_id=1234&broadcaster_id=5678`. You may specify a maximum of 100 IDs. The API ignores duplicate IDs and IDs that are not found. */
  broadcaster_id: string | string[];
}

export interface GetChannelInformationResponse {
  /** A list that contains information about the specified channels. The list is empty if the specified channels weren’t found. */
  data: {
    /** An ID that uniquely identifies the broadcaster. */
    broadcaster_id: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The broadcaster’s preferred language. The value is an ISO 639-1 two-letter language code (for example, _en_ for English). The value is set to “other” if the language is not a Twitch supported language. */
    broadcaster_language: string;
    /** The name of the game that the broadcaster is playing or last played. The value is an empty string if the broadcaster has never played a game. */
    game_name: string;
    /** An ID that uniquely identifies the game that the broadcaster is playing or last played. The value is an empty string if the broadcaster has never played a game. */
    game_id: string;
    /** The title of the stream that the broadcaster is currently streaming or last streamed. The value is an empty string if the broadcaster has never streamed. */
    title: string;
    /** The value of the broadcaster’s stream delay setting, in seconds. Reserved for users with Partner status. */
    delay: number;
  }[];
}

/**
 * All fields are optional, but you must specify at least one field.
 */
export interface ModifyChannelInformationBody {
  /** The ID of the game that the user plays. The game is not updated if the ID isn’t a game ID that Twitch recognizes. To unset this field, use “0” or “” (an empty string). */
  game_id?: string;
  /** The user’s preferred language. Set the value to an ISO 639-1 two-letter language code (for example, _en_ for English). Set to “other” if the user’s preferred language is not a Twitch supported language. The language isn’t updated if the language code isn’t a Twitch supported language. */
  broadcaster_language?: string;
  /** The title of the user’s stream. You may not set this field to an empty string. */
  title?: string;
  /** The number of seconds you want your broadcast buffered before streaming it live. The delay helps ensure fairness during competitive play. Only users with Partner status may set this field. The maximum delay is 900 seconds (15 minutes). */
  delay?: number;
}

export interface ModifyChannelInformationParams {
  /** The ID of the broadcaster whose channel you want to update. This ID must match the user ID associated with the user access token. */
  broadcaster_id: string;
}

export interface GetChannelEditorsParams {
  /** The ID of the broadcaster that owns the channel. This ID must match the user ID in the access token. */
  broadcaster_id: string;
}

export interface GetChannelEditorsResponse {
  /** A list of users that are editors for the specified broadcaster. The list is empty if the broadcaster doesn’t have editors. */
  data: {
    /** An ID that uniquely identifies a user with editor permissions. */
    user_id: string;
    /** The user’s display name. */
    user_name: string;
    /** The date and time, in RFC3339 format, when the user became one of the broadcaster’s editors. */
    created_at: string;
  }[];
}

export interface CreateCustomRewardsBody {
  /** The custom reward’s title. The title may contain a maximum of 45 characters and it must be unique amongst all of the broadcaster’s custom rewards. */
  title: string;
  /** The cost of the reward, in Channel Points. The minimum is 1 point. */
  cost: number;
  /** The prompt shown to the viewer when they redeem the reward. Specify a prompt if `is_user_input_required` is **true**. The prompt is limited to a maximum of 200 characters. */
  prompt?: string;
  /** A Boolean value that determines whether the reward is enabled. Viewers see only enabled rewards. The default is **true**. */
  is_enabled?: boolean;
  /** The background color to use for the reward. Specify the color using Hex format (for example, #9147FF). */
  background_color?: string;
  /** A Boolean value that determines whether the user needs to enter information when redeeming the reward. See the `prompt` field. The default is **false**. */
  is_user_input_required?: boolean;
  /** A Boolean value that determines whether to limit the maximum number of redemptions allowed per live stream (see the `max_per_stream` field). The default is **false**. */
  is_max_per_stream_enabled?: boolean;
  /** The maximum number of redemptions allowed per live stream. Applied only if `is_max_per_stream_enabled` is **true**. The minimum value is 1. */
  max_per_stream?: number;
  /** A Boolean value that determines whether to limit the maximum number of redemptions allowed per user per stream (see the `max_per_user_per_stream` field). The default is **false**. */
  is_max_per_user_per_stream_enabled?: boolean;
  /** The maximum number of redemptions allowed per user per stream. Applied only if `is_max_per_user_per_stream_enabled` is **true**. The minimum value is 1. */
  max_per_user_per_stream?: number;
  /** A Boolean value that determines whether to apply a cooldown period between redemptions (see the `global_cooldown_seconds` field for the duration of the cooldown period). The default is **false**. */
  is_global_cooldown_enabled?: boolean;
  /** The cooldown period, in seconds. Applied only if the `is_global_cooldown_enabled` field is **true**. The minimum value is 1; however, the minimum value is 60 for it to be shown in the Twitch UX. */
  global_cooldown_seconds?: number;
  /** A Boolean value that determines whether redemptions should be set to FULFILLED status immediately when a reward is redeemed. If **false**, status is set to UNFULFILLED and follows the normal request queue process. The default is **false**. */
  should_redemptions_skip_request_queue?: boolean;
}

export interface CreateCustomRewardsParams {
  /** The ID of the broadcaster to add the custom reward to. This ID must match the user ID found in the OAuth token. */
  broadcaster_id: string;
}

export interface CreateCustomRewardsResponse {
  /** A list that contains the single custom reward you created. */
  data: {
    /** The ID that uniquely identifies the broadcaster. */
    broadcaster_id: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The ID that uniquely identifies this custom reward. */
    id: string;
    /** The title of the reward. */
    title: string;
    /** The prompt shown to the viewer when they redeem the reward if user input is required (see the `is_user_input_required` field). */
    prompt: string;
    /** The cost of the reward in Channel Points. */
    cost: number;
    /** A set of custom images for the reward. This field is set to **null** if the broadcaster didn’t upload images. */
    image: {
      /** The URL to a small version of the image. */
      url_1x: string;
      /** The URL to a medium version of the image. */
      url_2x: string;
      /** The URL to a large version of the image. */
      url_4x: string;
    };
    /** A set of default images for the reward. */
    default_image: {
      /** The URL to a small version of the image. */
      url_1x: string;
      /** The URL to a medium version of the image. */
      url_2x: string;
      /** The URL to a large version of the image. */
      url_4x: string;
    };
    /** The background color to use for the reward. The color is in Hex format (for example, #00E5CB). */
    background_color: string;
    /** A Boolean value that determines whether the reward is enabled. Is **true** if enabled; otherwise, **false**. Disabled rewards aren’t shown to the user. */
    is_enabled: boolean;
    /** A Boolean value that determines whether the user must enter information when redeeming the reward. Is **true** if the reward requires user input. */
    is_user_input_required: boolean;
    /** The settings used to determine whether to apply a maximum to the number to the redemptions allowed per live stream. */
    max_per_stream_setting: {
      /** A Boolean value that determines whether the reward applies a limit on the number of redemptions allowed per live stream. Is **true** if the reward applies a limit. */
      is_enabled: boolean;
      /** The maximum number of redemptions allowed per live stream. */
      max_per_stream: number;
    };
    /** The settings used to determine whether to apply a maximum to the number of redemptions allowed per user per live stream. */
    max_per_user_per_stream_setting: {
      /** A Boolean value that determines whether the reward applies a limit on the number of redemptions allowed per user per live stream. Is **true** if the reward applies a limit. */
      is_enabled: boolean;
      /** The maximum number of redemptions allowed per user per live stream. */
      max_per_user_per_stream: number;
    };
    /** The settings used to determine whether to apply a cooldown period between redemptions and the length of the cooldown. */
    global_cooldown_setting: {
      /** A Boolean value that determines whether to apply a cooldown period. Is **true** if a cooldown period is enabled. */
      is_enabled: boolean;
      /** The cooldown period, in seconds. */
      global_cooldown_seconds: number;
    };
    /** A Boolean value that determines whether the reward is currently paused. Is **true** if the reward is paused. Viewers can’t redeem paused rewards. */
    is_paused: boolean;
    /** A Boolean value that determines whether the reward is currently in stock. Is **true** if the reward is in stock. Viewers can’t redeem out of stock rewards. */
    is_in_stock: boolean;
    /** A Boolean value that determines whether redemptions should be set to FULFILLED status immediately when a reward is redeemed. If **false**, status is UNFULFILLED and follows the normal request queue process. */
    should_redemptions_skip_request_queue: boolean;
    /** The number of redemptions redeemed during the current live stream. The number counts against the `max_per_stream_setting` limit. This field is **null** if the broadcaster’s stream isn’t live or _max\_per\_stream\_setting_ isn’t enabled. */
    redemptions_redeemed_current_stream: number;
    /** The timestamp of when the cooldown period expires. Is **null** if the reward isn’t in a cooldown state (see the `global_cooldown_setting` field). */
    cooldown_expires_at: string;
  }[];
}

export interface DeleteCustomRewardParams {
  /** The ID of the broadcaster that created the custom reward. This ID must match the user ID found in the OAuth token. */
  broadcaster_id: string;
  /** The ID of the custom reward to delete. */
  id: string;
}

export interface GetCustomRewardParams {
  /** The ID of the broadcaster whose custom rewards you want to get. This ID must match the user ID found in the OAuth token. */
  broadcaster_id: string;
  /**
   * A list of IDs to filter the rewards by. To specify more than one ID, include this parameter for each reward you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 50 IDs.  
   *   
   * Duplicate IDs are ignored. The response contains only the IDs that were found. If none of the IDs were found, the response is 404 Not Found.
   */
  id?: string | string[];
  /** A Boolean value that determines whether the response contains only the custom rewards that the app may manage (the app is identified by the ID in the Client-Id header). Set to **true** to get only the custom rewards that the app may manage. The default is **false**. */
  only_manageable_rewards?: boolean;
}

export interface GetCustomRewardResponse {
  /** A list of custom rewards. The list is in ascending order by `id`. If the broadcaster hasn’t created custom rewards, the list is empty. */
  data: {
    /** The ID that uniquely identifies the broadcaster. */
    broadcaster_id: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The ID that uniquely identifies this custom reward. */
    id: string;
    /** The title of the reward. */
    title: string;
    /** The prompt shown to the viewer when they redeem the reward if user input is required (see the `is_user_input_required` field). */
    prompt: string;
    /** The cost of the reward in Channel Points. */
    cost: number;
    /** A set of custom images for the reward. This field is **null** if the broadcaster didn’t upload images. */
    image: {
      /** The URL to a small version of the image. */
      url_1x: string;
      /** The URL to a medium version of the image. */
      url_2x: string;
      /** The URL to a large version of the image. */
      url_4x: string;
    };
    /** A set of default images for the reward. */
    default_image: {
      /** The URL to a small version of the image. */
      url_1x: string;
      /** The URL to a medium version of the image. */
      url_2x: string;
      /** The URL to a large version of the image. */
      url_4x: string;
    };
    /** The background color to use for the reward. The color is in Hex format (for example, #00E5CB). */
    background_color: string;
    /** A Boolean value that determines whether the reward is enabled. Is **true** if enabled; otherwise, **false**. Disabled rewards aren’t shown to the user. */
    is_enabled: boolean;
    /** A Boolean value that determines whether the user must enter information when redeeming the reward. Is **true** if the user is prompted. */
    is_user_input_required: boolean;
    /** The settings used to determine whether to apply a maximum to the number of redemptions allowed per live stream. */
    max_per_stream_setting: {
      /** A Boolean value that determines whether the reward applies a limit on the number of redemptions allowed per live stream. Is **true** if the reward applies a limit. */
      is_enabled: boolean;
      /** The maximum number of redemptions allowed per live stream. */
      max_per_stream: number;
    };
    /** The settings used to determine whether to apply a maximum to the number of redemptions allowed per user per live stream. */
    max_per_user_per_stream_setting: {
      /** A Boolean value that determines whether the reward applies a limit on the number of redemptions allowed per user per live stream. Is **true** if the reward applies a limit. */
      is_enabled: boolean;
      /** The maximum number of redemptions allowed per user per live stream. */
      max_per_user_per_stream: number;
    };
    /** The settings used to determine whether to apply a cooldown period between redemptions and the length of the cooldown. */
    global_cooldown_setting: {
      /** A Boolean value that determines whether to apply a cooldown period. Is **true** if a cooldown period is enabled. */
      is_enabled: boolean;
      /** The cooldown period, in seconds. */
      global_cooldown_seconds: number;
    };
    /** A Boolean value that determines whether the reward is currently paused. Is **true** if the reward is paused. Viewers can’t redeem paused rewards. */
    is_paused: boolean;
    /** A Boolean value that determines whether the reward is currently in stock. Is **true** if the reward is in stock. Viewers can’t redeem out of stock rewards. */
    is_in_stock: boolean;
    /** A Boolean value that determines whether redemptions should be set to FULFILLED status immediately when a reward is redeemed. If **false**, status is set to UNFULFILLED and follows the normal request queue process. */
    should_redemptions_skip_request_queue: boolean;
    /** The number of redemptions redeemed during the current live stream. The number counts against the `max_per_stream_setting` limit. This field is **null** if the broadcaster’s stream isn’t live or _max\_per\_stream\_setting_ isn’t enabled. */
    redemptions_redeemed_current_stream: number;
    /** The timestamp of when the cooldown period expires. Is **null** if the reward isn’t in a cooldown state. See the `global_cooldown_setting` field. */
    cooldown_expires_at: string;
  }[];
}

export interface GetCustomRewardRedemptionParams {
  /** The ID of the broadcaster that owns the custom reward. This ID must match the user ID found in the user OAuth token. */
  broadcaster_id: string;
  /** The ID that identifies the custom reward whose redemptions you want to get. */
  reward_id: string;
  /**
   * The status of the redemptions to return. The possible case-sensitive values are:  
   *   
   * * CANCELED
   * * FULFILLED
   * * UNFULFILLED
   *   
   * **NOTE**: This field is required only if you don’t specify the _id_ query parameter.
   */
  status: 'CANCELED' | 'FULFILLED' | 'UNFULFILLED';
  /**
   * A list of IDs to filter the redemptions by. To specify more than one ID, include this parameter for each redemption you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 50 IDs.  
   *   
   * Duplicate IDs are ignored. The response contains only the IDs that were found. If none of the IDs were found, the response is 404 Not Found.
   */
  id?: string | string[];
  /**
   * The order to sort redemptions by. The possible case-sensitive values are:  
   *   
   * * OLDEST
   * * NEWEST
   *   
   * The default is OLDEST.
   */
  sort?: 'OLDEST' | 'NEWEST';
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read more](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
  /** The maximum number of redemptions to return per page in the response. The minimum page size is 1 redemption per page and the maximum is 50\. The default is 20. */
  first?: number;
}

export interface GetCustomRewardRedemptionResponse {
  /** The list of redemptions for the specified reward. The list is empty if there are no redemptions that match the redemption criteria. */
  data: {
    /** The ID that uniquely identifies the broadcaster. */
    broadcaster_id: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The ID that uniquely identifies this redemption. */
    id: string;
    /** The user’s login name. */
    user_login: string;
    /** The ID that uniquely identifies the user that redeemed the reward. */
    user_id: string;
    /** The user’s display name. */
    user_name: string;
    /** The text the user entered at the prompt when they redeemed the reward; otherwise, an empty string if user input was not required. */
    user_input: string;
    /**
     * The state of the redemption. Possible values are:  
     *   
     * * CANCELED
     * * FULFILLED
     * * UNFULFILLED
     */
    status: 'CANCELED' | 'FULFILLED' | 'UNFULFILLED';
    /** The date and time of when the reward was redeemed, in RFC3339 format. */
    redeemed_at: string;
    /** The reward that the user redeemed. */
    reward: {
      /** The ID that uniquely identifies the redeemed reward. */
      id: string;
      /** The reward’s title. */
      title: string;
      /** The prompt displayed to the viewer if user input is required. */
      prompt: string;
      /** The reward’s cost, in Channel Points. */
      reward: number;
    };
  }[];
}

/**
 * The body of the request should contain only the fields you’re updating.
 */
export interface UpdateCustomRewardBody {
  /** The reward’s title. The title may contain a maximum of 45 characters and it must be unique amongst all of the broadcaster’s custom rewards. */
  title?: string;
  /** The prompt shown to the viewer when they redeem the reward. Specify a prompt if `is_user_input_required` is **true**. The prompt is limited to a maximum of 200 characters. */
  prompt?: string;
  /** The cost of the reward, in channel points. The minimum is 1 point. */
  cost?: number;
  /** The background color to use for the reward. Specify the color using Hex format (for example, #00E5CB). */
  background_color?: string;
  /** A Boolean value that indicates whether the reward is enabled. Set to **true** to enable the reward. Viewers see only enabled rewards. */
  is_enabled?: boolean;
  /** A Boolean value that determines whether users must enter information to redeem the reward. Set to **true** if user input is required. See the `prompt` field. */
  is_user_input_required?: boolean;
  /** A Boolean value that determines whether to limit the maximum number of redemptions allowed per live stream (see the `max_per_stream` field). Set to **true** to limit redemptions. */
  is_max_per_stream_enabled?: boolean;
  /** The maximum number of redemptions allowed per live stream. Applied only if `is_max_per_stream_enabled` is **true**. The minimum value is 1. */
  max_per_stream?: number;
  /** A Boolean value that determines whether to limit the maximum number of redemptions allowed per user per stream (see `max_per_user_per_stream`). The minimum value is 1\. Set to **true** to limit redemptions. */
  is_max_per_user_per_stream_enabled?: boolean;
  /** The maximum number of redemptions allowed per user per stream. Applied only if `is_max_per_user_per_stream_enabled` is **true**. */
  max_per_user_per_stream?: number;
  /** A Boolean value that determines whether to apply a cooldown period between redemptions. Set to **true** to apply a cooldown period. For the duration of the cooldown period, see `global_cooldown_seconds`. */
  is_global_cooldown_enabled?: boolean;
  /** The cooldown period, in seconds. Applied only if `is_global_cooldown_enabled` is **true**. The minimum value is 1; however, for it to be shown in the Twitch UX, the minimum value is 60. */
  global_cooldown_seconds?: number;
  /** A Boolean value that determines whether to pause the reward. Set to **true** to pause the reward. Viewers can’t redeem paused rewards.. */
  is_paused?: boolean;
  /** A Boolean value that determines whether redemptions should be set to FULFILLED status immediately when a reward is redeemed. If **false**, status is set to UNFULFILLED and follows the normal request queue process. */
  should_redemptions_skip_request_queue?: boolean;
}

export interface UpdateCustomRewardParams {
  /** The ID of the broadcaster that’s updating the reward. This ID must match the user ID found in the OAuth token. */
  broadcaster_id: string;
  /** The ID of the reward to update. */
  id: string;
}

export interface UpdateCustomRewardResponse {
  /** The list contains the single reward that you updated. */
  data: {
    /** The ID that uniquely identifies the broadcaster. */
    broadcaster_id: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The ID that uniquely identifies this custom reward. */
    id: string;
    /** The title of the reward. */
    title: string;
    /** The prompt shown to the viewer when they redeem the reward if user input is required. See the `is_user_input_required` field. */
    prompt: string;
    /** The cost of the reward in Channel Points. */
    cost: number;
    /** A set of custom images for the reward. This field is **null** if the broadcaster didn’t upload images. */
    image: {
      /** The URL to a small version of the image. */
      url_1x: string;
      /** The URL to a medium version of the image. */
      url_2x: string;
      /** The URL to a large version of the image. */
      url_4x: string;
    };
    /** A set of default images for the reward. */
    default_image: {
      /** The URL to a small version of the image. */
      url_1x: string;
      /** The URL to a medium version of the image. */
      url_2x: string;
      /** The URL to a large version of the image. */
      url_4x: string;
    };
    /** The background color to use for the reward. The color is in Hex format (for example, #00E5CB). */
    background_color: string;
    /** A Boolean value that determines whether the reward is enabled. Is **true** if enabled; otherwise, **false**. Disabled rewards aren’t shown to the user. */
    is_enabled: boolean;
    /** A Boolean value that determines whether the user must enter information when they redeem the reward. Is **true** if the user is prompted. */
    is_user_input_required: boolean;
    /** The settings used to determine whether to apply a maximum to the number of redemptions allowed per live stream. */
    max_per_stream_setting: {
      /** A Boolean value that determines whether the reward applies a limit on the number of redemptions allowed per live stream. Is **true** if the reward applies a limit. */
      is_enabled: boolean;
      /** The maximum number of redemptions allowed per live stream. */
      max_per_stream: number;
    };
    /** The settings used to determine whether to apply a maximum to the number of redemptions allowed per user per live stream. */
    max_per_user_per_stream_setting: {
      /** A Boolean value that determines whether the reward applies a limit on the number of redemptions allowed per user per live stream. Is **true** if the reward applies a limit. */
      is_enabled: boolean;
      /** The maximum number of redemptions allowed per user per live stream. */
      max_per_user_per_stream: number;
    };
    /** The settings used to determine whether to apply a cooldown period between redemptions and the length of the cooldown. */
    global_cooldown_setting: {
      /** A Boolean value that determines whether to apply a cooldown period. Is **true** if a cooldown period is enabled. */
      is_enabled: boolean;
    };
    /** A Boolean value that determines whether the reward is currently paused. Is **true** if the reward is paused. Viewers can’t redeem paused rewards. */
    is_paused: boolean;
    /** A Boolean value that determines whether the reward is currently in stock. Is **true** if the reward is in stock. Viewers can’t redeem out of stock rewards. */
    is_in_stock: boolean;
    /** A Boolean value that determines whether redemptions should be set to FULFILLED status immediately when a reward is redeemed. If **false**, status is set to UNFULFILLED and follows the normal request queue process. */
    should_redemptions_skip_request_queue: boolean;
    /** The number of redemptions redeemed during the current live stream. The number counts against the `max_per_stream_setting` limit. This field is **null** if the broadcaster’s stream isn’t live or _max\_per\_stream\_setting_ isn’t enabled. */
    redemptions_redeemed_current_stream: number;
    /** The timestamp of when the cooldown period expires. Is **null** if the reward isn’t in a cooldown state. See the `global_cooldown_setting` field. */
    cooldown_expires_at: string;
  }[];
}

export interface UpdateRedemptionStatusBody {
  /**
   * The status to set the redemption to. Possible values are:  
   *   
   * * CANCELED
   * * FULFILLED
   *   
   * Setting the status to CANCELED refunds the user’s channel points.
   */
  status: 'CANCELED' | 'FULFILLED';
}

export interface UpdateRedemptionStatusParams {
  /** A list of IDs that identify the redemptions to update. To specify more than one ID, include this parameter for each redemption you want to update. For example, `id=1234&id=5678`. You may specify a maximum of 50 IDs. */
  id: string | string[];
  /** The ID of the broadcaster that’s updating the redemption. This ID must match the user ID associated with the user OAuth token. */
  broadcaster_id: string;
  /** The ID that identifies the reward that’s been redeemed. */
  reward_id: string;
}

export interface UpdateRedemptionStatusResponse {
  /** The list contains the single redemption that you updated. */
  data: {
    /** The ID that uniquely identifies the broadcaster. */
    broadcaster_id: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The ID that uniquely identifies this redemption.. */
    id: string;
    /** The ID of the user that redeemed the reward. */
    user_id: string;
    /** The user’s display name. */
    user_name: string;
    /** The user’s login name. */
    user_login: string;
    /** An object that describes the reward that the user redeemed. */
    reward: {
      /** The ID that uniquely identifies the reward. */
      id: string;
      /** The reward’s title. */
      title: string;
      /** The prompt displayed to the viewer if user input is required. */
      prompt: string;
      /** The reward’s cost, in Channel Points. */
      cost: number;
    };
    /** The text that the user entered at the prompt when they redeemed the reward; otherwise, an empty string if user input was not required. */
    user_input: string;
    /**
     * The state of the redemption. Possible values are:  
     *   
     * * CANCELED
     * * FULFILLED
     * * UNFULFILLED
     */
    status: 'CANCELED' | 'FULFILLED' | 'UNFULFILLED';
    /** The date and time of when the reward was redeemed, in RFC3339 format. */
    redeemed_at: string;
  }[];
}

export interface GetCharityCampaignParams {
  /** The ID of the broadcaster that’s currently running a charity campaign. This ID must match the user ID in the access token. */
  broadcaster_id: string;
}

export interface GetCharityCampaignResponse {
  /** A list that contains the charity campaign that the broadcaster is currently running. The list is empty if the broadcaster is not running a charity campaign; the campaign information is not available after the campaign ends. */
  data: {
    /** An ID that uniquely identifies the charity campaign. */
    id: string;
    /** An ID that uniquely identifies the broadcaster that’s running the campaign. */
    broadcaster_id: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The charity’s name. */
    charity_name: string;
    /** A description of the charity. */
    charity_description: string;
    /** A URL to an image of the charity’s logo. The image’s type is PNG and its size is 100px X 100px. */
    charity_logo: string;
    /** A URL to the charity’s website. */
    charity_website: string;
    /** The current amount of donations that the campaign has received. */
    current_amount: {
      /** The monetary amount. The amount is specified in the currency’s minor unit. For example, the minor units for USD is cents, so if the amount is $5.50 USD, `value` is set to 550. */
      value: number;
      /**
       * The number of decimal places used by the currency. For example, USD uses two decimal places. Use this number to translate `value` from minor units to major units by using the formula:  
       *   
       * `value / 10^decimal_places`
       */
      decimal_places: number;
      /** The ISO-4217 three-letter currency code that identifies the type of currency in `value`. */
      currency: string;
    };
    /** The amount of money that the campaign is trying to raise. This field may be **null** if the broadcaster has not defined a target goal. */
    target_amount: {
      /** The monetary amount. The amount is specified in the currency’s minor unit. For example, the minor units for USD is cents, so if the amount is $5.50 USD, `value` is set to 550. */
      value: number;
      /**
       * The number of decimal places used by the currency. For example, USD uses two decimal places. Use this number to translate `value` from minor units to major units by using the formula:  
       *   
       * `value / 10^decimal_places`
       */
      decimal_places: number;
      /** The ISO-4217 three-letter currency code that identifies the type of currency in `value`. */
      currency: string;
    };
  }[];
}

export interface GetCharityCampaignDonationsParams {
  /** The ID of the broadcaster that’s currently running a charity campaign. This ID must match the user ID in the access token. */
  broadcaster_id: string;
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100\. The default is 20. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetCharityCampaignDonationsResponse {
  /** A list that contains the donations that users have made to the broadcaster’s charity campaign. The list is empty if the broadcaster is not currently running a charity campaign; the donation information is not available after the campaign ends. */
  data: {
    /** An ID that identifies the charity campaign that the donation applies to. */
    campaign_id: string;
    /** An ID that identifies a user that donated money to the campaign. */
    user_id: string;
    /** The user’s login name. */
    user_login: string;
    /** The user’s display name. */
    user_name: string;
    /** An object that contains the amount of money that the user donated. */
    amount: {
      /** The monetary amount. The amount is specified in the currency’s minor unit. For example, the minor units for USD is cents, so if the amount is $5.50 USD, `value` is set to 550. */
      value: number;
      /**
       * The number of decimal places used by the currency. For example, USD uses two decimal places. Use this number to translate `value` from minor units to major units by using the formula:  
       *   
       * `value / 10^decimal_places`
       */
      decimal_places: number;
      /** The ISO-4217 three-letter currency code that identifies the type of currency in `value`. */
      currency: string;
    };
  }[];
  /** An object that contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ query parameter. */
    cursor: string;
  };
}

export interface GetChattersParams {
  /** The ID of the broadcaster whose list of chatters you want to get. */
  broadcaster_id: string;
  /** The ID of the broadcaster or one of the broadcaster’s moderators. This ID must match the user ID in the user access token. */
  moderator_id: string;
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 1,000\. The default is 100. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetChattersResponse {
  /** The list of users that are connected to the broadcaster’s chat room. The list is empty if no users are connected to the chat room. */
  data: {
    /** The ID of a user that’s connected to the broadcaster’s chat room. */
    user_id: string;
    /** The user’s login name. */
    user_login: string;
    /** The user’s display name. */
    user_name: string;
  }[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ query parameter. */
    cursor: string;
  };
  /** The total number of users that are connected to the broadcaster’s chat room. As you page through the list, the number of users may change as users join and leave the chat room. */
  total: number;
}

export interface GetChannelEmotesParams {
  /** An ID that identifies the broadcaster whose emotes you want to get. */
  broadcaster_id: string;
}

export interface GetChannelEmotesResponse {
  /** The list of emotes that the specified broadcaster created. If the broadcaster hasn’t created custom emotes, the list is empty. */
  data: {
    /** An ID that identifies this emote. */
    id: string;
    /** The name of the emote. This is the name that viewers type in the chat window to get the emote to appear. */
    name: string;
    /**
     * The image URLs for the emote. These image URLs always provide a static, non-animated emote image with a light background.  
     *   
     * **NOTE:** You should use the templated URL in the `template` field to fetch the image instead of using these URLs.
     */
    images: {
      /** A URL to the small version (28px x 28px) of the emote. */
      url_1x: string;
      /** A URL to the medium version (56px x 56px) of the emote. */
      url_2x: string;
      /** A URL to the large version (112px x 112px) of the emote. */
      url_4x: string;
    };
    /** The subscriber tier at which the emote is unlocked. This field contains the tier information only if `emote_type` is set to `subscriptions`, otherwise, it’s an empty string. */
    tier: string;
    /**
     * The type of emote. The possible values are:   
     *   
     * * bitstier — A custom Bits tier emote.
     * * follower — A custom follower emote.
     * * subscriptions — A custom subscriber emote.
     */
    emote_type: 'bitstier' | 'follower' | 'subscriptions';
    /** An ID that identifies the emote set that the emote belongs to. */
    emote_set_id: string;
    /**
     * The formats that the emote is available in. For example, if the emote is available only as a static PNG, the array contains only `static`. But if the emote is available as a static PNG and an animated GIF, the array contains `static` and `animated`. The possible formats are:   
     *   
     * * animated — An animated GIF is available for this emote.
     * * static — A static PNG file is available for this emote.
     */
    format: 'animated' | 'static'[];
    /**
     * The sizes that the emote is available in. For example, if the emote is available in small and medium sizes, the array contains 1.0 and 2.0\. Possible sizes are:   
     *   
     * * 1.0 — A small version (28px x 28px) is available.
     * * 2.0 — A medium version (56px x 56px) is available.
     * * 3.0 — A large version (112px x 112px) is available.
     */
    scale: '1.0' | '2.0' | '3.0'[];
    /**
     * The background themes that the emote is available in. Possible themes are:   
     *   
     * * dark
     * * light
     */
    theme_mode: 'dark' | 'light'[];
  }[];
  /** A templated URL. Use the values from the `id`, `format`, `scale`, and `theme_mode` fields to replace the like-named placeholder strings in the templated URL to create a CDN (content delivery network) URL that you use to fetch the emote. For information about what the template looks like and how to use it to fetch emotes, see [Emote CDN URL format](https://dev.twitch.tv/docs/irc/emotes#cdn-template). You should use this template instead of using the URLs in the `images` object. */
  template: string;
}

export interface GetGlobalEmotesResponse {
  /** The list of global emotes. */
  data: {
    /** An ID that identifies this emote. */
    id: string;
    /** The name of the emote. This is the name that viewers type in the chat window to get the emote to appear. */
    name: string;
    /**
     * The image URLs for the emote. These image URLs always provide a static, non-animated emote image with a light background.  
     *   
     * **NOTE:** You should use the templated URL in the `template` field to fetch the image instead of using these URLs.
     */
    images: {
      /** A URL to the small version (28px x 28px) of the emote. */
      url_1x: string;
      /** A URL to the medium version (56px x 56px) of the emote. */
      url_2x: string;
      /** A URL to the large version (112px x 112px) of the emote. */
      url_4x: string;
    };
    /**
     * The formats that the emote is available in. For example, if the emote is available only as a static PNG, the array contains only `static`. But if the emote is available as a static PNG and an animated GIF, the array contains `static` and `animated`. The possible formats are:   
     *   
     * * animated — An animated GIF is available for this emote.
     * * static — A static PNG file is available for this emote.
     */
    format: 'animated' | 'static'[];
    /**
     * The sizes that the emote is available in. For example, if the emote is available in small and medium sizes, the array contains 1.0 and 2.0\. Possible sizes are:   
     *   
     * * 1.0 — A small version (28px x 28px) is available.
     * * 2.0 — A medium version (56px x 56px) is available.
     * * 3.0 — A large version (112px x 112px) is available.
     */
    scale: '1.0' | '2.0' | '3.0'[];
    /**
     * The background themes that the emote is available in. Possible themes are:   
     *   
     * * dark
     * * light
     */
    theme_mode: 'dark' | 'light'[];
  }[];
  /** A templated URL. Use the values from the `id`, `format`, `scale`, and `theme_mode` fields to replace the like-named placeholder strings in the templated URL to create a CDN (content delivery network) URL that you use to fetch the emote. For information about what the template looks like and how to use it to fetch emotes, see [Emote CDN URL format](https://dev.twitch.tv/docs/irc/emotes#cdn-template). You should use this template instead of using the URLs in the `images` object. */
  template: string;
}

export interface GetEmoteSetsParams {
  /**
   * An ID that identifies the emote set to get. Include this parameter for each emote set you want to get. For example, `emote_set_id=1234&emote_set_id=5678`. You may specify a maximum of 25 IDs. The response contains only the IDs that were found and ignores duplicate IDs.  
   *   
   * To get emote set IDs, use the [Get Channel Emotes](https://dev.twitch.tv/docs/api/reference#get-channel-emotes) API.
   */
  emote_set_id: string | string[];
}

export interface GetEmoteSetsResponse {
  /** The list of emotes found in the specified emote sets. The list is empty if none of the IDs were found. The list is in the same order as the set IDs specified in the request. Each set contains one or more emoticons. */
  data: {
    /** An ID that uniquely identifies this emote. */
    id: string;
    /** The name of the emote. This is the name that viewers type in the chat window to get the emote to appear. */
    name: string;
    /**
     * The image URLs for the emote. These image URLs always provide a static, non-animated emote image with a light background.  
     *   
     * **NOTE:** You should use the templated URL in the `template` field to fetch the image instead of using these URLs.
     */
    images: {
      /** A URL to the small version (28px x 28px) of the emote. */
      url_1x: string;
      /** A URL to the medium version (56px x 56px) of the emote. */
      url_2x: string;
      /** A URL to the large version (112px x 112px) of the emote. */
      url_4x: string;
    };
    /**
     * The type of emote. The possible values are:   
     *   
     * * bitstier — A Bits tier emote.
     * * follower — A follower emote.
     * * subscriptions — A subscriber emote.
     */
    emote_type: 'bitstier' | 'follower' | 'subscriptions';
    /** An ID that identifies the emote set that the emote belongs to. */
    emote_set_id: string;
    /** The ID of the broadcaster who owns the emote. */
    owner_id: string;
    /**
     * The formats that the emote is available in. For example, if the emote is available only as a static PNG, the array contains only `static`. But if the emote is available as a static PNG and an animated GIF, the array contains `static` and `animated`. The possible formats are:   
     *   
     * * animated — An animated GIF is available for this emote.
     * * static — A static PNG file is available for this emote.
     */
    format: 'animated' | 'static'[];
    /**
     * The sizes that the emote is available in. For example, if the emote is available in small and medium sizes, the array contains 1.0 and 2.0\. Possible sizes are:   
     *   
     * * 1.0 — A small version (28px x 28px) is available.
     * * 2.0 — A medium version (56px x 56px) is available.
     * * 3.0 — A large version (112px x 112px) is available.
     */
    scale: '1.0' | '2.0' | '3.0'[];
    /**
     * The background themes that the emote is available in. Possible themes are:   
     *   
     * * dark
     * * light
     */
    theme_mode: 'dark' | 'light'[];
  }[];
  /** A templated URL. Use the values from the `id`, `format`, `scale`, and `theme_mode` fields to replace the like-named placeholder strings in the templated URL to create a CDN (content delivery network) URL that you use to fetch the emote. For information about what the template looks like and how to use it to fetch emotes, see [Emote CDN URL format](https://dev.twitch.tv/docs/irc/emotes#cdn-template). You should use this template instead of using the URLs in the `images` object. */
  template: string;
}

export interface GetChannelChatBadgesResponse {
  /** The list of chat badges. The list is sorted in ascending order by `set_id`, and within a set, the list is sorted in ascending order by `id`. */
  data: {
    /** An ID that identifies this set of chat badges. For example, Bits or Subscriber. */
    set_id: string;
    /** The list of chat badges in this set. */
    versions: {
      /** An ID that identifies this version of the badge. The ID can be any value. For example, for Bits, the ID is the Bits tier level, but for World of Warcraft, it could be Alliance or Horde. */
      id: string;
      /** A URL to the small version (18px x 18px) of the badge. */
      image_url_1x: string;
      /** A URL to the medium version (36px x 36px) of the badge. */
      image_url_2x: string;
      /** A URL to the large version (72px x 72px) of the badge. */
      image_url_4x: string;
    }[];
  }[];
}

export interface GetGlobalChatBadgesResponse {
  /** The list of chat badges. The list is sorted in ascending order by `set_id`, and within a set, the list is sorted in ascending order by `id`. */
  data: {
    /** An ID that identifies this set of chat badges. For example, Bits or Subscriber. */
    set_id: string;
    /** The list of chat badges in this set. */
    versions: {
      /** An ID that identifies this version of the badge. The ID can be any value. For example, for Bits, the ID is the Bits tier level, but for World of Warcraft, it could be Alliance or Horde. */
      id: string;
      /** A URL to the small version (18px x 18px) of the badge. */
      image_url_1x: string;
      /** A URL to the medium version (36px x 36px) of the badge. */
      image_url_2x: string;
      /** A URL to the large version (72px x 72px) of the badge. */
      image_url_4x: string;
    }[];
  }[];
}

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

/**
 * All fields are optional. Specify only those fields that you want to update.
 *
 * To set the `slow_mode_wait_time` or `follower_mode_duration` field to its default value, set the corresponding `slow_mode` or `follower_mode` field to **true** (and don’t include the `slow_mode_wait_time` or `follower_mode_duration` field).
 *
 * To set the `slow_mode_wait_time`, `follower_mode_duration`, or `non_moderator_chat_delay_duration` field’s value, you must set the corresponding `slow_mode`, `follower_mode`, or `non_moderator_chat_delay` field to **true**.
 *
 * To remove the `slow_mode_wait_time`, `follower_mode_duration`, or `non_moderator_chat_delay_duration` field’s value, set the corresponding `slow_mode`, `follower_mode`, or `non_moderator_chat_delay` field to **false** (and don’t include the `slow_mode_wait_time`, `follower_mode_duration`, or `non_moderator_chat_delay_duration` field).
 */
export interface UpdateChatSettingsBody {
  /**
   * A Boolean value that determines whether chat messages must contain only emotes.  
   *   
   * Set to **true** if only emotes are allowed; otherwise, **false**. The default is **false**.
   */
  emote_mode?: boolean;
  /**
   * A Boolean value that determines whether the broadcaster restricts the chat room to followers only.  
   *   
   * Set to **true** if the broadcaster restricts the chat room to followers only; otherwise, **false**. The default is **true**.  
   *   
   * To specify how long users must follow the broadcaster before being able to participate in the chat room, see the `follower_mode_duration` field.
   */
  follower_mode?: boolean;
  /** The length of time, in minutes, that users must follow the broadcaster before being able to participate in the chat room. Set only if `follower_mode` is **true**. Possible values are: 0 (no restriction) through 129600 (3 months). The default is 0. */
  follower_mode_duration?: number;
  /**
   * A Boolean value that determines whether the broadcaster adds a short delay before chat messages appear in the chat room. This gives chat moderators and bots a chance to remove them before viewers can see the message.  
   *   
   * Set to **true** if the broadcaster applies a delay; otherwise, **false**. The default is **false**.  
   *   
   * To specify the length of the delay, see the `non_moderator_chat_delay_duration` field.
   */
  non_moderator_chat_delay?: boolean;
  /**
   * The amount of time, in seconds, that messages are delayed before appearing in chat. Set only if `non_moderator_chat_delay` is **true**. Possible values are:  
   *   
   * * 2 — 2 second delay (recommended)
   * * 4 — 4 second delay
   * * 6 — 6 second delay
   */
  non_moderator_chat_delay_duration?: 2 | 4 | 6;
  /**
   * A Boolean value that determines whether the broadcaster limits how often users in the chat room are allowed to send messages. Set to **true** if the broadcaster applies a wait period between messages; otherwise, **false**. The default is **false**.  
   *   
   * To specify the delay, see the `slow_mode_wait_time` field.
   */
  slow_mode?: boolean;
  /**
   * The amount of time, in seconds, that users must wait between sending messages. Set only if `slow_mode` is **true**.  
   *   
   * Possible values are: 3 (3 second delay) through 120 (2 minute delay). The default is 30 seconds.
   */
  slow_mode_wait_time?: number;
  /**
   * A Boolean value that determines whether only users that subscribe to the broadcaster’s channel may talk in the chat room.  
   *   
   * Set to **true** if the broadcaster restricts the chat room to subscribers only; otherwise, **false**. The default is **false**.
   */
  subscriber_mode?: boolean;
  /**
   * A Boolean value that determines whether the broadcaster requires users to post only unique messages in the chat room.  
   *   
   * Set to **true** if the broadcaster allows only unique messages; otherwise, **false**. The default is **false**.
   */
  unique_chat_mode?: boolean;
}

export interface UpdateChatSettingsParams {
  /** The ID of the broadcaster whose chat settings you want to update. */
  broadcaster_id: string;
  /** The ID of a user that has permission to moderate the broadcaster’s chat room, or the broadcaster’s ID if they’re making the update. This ID must match the user ID in the user access token. */
  moderator_id: string;
}

export interface UpdateChatSettingsResponse {
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
    /** A Boolean value that determines whether the broadcaster adds a short delay before chat messages appear in the chat room. This gives chat moderators and bots a chance to remove them before viewers can see the message. See the `non_moderator_chat_delay_duration` field for the length of the delay. Is **true** if the broadcaster applies a delay; otherwise, **false**. */
    non_moderator_chat_delay: boolean;
    /** The amount of time, in seconds, that messages are delayed before appearing in chat. Is **null** if `non_moderator_chat_delay` is **false**. */
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

export interface SendChatAnnouncementBody {
  /** The announcement to make in the broadcaster’s chat room. Announcements are limited to a maximum of 500 characters; announcements longer than 500 characters are truncated. */
  message: string;
  /**
   * The color used to highlight the announcement. Possible case-sensitive values are:  
   *   
   * * blue
   * * green
   * * orange
   * * purple
   * * primary (default)
   *   
   * If `color` is set to _primary_ or is not set, the channel’s accent color is used to highlight the announcement (see **Profile Accent Color** under [profile settings](https://www.twitch.tv/settings/profile), **Channel and Videos**, and **Brand**).
   */
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'primary (default)';
}

export interface SendChatAnnouncementParams {
  /** The ID of the broadcaster that owns the chat room to send the announcement to. */
  broadcaster_id: string;
  /** The ID of a user who has permission to moderate the broadcaster’s chat room, or the broadcaster’s ID if they’re sending the announcement. This ID must match the user ID in the user access token. */
  moderator_id: string;
}

export interface GetUserChatColorParams {
  /**
   * The ID of the user whose username color you want to get. To specify more than one user, include the _user\_id_ parameter for each user to get. For example, `&user_id=1234&user_id=5678`. The maximum number of IDs that you may specify is 100.  
   *   
   * The API ignores duplicate IDs and IDs that weren’t found.
   */
  user_id: string | string[];
}

export interface GetUserChatColorResponse {
  /** The list of users and the color code they use for their name. */
  data: {
    /** An ID that uniquely identifies the user. */
    user_id: string;
    /** The user’s login name. */
    user_login: string;
    /** The user’s display name. */
    user_name: string;
    /** The Hex color code that the user uses in chat for their name. If the user hasn’t specified a color in their settings, the string is empty. */
    color: string;
  }[];
}

export interface UpdateUserChatColorParams {
  /** The ID of the user whose chat color you want to update. This ID must match the user ID in the access token. */
  user_id: string;
  /**
   * The color to use for the user’s name in chat. All users may specify one of the following named color values.  
   *   
   * * blue
   * * blue\_violet
   * * cadet\_blue
   * * chocolate
   * * coral
   * * dodger\_blue
   * * firebrick
   * * golden\_rod
   * * green
   * * hot\_pink
   * * orange\_red
   * * red
   * * sea\_green
   * * spring\_green
   * * yellow\_green
   *   
   * Turbo and Prime users may specify a named color or a Hex color code like #9146FF. If you use a Hex color code, remember to URL encode it.
   */
  color: string;
}

export interface CreateClipParams {
  /** The ID of the broadcaster whose stream you want to create a clip from. */
  broadcaster_id: string;
  /** A Boolean value that determines whether the API captures the clip at the moment the viewer requests it or after a delay. If **false** (default), Twitch captures the clip at the moment the viewer requests it (this is the same clip experience as the Twitch UX). If **true**, Twitch adds a delay before capturing the clip (this basically shifts the capture window to the right slightly). */
  has_delay?: boolean;
}

export interface CreateClipResponse {
  /**
   * A URL that you can use to edit the clip’s title, identify the part of the clip to publish, and publish the clip. [Learn More](https://help.twitch.tv/s/article/how-to-use-clips)  
   *   
   * The URL is valid for up to 24 hours or until the clip is published, whichever comes first.
   */
  edit_url: string;
  /** An ID that uniquely identifies the clip. */
  id: string;
}

/**
 * The _id_, _game\_id_, and _broadcaster\_id_ query parameters are mutually exclusive.
 */
export interface GetClipsParams {
  /** An ID that identifies the broadcaster whose video clips you want to get. Use this parameter to get clips that were captured from the broadcaster’s streams. */
  broadcaster_id?: string;
  /** An ID that identifies the game whose clips you want to get. Use this parameter to get clips that were captured from streams that were playing this game. */
  game_id?: string;
  /** An ID that identifies the clip to get. To specify more than one ID, include this parameter for each clip you want to get. For example, `id=foo&id=bar`. You may specify a maximum of 100 IDs. The API ignores duplicate IDs and IDs that aren’t found. */
  id?: string | string[];
  /** The start date used to filter clips. The API returns only clips within the start and end date window. Specify the date and time in RFC3339 format. */
  started_at?: string;
  /** The end date used to filter clips. If not specified, the time window is the start date plus one week. Specify the date and time in RFC3339 format. */
  ended_at?: string;
  /** The maximum number of clips to return per page in the response. The minimum page size is 1 clip per page and the maximum is 100\. The default is 20. */
  first?: number;
  /** The cursor used to get the previous page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  before?: string;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetClipsResponse {
  /** The list of video clips. For clips returned by _game\_id_ or _broadcaster\_id_, the list is in descending order by view count. For lists returned by _id_, the list is in the same order as the input IDs. */
  data: {
    /** An ID that uniquely identifies the clip. */
    id: string;
    /** A URL to the clip. */
    url: string;
    /** A URL that you can use in an iframe to embed the clip (see [Embedding Video and Clips](https://dev.twitch.tv/docs/embed/video-and-clips)). */
    embed_url: string;
    /** An ID that identifies the broadcaster that the video was clipped from. */
    broadcaster_id: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** An ID that identifies the user that created the clip. */
    creator_id: string;
    /** The user’s display name. */
    creator_name: string;
    /** An ID that identifies the video that the clip came from. This field contains an empty string if the video is not available. */
    video_id: string;
    /** The ID of the game that was being played when the clip was created. */
    game_id: string;
    /** The ISO 639-1 two-letter language code that the broadcaster broadcasts in. For example, _en_ for English. The value is _other_ if the broadcaster uses a language that Twitch doesn’t support. */
    language: string;
    /** The title of the clip. */
    title: string;
    /** The number of times the clip has been viewed. */
    view_count: number;
    /** The date and time of when the clip was created. The date and time is in RFC3339 format. */
    created_at: string;
    /** A URL to a thumbnail image of the clip. */
    thumbnail_url: string;
    /** The length of the clip, in seconds. Precision is 0.1. */
    duration: number;
    /**
     * The zero-based offset, in seconds, to where the clip starts in the video (VOD). Is **null** if the video is not available or hasn’t been created yet from the live stream (see `video_id`).  
     *   
     * Note that there’s a delay between when a clip is created during a broadcast and when the offset is set. During the delay period, `vod_offset` is **null**. The delay is indeterminant but is typically minutes long.
     */
    vod_offset: number;
  }[];
  /** The information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Set the request’s _after_ or _before_ query parameter to this value depending on whether you’re paging forwards or backwards. */
    cursor: string;
  };
}

export interface GetCodeStatusParams {
  /** The redemption code to check. Include this parameter for each redemption code whose status you want to check. For example, `code=1234&code=5678`. You may specify a maximum of 20 codes. */
  code: string | string[];
  /** The ID of the user that owns the redemption code. */
  user_id: number;
}

export interface GetCodeStatusResponse {
  /** The list of redemption codes and their status values. */
  data: {
    /** The redemption code. */
    code: string;
    /**
     * The redemption code’s status. Possible values are:   
     *   
     * * ALREADY\_CLAIMED — The code has already been claimed. All codes are single-use.
     * * EXPIRED — The code has expired and can no longer be claimed.
     * * INACTIVE — The code has not been activated.
     * * INCORRECT\_FORMAT — The code is not properly formatted.
     * * INTERNAL\_ERROR — An internal or unknown error occurred when checking the code. Retry later.
     * * NOT\_FOUND — The code was not found.
     * * UNUSED — The code has not been claimed.
     * * USER\_NOT\_ELIGIBLE — The user is not eligible to redeem this code.
     */
    status: 'ALREADY_CLAIMED' | 'EXPIRED' | 'INACTIVE' | 'INCORRECT_FORMAT' | 'INTERNAL_ERROR' | 'NOT_FOUND' | 'UNUSED' | 'USER_NOT_ELIGIBLE';
  }[];
}

export interface GetDropsEntitlementsParams {
  /** An ID that identifies the entitlement to get. Include this parameter for each entitlement you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 100 IDs. */
  id?: string | string[];
  /** An ID that identifies a user that was granted entitlements. */
  user_id?: string;
  /** An ID that identifies a game that offered entitlements. */
  game_id?: string;
  /**
   * The entitlement’s fulfillment status. Used to filter the list to only those with the specified status. Possible values are:   
   *   
   * * CLAIMED
   * * FULFILLED
   */
  fulfillment_status?: 'CLAIMED' | 'FULFILLED';
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
  /** The maximum number of entitlements to return per page in the response. The minimum page size is 1 entitlement per page and the maximum is 1000\. The default is 20. */
  first?: number;
}

export interface GetDropsEntitlementsResponse {
  /** The list of entitlements. */
  data: {
    /** An ID that identifies the entitlement. */
    id: string;
    /** An ID that identifies the benefit (reward). */
    benefit_id: string;
    /** The UTC date and time (in RFC3339 format) of when the entitlement was granted. */
    timestamp: string;
    /** An ID that identifies the user who was granted the entitlement. */
    user_id: string;
    /** An ID that identifies the game the user was playing when the reward was entitled. */
    game_id: string;
    /**
     * The entitlement’s fulfillment status. Possible values are:   
     *   
     * * CLAIMED
     * * FULFILLED
     */
    fulfillment_status: 'CLAIMED' | 'FULFILLED';
    /** The UTC date and time (in RFC3339 format) of when the entitlement was last updated. */
    last_updated: string;
  }[];
  /** The information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Set the request’s _after_ query parameter to this value to page forward through the results. */
    cursor: string;
  };
}

export interface UpdateDropsEntitlementsResponse {
  /** A list that indicates which entitlements were successfully updated and those that weren’t. */
  data: {
    /**
     * A string that indicates whether the status of the entitlements in the `ids` field were successfully updated. Possible values are:  
     *   
     * * INVALID\_ID — The entitlement IDs in the `ids` field are not valid.
     * * NOT\_FOUND — The entitlement IDs in the `ids` field were not found.
     * * SUCCESS — The status of the entitlements in the `ids` field were successfully updated.
     * * UNAUTHORIZED — The user or organization identified by the user access token is not authorized to update the entitlements.
     * * UPDATE\_FAILED — The update failed. These are considered transient errors and the request should be retried later.
     */
    status: 'INVALID_ID' | 'NOT_FOUND' | 'SUCCESS' | 'UNAUTHORIZED' | 'UPDATE_FAILED';
    /** The list of entitlements that the status in the `status` field applies to. */
    ids: string[];
  }[];
}

export interface RedeemCodeParams {
  /** The redemption code to redeem. To redeem multiple codes, include this parameter for each redemption code. For example, `code=1234&code=5678`. You may specify a maximum of 20 codes. */
  code: string | string[];
  /** An ID of the user that owns the redemption code to redeem. */
  user_id: string;
}

export interface RedeemCodeResponse {
  /** The list of redeemed codes. */
  data: {
    /** The redemption code. */
    code: string;
    /**
     * The redemption code’s status. Possible values are:  
     *   
     * * ALREADY\_CLAIMED — The code has already been claimed. All codes are single-use.
     * * EXPIRED — The code has expired and can no longer be claimed.
     * * INACTIVE — The code has not been activated.
     * * INCORRECT\_FORMAT — The code is not properly formatted.
     * * INTERNAL\_ERROR — An internal or unknown error occurred when accessing the code. Retry later.
     * * NOT\_FOUND — The code was not found.
     * * SUCCESSFULLY\_REDEEMED — Successfully redeemed the code and credited the user's account with the entitlement.
     * * UNUSED — The code has not been claimed.
     * * USER\_NOT\_ELIGIBLE — The user is not eligible to redeem this code.
     */
    status: 'ALREADY_CLAIMED' | 'EXPIRED' | 'INACTIVE' | 'INCORRECT_FORMAT' | 'INTERNAL_ERROR' | 'NOT_FOUND' | 'SUCCESSFULLY_REDEEMED' | 'UNUSED' | 'USER_NOT_ELIGIBLE';
  }[];
}

export interface GetExtensionConfigurationSegmentParams {
  /** The ID of the broadcaster that installed the extension. This parameter is required if you set the _segment_ parameter to broadcaster or developer. Do not specify this parameter if you set _segment_ to global. */
  broadcaster_id?: string;
  /** The ID of the extension that contains the configuration segment you want to get. */
  extension_id: string;
  /**
   * The type of configuration segment to get. Possible case-sensitive values are:   
   *   
   * * broadcaster
   * * developer
   * * global
   *   
   * You may specify one or more segments. To specify multiple segments, include the `segment` parameter for each segment to get. For example, `segment=broadcaster&segment=developer`. Ignores duplicate segments.
   */
  segment: 'broadcaster' | 'developer' | 'global';
}

export interface GetExtensionConfigurationSegmentResponse {
  /** The list of requested configuration segments. The list is returned in the same order that you specified the list of segments in the request. */
  data: {
    /**
     * The type of segment. Possible values are:   
     *   
     * * broadcaster
     * * developer
     * * global
     */
    segment: 'broadcaster' | 'developer' | 'global';
    /** The ID of the broadcaster that installed the extension. The object includes this field only if the `segment` query parameter is set to developer or broadcaster. */
    broadcaster_id: string;
    /** The contents of the segment. This string may be a plain-text string or a string-encoded JSON object. */
    content: string;
    /** The version number that identifies this definition of the segment’s data. */
    version: string;
  }[];
}

export interface SetExtensionConfigurationSegmentBody {
  /** The ID of the extension to update. */
  extension_id: string;
  /**
   * The configuration segment to update. Possible case-sensitive values are:  
   *   
   * * broadcaster
   * * developer
   * * global
   */
  segment: 'broadcaster' | 'developer' | 'global';
  /** The ID of the broadcaster that installed the extension. Include this field only if the `segment` is set to developer or broadcaster. */
  broadcaster_id?: string;
  /** The contents of the segment. This string may be a plain-text string or a string-encoded JSON object. */
  content?: string;
  /** The version number that identifies this definition of the segment’s data. If not specified, the latest definition is updated. */
  version?: string;
}

export interface SetExtensionRequiredConfigurationBody {
  /** The ID of the extension to update. */
  extension_id: string;
  /** The version of the extension to update. */
  extension_version: string;
  /** The required\_configuration string to use with the extension. */
  required_configuration: string;
}

export interface SetExtensionRequiredConfigurationParams {
  /** The ID of the broadcaster that installed the extension on their channel. */
  broadcaster_id: string;
}

export interface SendExtensionPubSubMessageBody {
  /**
   * The target of the message. Possible values are:  
   *   
   * * broadcast
   * * global
   * * whisper-<user-id>
   *   
   * If `is_global_broadcast` is **true**, you must set this field to global. The broadcast and global values are mutually exclusive; specify only one of them.
   */
  target: 'broadcast' | 'global' | `whisper-${string}`[];
  /** The ID of the broadcaster to send the message to. Don’t include this field if `is_global_broadcast` is set to **true**. */
  broadcaster_id: string;
  /** A Boolean value that determines whether the message should be sent to all channels where your extension is active. Set to **true** if the message should be sent to all channels. The default is **false**. */
  is_global_broadcast?: boolean;
  /** The message to send. The message can be a plain-text string or a string-encoded JSON object. The message is limited to a maximum of 5 KB. */
  message: string;
}

export interface GetExtensionLiveChannelsParams {
  /** The ID of the extension to get. Returns the list of broadcasters that are live and that have installed or activated this extension. */
  extension_id: string;
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20. */
  first?: number;
  /** The cursor used to get the next page of results. The `pagination` field in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetExtensionLiveChannelsResponse {
  /** The list of broadcasters that are streaming live and that have installed or activated the extension. */
  data: {
    /** The ID of the broadcaster that is streaming live and has installed or activated the extension. */
    broadcaster_id: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The name of the category or game being streamed. */
    game_name: string;
    /** The ID of the category or game being streamed. */
    game_id: string;
    /** The title of the broadcaster’s stream. May be an empty string if not specified. */
    title: string;
  }[];
  /** This field contains the cursor used to page through the results. The field is empty if there are no more pages left to page through. Note that this field is a string compared to other endpoints that use a **Pagination** object. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: string;
}

export interface GetExtensionSecretsResponse {
  /** The list of shared secrets that the extension created. */
  data: {
    /** The version number that identifies this definition of the secret’s data. */
    format_version: number;
    /** The list of secrets. */
    secrets: {
      /** The raw secret that you use with JWT encoding. */
      content: string;
      /** The UTC date and time (in RFC3339 format) that you may begin using this secret to sign a JWT. */
      active_at: string;
      /** The UTC date and time (in RFC3339 format) that you must stop using this secret to decode a JWT. */
      expires_at: string;
    }[];
  }[];
}

export interface CreateExtensionSecretParams {
  /** The ID of the extension to apply the shared secret to. */
  extension_id: string;
  /** The amount of time, in seconds, to delay activating the secret. The delay should provide enough time for instances of the extension to gracefully switch over to the new secret. The minimum delay is 300 seconds (5 minutes). The default is 300 seconds. */
  delay?: number;
}

export interface CreateExtensionSecretResponse {
  /** A list that contains the newly added secrets. */
  data: {
    /** The version number that identifies this definition of the secret’s data. */
    format_version: number;
    /** The list of secrets. */
    secrets: {
      /** The raw secret that you use with JWT encoding. */
      content: string;
      /** The UTC date and time (in RFC3339 format) that you may begin using this secret to sign a JWT. */
      active_at: string;
      /** The UTC date and time (in RFC3339 format) that you must stop using this secret to decode a JWT. */
      expires_at: string;
    }[];
  }[];
}

export interface SendExtensionChatMessageBody {
  /** The message. The message may contain a maximum of 280 characters. */
  text: string;
  /** The ID of the extension that’s sending the chat message. */
  extension_id: string;
  /** The extension’s version number. */
  extension_version: string;
}

export interface SendExtensionChatMessageParams {
  /** The ID of the broadcaster that has activated the extension. */
  broadcaster_id: string;
}

export interface GetExtensionsParams {
  /** The ID of the extension to get. */
  extension_id: string;
  /** The version of the extension to get. If not specified, it returns the latest, released version. If you don’t have a released version, you must specify a version; otherwise, the list is empty. */
  extension_version?: string;
}

export interface GetExtensionsResponse {
  /** A list that contains the specified extension. */
  data: {
    /** The name of the user or organization that owns the extension. */
    author_name: string;
    /** A Boolean value that determines whether the extension has features that use Bits. Is **true** if the extension has features that use Bits. */
    bits_enabled: boolean;
    /**
     * A Boolean value that determines whether a user can install the extension on their channel. Is **true** if a user can install the extension.  
     *   
     * Typically, this is set to **false** if the extension is currently in testing mode and requires users to be allowlisted (the allowlist is configured on Twitch’s [developer site](https://dev.twitch.tv/console/extensions) under the **Extensions** \-> **Extension** \-> **Version** \-> **Access**).
     */
    can_install: boolean;
    /**
     * The location of where the extension’s configuration is stored. Possible values are:  
     *   
     * * hosted — The Extensions Configuration Service hosts the configuration.
     * * custom — The Extension Backend Service (EBS) hosts the configuration.
     * * none — The extension doesn't require configuration.
     */
    configuration_location: 'hosted' | 'custom' | 'none';
    /** A longer description of the extension. It appears on the details page. */
    description: string;
    /** A URL to the extension’s Terms of Service. */
    eula_tos_url: string;
    /** A Boolean value that determines whether the extension can communicate with the installed channel’s chat. Is **true** if the extension can communicate with the channel’s chat room. */
    has_chat_support: boolean;
    /** A URL to the default icon that’s displayed in the Extensions directory. */
    icon_url: string;
    /** A dictionary that contains URLs to different sizes of the default icon. The dictionary’s key identifies the icon’s size (for example, 24x24), and the dictionary’s value contains the URL to the icon. */
    icon_urls: Record<string, string>;
    /** The extension’s ID. */
    id: string;
    /** The extension’s name. */
    name: string;
    /** A URL to the extension’s privacy policy. */
    privacy_policy_url: string;
    /** A Boolean value that determines whether the extension wants to explicitly ask viewers to link their Twitch identity. */
    request_identity_link: boolean;
    /** A list of URLs to screenshots that are shown in the Extensions marketplace. */
    screenshot_urls: string[];
    /**
     * The extension’s state. Possible values are:  
     *   
     * * Approved
     * * AssetsUploaded
     * * Deleted
     * * Deprecated
     * * InReview
     * * InTest
     * * PendingAction
     * * Rejected
     * * Released
     */
    state: 'Approved' | 'AssetsUploaded' | 'Deleted' | 'Deprecated' | 'InReview' | 'InTest' | 'PendingAction' | 'Rejected' | 'Released';
    /**
     * Indicates whether the extension can view the user’s subscription level on the channel that the extension is installed on. Possible values are:  
     *   
     * * none — The extension can't view the user’s subscription level.
     * * optional — The extension can view the user’s subscription level.
     */
    subscriptions_support_level: 'none' | 'optional';
    /** A short description of the extension that streamers see when hovering over the discovery splash screen in the Extensions manager. */
    summary: string;
    /** The email address that users use to get support for the extension. */
    support_email: string;
    /** The extension’s version number. */
    version: string;
    /** A brief description displayed on the channel to explain how the extension works. */
    viewer_summary: string;
    /** Describes all views-related information such as how the extension is displayed on mobile devices. */
    views: {
      /** Describes how the extension is displayed on mobile devices. */
      mobile: Object;
      /** Describes how the extension is rendered if the extension may be activated as a panel extension. */
      panel: Object;
      /** Describes how the extension is rendered if the extension may be activated as a video-overlay extension. */
      video_overlay: Object;
      /** Describes how the extension is rendered if the extension may be activated as a video-component extension. */
      component: Object;
      /** Describes the view that is shown to broadcasters while they are configuring your extension within the Extension Manager. */
      config: Object;
    };
    /** Allowlisted configuration URLs for displaying the extension (the allowlist is configured on Twitch’s [developer site](https://dev.twitch.tv/console/extensions) under the **Extensions** \-> **Extension** \-> **Version** \-> **Capabilities**). */
    allowlisted_config_urls: string[];
    /** Allowlisted panel URLs for displaying the extension (the allowlist is configured on Twitch’s [developer site](https://dev.twitch.tv/console/extensions) under the **Extensions** \-> **Extension** \-> **Version** \-> **Capabilities**). */
    allowlisted_panel_urls: string[];
  }[];
}

export interface GetReleasedExtensionsParams {
  /** The ID of the extension to get. */
  extension_id: string;
  /** The version of the extension to get. If not specified, it returns the latest version. */
  extension_version?: string;
}

export interface GetReleasedExtensionsResponse {
  /** A list that contains the specified extension. */
  data: {
    /** The name of the user or organization that owns the extension. */
    author_name: string;
    /** A Boolean value that determines whether the extension has features that use Bits. Is **true** if the extension has features that use Bits. */
    bits_enabled: boolean;
    /**
     * A Boolean value that determines whether a user can install the extension on their channel. Is **true** if a user can install the extension.  
     *   
     * Typically, this is set to **false** if the extension is currently in testing mode and requires users to be allowlisted (the allowlist is configured on Twitch’s [developer site](https://dev.twitch.tv/console/extensions) under the **Extensions** \-> **Extension** \-> **Version** \-> **Access**).
     */
    can_install: boolean;
    /**
     * The location of where the extension’s configuration is stored. Possible values are:  
     *   
     * * hosted — The Extensions Configuration Service hosts the configuration.
     * * custom — The Extension Backend Service (EBS) hosts the configuration.
     * * none — The extension doesn't require configuration.
     */
    configuration_location: 'hosted' | 'custom' | 'none';
    /** A longer description of the extension. It appears on the details page. */
    description: string;
    /** A URL to the extension’s Terms of Service. */
    eula_tos_url: string;
    /** A Boolean value that determines whether the extension can communicate with the installed channel’s chat. Is **true** if the extension can communicate with the channel’s chat room. */
    has_chat_support: boolean;
    /** A URL to the default icon that’s displayed in the Extensions directory. */
    icon_url: string;
    /** A dictionary that contains URLs to different sizes of the default icon. The dictionary’s key identifies the icon’s size (for example, 24x24), and the dictionary’s value contains the URL to the icon. */
    icon_urls: Record<string, string>;
    /** The extension’s ID. */
    id: string;
    /** The extension’s name. */
    name: string;
    /** A URL to the extension’s privacy policy. */
    privacy_policy_url: string;
    /** A Boolean value that determines whether the extension wants to explicitly ask viewers to link their Twitch identity. */
    request_identity_link: boolean;
    /** A list of URLs to screenshots that are shown in the Extensions marketplace. */
    screenshot_urls: string[];
    /**
     * The extension’s state. Possible values are:  
     *   
     * * Approved
     * * AssetsUploaded
     * * Deleted
     * * Deprecated
     * * InReview
     * * InTest
     * * PendingAction
     * * Rejected
     * * Released
     */
    state: 'Approved' | 'AssetsUploaded' | 'Deleted' | 'Deprecated' | 'InReview' | 'InTest' | 'PendingAction' | 'Rejected' | 'Released';
    /**
     * Indicates whether the extension can view the user’s subscription level on the channel that the extension is installed on. Possible values are:  
     *   
     * * none — The extension can't view the user’s subscription level.
     * * optional — The extension can view the user’s subscription level.
     */
    subscriptions_support_level: 'none' | 'optional';
    /** A short description of the extension that streamers see when hovering over the discovery splash screen in the Extensions manager. */
    summary: string;
    /** The email address that users use to get support for the extension. */
    support_email: string;
    /** The extension’s version number. */
    version: string;
    /** A brief description displayed on the channel to explain how the extension works. */
    viewer_summary: string;
    /** Describes all views-related information such as how the extension is displayed on mobile devices. */
    views: {
      /** Describes how the extension is displayed on mobile devices. */
      mobile: Object;
      /** Describes how the extension is rendered if the extension may be activated as a panel extension. */
      panel: Object;
      /** Describes how the extension is rendered if the extension may be activated as a video-overlay extension. */
      video_overlay: Object;
      /** Describes how the extension is rendered if the extension may be activated as a video-component extension. */
      component: Object;
      /** Describes the view that is shown to broadcasters while they are configuring your extension within the Extension Manager. */
      config: Object;
    };
    /** Allowlisted configuration URLs for displaying the extension (the allowlist is configured on Twitch’s [developer site](https://dev.twitch.tv/console/extensions) under the **Extensions** \-> **Extension** \-> **Version** \-> **Capabilities**). */
    allowlisted_config_urls: string[];
    /** Allowlisted panel URLs for displaying the extension (the allowlist is configured on Twitch’s [developer site](https://dev.twitch.tv/console/extensions) under the **Extensions** \-> **Extension** \-> **Version** \-> **Capabilities**). */
    allowlisted_panel_urls: string[];
  }[];
}

export interface GetExtensionBitsProductsParams {
  /** A Boolean value that determines whether to include disabled or expired Bits products in the response. The default is **false**. */
  should_include_all?: boolean;
}

export interface GetExtensionBitsProductsResponse {
  /** A list of Bits products that the extension created. The list is in ascending SKU order. The list is empty if the extension hasn’t created any products or they’re all expired or disabled. */
  data: {
    /** The product’s SKU. The SKU is unique across an extension’s products. */
    sku: string;
    /** An object that contains the product’s cost information. */
    cost: {
      /** The product’s price. */
      amount: number;
      /**
       * The type of currency. Possible values are:  
       *   
       * * bits
       */
      type: 'bits';
    };
    /** A Boolean value that indicates whether the product is in development. If **true**, the product is not available for public use. */
    in_development: boolean;
    /** The product’s name as displayed in the extension. */
    display_name: string;
    /** The date and time, in RFC3339 format, when the product expires. */
    expiration: string;
    /** A Boolean value that determines whether Bits product purchase events are broadcast to all instances of an extension on a channel. The events are broadcast via the `onTransactionComplete` helper callback. Is **true** if the event is broadcast to all instances. */
    is_broadcast: boolean;
  }[];
}

export interface UpdateExtensionBitsProductResponse {
  /** A list of Bits products that the extension created. The list is in ascending SKU order. The list is empty if the extension hasn’t created any products or they’re all expired or disabled. */
  data: {
    /** The product’s SKU. The SKU is unique across an extension’s products. */
    sku: string;
    /** An object that contains the product’s cost information. */
    cost: {
      /** The product’s price. */
      amount: number;
      /**
       * The type of currency. Possible values are:  
       *   
       * * bits
       */
      type: 'bits';
    };
    /** A Boolean value that indicates whether the product is in development. If **true**, the product is not available for public use. */
    in_development: boolean;
    /** The product’s name as displayed in the extension. */
    display_name: string;
    /** The date and time, in RFC3339 format, when the product expires. */
    expiration: string;
    /** A Boolean value that determines whether Bits product purchase events are broadcast to all instances of an extension on a channel. The events are broadcast via the `onTransactionComplete` helper callback. Is **true** if the event is broadcast to all instances. */
    is_broadcast: boolean;
  }[];
}

export interface CreateEventSubSubscriptionBody {
  /** The type of subscription to create. For a list of subscriptions that you can create, see [Subscription Types](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#subscription-types). Set this field to the value in the **Name** column of the Subscription Types table. */
  type: string;
  /** The version number that identifies the definition of the subscription type that you want the response to use. */
  version: string;
  /** A JSON object that contains the parameter values that are specific to the specified subscription type. For the object’s required and optional fields, see the subscription type’s documentation. */
  condition: Object;
  /** The transport details that you want Twitch to use when sending you notifications. */
  transport: {
    /**
     * The transport method. Possible values are:  
     *   
     * * webhook
     * * websocket
     */
    method: 'webhook' | 'websocket';
    /**
     * The callback URL where the notifications are sent. The URL must use the HTTPS protocol and port 443\. See [Processing an event](https://dev.twitch.tv/docs/eventsub/handling-webhook-events#processing-an-event).  
     *   
     * Specify this field only if `method` is set to **webhook**.  
     *   
     * **NOTE**: Redirects are not followed.
     */
    callback?: string;
    /**
     * The secret used to verify the signature. The secret must be an ASCII string that’s a minimum of 10 characters long and a maximum of 100 characters long. For information about how the secret is used, see [Verifying the event message](https://dev.twitch.tv/docs/eventsub/handling-webhook-events#verifying-the-event-message).  
     *   
     * Specify this field only if `method` is set to **webhook**.
     */
    secret?: string;
    /**
     * An ID that identifies the WebSocket to send notifications to. When you connect to EventSub using WebSockets, the server returns the ID in the [Welcome message](https://dev.twitch.tv/docs/eventsub/handling-websocket-events#welcome-message).  
     *   
     * Specify this field only if `method` is set to **websocket**.
     */
    session_id?: string;
  };
}

export interface CreateEventSubSubscriptionResponse {
  /** A list that contains the single subscription that you created. */
  data: {
    /** An ID that identifies the subscription. */
    id: string;
    /**
     * The subscription’s status. Possible values are:   
     *   
     * * enabled — The subscription is enabled.
     * * webhook\_callback\_verification\_pending — The subscription is pending verification of the specified callback URL.
     * * webhook\_callback\_verification\_failed — The specified callback URL failed verification.
     * * notification\_failures\_exceeded — The notification delivery failure rate was too high.
     * * authorization\_revoked — The authorization was revoked for one or more users specified in the **Condition** object.
     * * user\_removed — One of the users specified in the **Condition** object was removed.
     * * version\_removed — The subscribed to subscription type and version is no longer supported.
     */
    status: 'enabled' | 'webhook_callback_verification_pending' | 'webhook_callback_verification_failed' | 'notification_failures_exceeded' | 'authorization_revoked' | 'user_removed' | 'version_removed';
    /** The subscription’s type. See [Subscription Types](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#subscription-types). */
    type: string;
    /** The version number that identifies this definition of the subscription’s data. */
    version: string;
    /** The subscription’s parameter values. This is a string-encoded JSON object whose contents are determined by the subscription type. */
    condition: Object;
    /** The date and time (in RFC3339 format) of when the subscription was created. */
    created_at: string;
    /** The transport details used to send the notifications. */
    transport: {
      /**
       * The transport method. Possible values are:   
       *   
       * * webhook
       * * websocket
       */
      method: 'webhook' | 'websocket';
      /** The callback URL where the notifications are sent. Included only if `method` is set to **webhook**. */
      callback: string;
      /** An ID that identifies the WebSocket that notifications are sent to. Included only if `method` is set to **websocket**. */
      session_id: string;
      /** The UTC date and time that the WebSocket connection was established. Included only if `method` is set to **websocket**. */
      connected_at: string;
    };
    /** The amount that the subscription counts against your limit. [Learn More](https://dev.twitch.tv/docs/eventsub/manage-subscriptions/#subscription-limits) */
    cost: number;
  }[];
  /** The total number of subscriptions you’ve created. */
  total: number;
  /** The sum of all of your subscription costs. [Learn More](https://dev.twitch.tv/docs/eventsub/manage-subscriptions/#subscription-limits) */
  total_cost: number;
  /** The maximum total cost that you’re allowed to incur for all subscriptions you create. */
  max_total_cost: number;
}

export interface DeleteEventSubSubscriptionParams {
  /** The ID of the subscription to delete. */
  id: string;
}

/**
 * Use the _status_, _type_, and _user\_id_ query parameters to filter the list of subscriptions that are returned. The filters are mutually exclusive; the request fails if you specify more than one filter.
 */
export interface GetEventSubSubscriptionsParams {
  /**
   * Filter subscriptions by its status. Possible values are:   
   *   
   * * enabled — The subscription is enabled.
   * * webhook\_callback\_verification\_pending — The subscription is pending verification of the specified callback URL.
   * * webhook\_callback\_verification\_failed — The specified callback URL failed verification.
   * * notification\_failures\_exceeded — The notification delivery failure rate was too high.
   * * authorization\_revoked — The authorization was revoked for one or more users specified in the **Condition** object.
   * * user\_removed — One of the users specified in the **Condition** object was removed.
   * * version\_removed — The subscribed to subscription type and version is no longer supported.
   */
  status?: 'enabled' | 'webhook_callback_verification_pending' | 'webhook_callback_verification_failed' | 'notification_failures_exceeded' | 'authorization_revoked' | 'user_removed' | 'version_removed';
  /** Filter subscriptions by subscription type. For a list of subscription types, see [Subscription Types](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#subscription-types). */
  type?: string;
  /** Filter subscriptions by user ID. The response contains subscriptions where this ID matches a user ID that you specified in the **Condition** object when you [created the subscription](https://dev.twitch.tv/docs/api/reference#create-eventsub-subscription). */
  user_id?: string;
  /** The cursor used to get the next page of results. The `pagination` object in the response contains the cursor’s value. */
  after?: string;
}

export interface GetEventSubSubscriptionsResponse {
  /** The list of subscriptions. The list is ordered by the oldest subscription first. The list is empty if the client hasn’t created subscriptions or there are no subscriptions that match the specified filter criteria. */
  data: {
    /** An ID that identifies the subscription. */
    id: string;
    /**
     * The subscription’s status. Possible values are:   
     *   
     * * enabled — The subscription is enabled.
     * * webhook\_callback\_verification\_pending — The subscription is pending verification of the specified callback URL.
     * * webhook\_callback\_verification\_failed — The specified callback URL failed verification.
     * * notification\_failures\_exceeded — The notification delivery failure rate was too high.
     * * authorization\_revoked — The authorization was revoked for one or more users specified in the **Condition** object.
     * * user\_removed — One of the users specified in the **Condition** object was removed.
     */
    status: 'enabled' | 'webhook_callback_verification_pending' | 'webhook_callback_verification_failed' | 'notification_failures_exceeded' | 'authorization_revoked' | 'user_removed';
    /** The subscription’s type. See [Subscription Types](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#subscription-types). */
    type: string;
    /** The version number that identifies this definition of the subscription’s data. */
    version: string;
    /** The subscription’s parameter values. This is a string-encoded JSON object whose contents are determined by the subscription type. */
    condition: Object;
    /** The date and time (in RFC3339 format) of when the subscription was created. */
    created_at: string;
    /** The transport details used to send the notifications. */
    transport: {
      /**
       * The transport method. Possible values are:   
       *   
       * * webhook
       * * websocket
       */
      method: 'webhook' | 'websocket';
      /** The callback URL where the notifications are sent. Included only if `method` is set to **webhook**. */
      callback: string;
      /** An ID that identifies the WebSocket that notifications are sent to. Included only if `method` is set to **websocket**. */
      session_id: string;
      /** The UTC date and time that the WebSocket connection was established. Included only if `method` is set to **websocket**. */
      connected_at: string;
      /** The UTC date and time that the WebSocket connection was lost. Included only if `method` is set to **websocket**. */
      disconnected_at: string;
    };
    /** The amount that the subscription counts against your limit. [Learn More](https://dev.twitch.tv/docs/eventsub/manage-subscriptions/#subscription-limits) */
    cost: number;
  }[];
  /** The total number of subscriptions that you’ve created. */
  total: number;
  /** The sum of all of your subscription costs. [Learn More](https://dev.twitch.tv/docs/eventsub/manage-subscriptions/#subscription-limits) */
  total_cost: number;
  /** The maximum total cost that you’re allowed to incur for all subscriptions that you create. */
  max_total_cost: number;
  /** An object that contains the cursor used to get the next page of subscriptions. The object is empty if there are no more pages to get. The number of subscriptions returned per page is undertermined. */
  pagination: {
    /** The cursor value that you set the _after_ query parameter to. */
    cursor: string;
  };
}

export interface GetTopGamesParams {
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
  /** The cursor used to get the previous page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  before?: string;
}

export interface GetTopGamesResponse {
  /** The list of broadcasts. The broadcasts are sorted by the number of viewers, with the most popular first. */
  data: {
    /** An ID that identifies the category or game. */
    id: string;
    /** The category’s or game’s name. */
    name: string;
    /** A URL to the category’s or game’s box art. You must replace the `{width}x{height}` placeholder with the size of image you want. */
    box_art_url: string;
  }[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ or _before_ query parameter to get the next or previous page of results. */
    cursor: string;
  };
}

export interface GetGamesParams {
  /** The ID of the category or game to get. Include this parameter for each category or game you want to get. For example, `&id=1234&id=5678`. You may specify a maximum of 100 IDs. The endpoint ignores duplicate and invalid IDs or IDs that weren’t found. */
  id: string | string[];
  /** The name of the category or game to get. The name must exactly match the category’s or game’s title. Include this parameter for each category or game you want to get. For example, `&name=foo&name=bar`. You may specify a maximum of 100 names. The endpoint ignores duplicate names and names that weren’t found. */
  name: string | string[];
}

export interface GetGamesResponse {
  /** The list of categories and games. The list is empty if the specified categories and games weren’t found. */
  data: {
    /** An ID that identifies the category or game. */
    id: string;
    /** The category’s or game’s name. */
    name: string;
    /** A URL to the category’s or game’s box art. You must replace the `{width}x{height}` placeholder with the size of image you want. */
    box_art_url: string;
  }[];
}

export interface GetCreatorGoalsParams {
  /** The ID of the broadcaster that created the goals. This ID must match the user ID in the user access token. */
  broadcaster_id: string;
}

export interface GetCreatorGoalsResponse {
  /** The list of goals. The list is empty if the broadcaster hasn’t created goals. */
  data: {
    /** An ID that identifies this goal. */
    id: string;
    /** An ID that identifies the broadcaster that created the goal. */
    broadcaster_id: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /**
     * The type of goal. Possible values are:   
     *   
     * * follower — The goal is to increase followers.
     * * subscription — The goal is to increase subscriptions. This type shows the net increase or decrease in tier points associated with the subscriptions.
     * * subscription\_count — The goal is to increase subscriptions. This type shows the net increase or decrease in the number of subscriptions.
     * * new\_subscription — The goal is to increase subscriptions. This type shows only the net increase in tier points associated with the subscriptions (it does not account for users that unsubscribed since the goal started).
     * * new\_subscription\_count — The goal is to increase subscriptions. This type shows only the net increase in the number of subscriptions (it does not account for users that unsubscribed since the goal started).
     */
    type: 'follower' | 'subscription' | 'subscription_count' | 'new_subscription' | 'new_subscription_count';
    /** A description of the goal. Is an empty string if not specified. */
    description: string;
    /**
     * The goal’s current value.  
     *   
     * The goal’s `type` determines how this value is increased or decreased.   
     *   
     * * If `type` is follower, this field is set to the broadcaster's current number of followers. This number increases with new followers and decreases when users unfollow the broadcaster.
     * * If `type` is subscription, this field is increased and decreased by the points value associated with the subscription tier. For example, if a tier-two subscription is worth 2 points, this field is increased or decreased by 2, not 1.
     * * If `type` is subscription\_count, this field is increased by 1 for each new subscription and decreased by 1 for each user that unsubscribes.
     * * If `type` is new\_subscription, this field is increased by the points value associated with the subscription tier. For example, if a tier-two subscription is worth 2 points, this field is increased by 2, not 1.
     * * If `type` is new\_subscription\_count, this field is increased by 1 for each new subscription.
     */
    current_amount: number;
    /** The goal’s target value. For example, if the broadcaster has 200 followers before creating the goal, and their goal is to double that number, this field is set to 400. */
    target_amount: number;
    /** The UTC date and time (in RFC3339 format) that the broadcaster created the goal. */
    created_at: string;
  }[];
}

export interface GetHypeTrainEventsParams {
  /** The ID of the broadcaster that’s running the Hype Train. This ID must match the User ID in the user access token. */
  broadcaster_id: string;
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 1. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetHypeTrainEventsResponse {
  /** The list of Hype Train events. The list is empty if the broadcaster hasn’t run a Hype Train within the last 5 days. */
  data: {
    /** An ID that identifies this event. */
    id: string;
    /** The type of event. The string is in the form, hypetrain.{event\_name}. The request returns only progress event types (i.e., hypetrain.progression). */
    event_type: string;
    /** The UTC date and time (in RFC3339 format) that the event occurred. */
    event_timestamp: string;
    /** The version number of the definition of the event’s data. For example, the value is 1 if the data in `event_data` uses the first definition of the event’s data. */
    version: string;
    /** The event’s data. */
    event_data: {
      /** The ID of the broadcaster that’s running the Hype Train. */
      broadcaster_id: string;
      /** The UTC date and time (in RFC3339 format) that another Hype Train can start. */
      cooldown_end_time: string;
      /** The UTC date and time (in RFC3339 format) that the Hype Train ends. */
      expires_at: string;
      /** The value needed to reach the next level. */
      goal: number;
      /** An ID that identifies this Hype Train. */
      id: string;
      /** The most recent contribution towards the Hype Train’s goal. */
      last_contribution: Object;
      /** The highest level that the Hype Train reached (the levels are 1 through 5). */
      level: number;
      /** The UTC date and time (in RFC3339 format) that this Hype Train started. */
      started_at: string;
      /** The top contributors for each contribution type. For example, the top contributor using BITS (by aggregate) and the top contributor using SUBS (by count). */
      top_contributions: Object[];
      /** The current total amount raised. */
      total: number;
    };
  }[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ query parameter. */
    cursor: string;
  };
}

export interface CheckAutoModStatusBody {
  /** The list of messages to check. The list must contain at least one message and may contain up to a maximum of 100 messages. */
  data: {
    /** A caller-defined ID used to correlate this message with the same message in the response. */
    msg_id: string;
    /** The message to check. */
    msg_text: string;
  }[];
}

export interface CheckAutoModStatusParams {
  /** The ID of the broadcaster whose AutoMod settings and list of blocked terms are used to check the message. This ID must match the user ID in the access token. */
  broadcaster_id: string;
}

export interface CheckAutoModStatusResponse {
  /** The list of messages and whether Twitch would approve them for chat. */
  data: {
    /** The caller-defined ID passed in the request. */
    msg_id: string;
    /** A Boolean value that indicates whether Twitch would approve the message for chat or hold it for moderator review or block it from chat. Is **true** if Twitch would approve the message; otherwise, **false** if Twitch would hold the message for moderator review or block it from chat. */
    is_permitted: boolean;
  }[];
}

export interface ManageHeldAutoModMessagesBody {
  /** The moderator who is approving or denying the held message. This ID must match the user ID in the access token. */
  user_id: string;
  /** The ID of the message to allow or deny. */
  msg_id: string;
  /**
   * The action to take for the message. Possible values are:  
   *   
   * * ALLOW
   * * DENY
   */
  action: 'ALLOW' | 'DENY';
}

export interface GetAutoModSettingsParams {
  /** The ID of the broadcaster whose AutoMod settings you want to get. */
  broadcaster_id: string;
  /** The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token. */
  moderator_id: string;
}

export interface GetAutoModSettingsResponse {
  /** The list of AutoMod settings. The list contains a single object that contains all the AutoMod settings. */
  data: {
    /** The broadcaster’s ID. */
    broadcaster_id: string;
    /** The moderator’s ID. */
    moderator_id: string;
    /** The default AutoMod level for the broadcaster. This field is **null** if the broadcaster has set one or more of the individual settings. */
    overall_level: number;
    /** The Automod level for discrimination against disability. */
    disability: number;
    /** The Automod level for hostility involving aggression. */
    aggression: number;
    /** The AutoMod level for discrimination based on sexuality, sex, or gender. */
    sexuality_sex_or_gender: number;
    /** The Automod level for discrimination against women. */
    misogyny: number;
    /** The Automod level for hostility involving name calling or insults. */
    bullying: number;
    /** The Automod level for profanity. */
    swearing: number;
    /** The Automod level for racial discrimination. */
    race_ethnicity_or_religion: number;
    /** The Automod level for sexual content. */
    sex_based_terms: number;
  }[];
}

/**
 * Because PUT is an overwrite operation, you must include all the fields that you want set after the operation completes. Typically, you’ll send a GET request, update the fields you want to change, and pass that object in the PUT request.
 *
 * You may set either `overall_level` or the individual settings like `aggression`, but not both.
 *
 * Setting `overall_level` applies default values to the individual settings. However, setting `overall_level` to 4 does not necessarily mean that it applies 4 to all the individual settings. Instead, it applies a set of recommended defaults to the rest of the settings. For example, if you set `overall_level` to 2, Twitch provides some filtering on discrimination and sexual content, but more filtering on hostility (see the first example response).
 *
 * If `overall_level` is currently set and you update `swearing` to 3, `overall_level` will be set to **null** and all settings other than `swearing` will be set to 0\. The same is true if individual settings are set and you update `overall_level` to 3 — all the individual settings are updated to reflect the default level.
 *
 * Note that if you set all the individual settings to values that match what `overall_level` would have set them to, Twitch changes AutoMod to use the default AutoMod level instead of using the individual settings.
 *
 * Valid values for all levels are from 0 (no filtering) through 4 (most aggressive filtering). These levels affect how aggressively AutoMod holds back messages for moderators to review before they appear in chat or are denied (not shown).
 */
export interface UpdateAutoModSettingsBody {
  /** The Automod level for hostility involving aggression. */
  aggression?: number;
  /** The Automod level for hostility involving name calling or insults. */
  bullying?: number;
  /** The Automod level for discrimination against disability. */
  disability?: number;
  /** The Automod level for discrimination against women. */
  misogyny?: number;
  /** The default AutoMod level for the broadcaster. */
  overall_level?: number;
  /** The Automod level for racial discrimination. */
  race_ethnicity_or_religion?: number;
  /** The Automod level for sexual content. */
  sex_based_terms?: number;
  /** The AutoMod level for discrimination based on sexuality, sex, or gender. */
  sexuality_sex_or_gender?: number;
  /** The Automod level for profanity. */
  swearing?: number;
}

export interface UpdateAutoModSettingsParams {
  /** The ID of the broadcaster whose AutoMod settings you want to update. */
  broadcaster_id: string;
  /** The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token. */
  moderator_id: string;
}

export interface UpdateAutoModSettingsResponse {
  /** The list of AutoMod settings. The list contains a single object that contains all the AutoMod settings. */
  data: {
    /** The broadcaster’s ID. */
    broadcaster_id: string;
    /** The moderator’s ID. */
    moderator_id: string;
    /** The default AutoMod level for the broadcaster. This field is **null** if the broadcaster has set one or more of the individual settings. */
    overall_level: number;
    /** The Automod level for discrimination against disability. */
    disability: number;
    /** The Automod level for hostility involving aggression. */
    aggression: number;
    /** The AutoMod level for discrimination based on sexuality, sex, or gender. */
    sexuality_sex_or_gender: number;
    /** The Automod level for discrimination against women. */
    misogyny: number;
    /** The Automod level for hostility involving name calling or insults. */
    bullying: number;
    /** The Automod level for profanity. */
    swearing: number;
    /** The Automod level for racial discrimination. */
    race_ethnicity_or_religion: number;
    /** The Automod level for sexual content. */
    sex_based_terms: number;
  }[];
}

export interface GetBannedUsersParams {
  /** The ID of the broadcaster whose list of banned users you want to get. This ID must match the user ID in the access token. */
  broadcaster_id: string;
  /**
   * A list of user IDs used to filter the results. To specify more than one ID, include this parameter for each user you want to get. For example, `user_id=1234&user_id=5678`. You may specify a maximum of 100 IDs.  
   *   
   * The returned list includes only those users that were banned or put in a timeout. The list is returned in the same order that you specified the IDs.
   */
  user_id?: string | string[];
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
  /** The cursor used to get the previous page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  before?: string;
}

export interface GetBannedUsersResponse {
  /** The list of users that were banned or put in a timeout. */
  data: {
    /** The ID of the banned user. */
    user_id: string;
    /** The banned user’s login name. */
    user_login: string;
    /** The banned user’s display name. */
    user_name: string;
    /** The UTC date and time (in RFC3339 format) of when the timeout expires, or an empty string if the user is permanently banned. */
    expires_at: string;
    /** The UTC date and time (in RFC3339 format) of when the user was banned. */
    created_at: string;
    /** The reason the user was banned or put in a timeout if the moderator provided one. */
    reason: string;
    /** The ID of the moderator that banned the user or put them in a timeout. */
    moderator_id: string;
    /** The moderator’s login name. */
    moderator_login: string;
    /** The moderator’s display name. */
    moderator_name: string;
  }[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ query parameter. */
    cursor: string;
  };
}

export interface BanUserBody {
  /** Identifies the user and type of ban. */
  data: {
    /** The ID of the user to ban or put in a timeout. */
    user_id: string;
    /**
     * To ban a user indefinitely, don’t include this field.  
     *   
     * To put a user in a timeout, include this field and specify the timeout period, in seconds. The minimum timeout is 1 second and the maximum is 1,209,600 seconds (2 weeks).  
     *   
     * To end a user’s timeout early, set this field to 1, or use the [Unban user](https://dev.twitch.tv/docs/api/reference#unban-user) endpoint.
     */
    duration?: number;
    /** The reason the you’re banning the user or putting them in a timeout. The text is user defined and is limited to a maximum of 500 characters. */
    reason?: string;
  };
}

export interface BanUserParams {
  /** The ID of the broadcaster whose chat room the user is being banned from. */
  broadcaster_id: string;
  /** The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token. */
  moderator_id: string;
}

export interface BanUserResponse {
  /** A list that contains the user you successfully banned or put in a timeout. */
  data: {
    /** The broadcaster whose chat room the user was banned from chatting in. */
    broadcaster_id: string;
    /** The moderator that banned or put the user in the timeout. */
    moderator_id: string;
    /** The user that was banned or put in a timeout. */
    user_id: string;
    /** The UTC date and time (in RFC3339 format) that the ban or timeout was placed. */
    created_at: string;
    /** The UTC date and time (in RFC3339 format) that the timeout will end. Is **null** if the user was banned instead of being put in a timeout. */
    end_time: string;
  }[];
}

export interface UnbanUserParams {
  /** The ID of the broadcaster whose chat room the user is banned from chatting in. */
  broadcaster_id: string;
  /** The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token. */
  moderator_id: string;
  /** The ID of the user to remove the ban or timeout from. */
  user_id: string;
}

export interface GetBlockedTermsParams {
  /** The ID of the broadcaster whose blocked terms you’re getting. */
  broadcaster_id: string;
  /** The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token. */
  moderator_id: string;
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. */
  after?: string;
}

export interface GetBlockedTermsResponse {
  /** The list of blocked terms. The list is in descending order of when they were created (see the `created_at` timestamp). */
  data: Object[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ query parameter. */
    cursor: string;
  };
}

export interface AddBlockedTermBody {
  /**
   * The word or phrase to block from being used in the broadcaster’s chat room. The term must contain a minimum of 2 characters and may contain up to a maximum of 500 characters.  
   *   
   * Terms may include a wildcard character (\*). The wildcard character must appear at the beginning or end of a word or set of characters. For example, \*foo or foo\*.  
   *   
   * If the blocked term already exists, the response contains the existing blocked term.
   */
  text: string;
}

export interface AddBlockedTermParams {
  /** The ID of the broadcaster that owns the list of blocked terms. */
  broadcaster_id: string;
  /** The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token. */
  moderator_id: string;
}

export interface AddBlockedTermResponse {
  /** A list that contains the single blocked term that the broadcaster added. */
  data: {
    /** The broadcaster that owns the list of blocked terms. */
    broadcaster_id: string;
    /** The moderator that blocked the word or phrase from being used in the broadcaster’s chat room. */
    moderator_id: string;
    /** An ID that identifies this blocked term. */
    id: string;
    /** The blocked word or phrase. */
    text: string;
    /** The UTC date and time (in RFC3339 format) that the term was blocked. */
    created_at: string;
    /**
     * The UTC date and time (in RFC3339 format) that the term was updated.  
     *   
     * When the term is added, this timestamp is the same as `created_at`. The timestamp changes as AutoMod continues to deny the term.
     */
    updated_at: string;
    /**
     * The UTC date and time (in RFC3339 format) that the blocked term is set to expire. After the block expires, users may use the term in the broadcaster’s chat room.  
     *   
     * This field is **null** if the term was added manually or was permanently blocked by AutoMod.
     */
    expires_at: string;
  }[];
}

export interface RemoveBlockedTermParams {
  /** The ID of the broadcaster that owns the list of blocked terms. */
  broadcaster_id: string;
  /** The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token. */
  moderator_id: string;
  /** The ID of the blocked term to remove from the broadcaster’s list of blocked terms. */
  id: string;
}

export interface DeleteChatMessagesParams {
  /** The ID of the broadcaster that owns the chat room to remove messages from. */
  broadcaster_id: string;
  /** The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token. */
  moderator_id: string;
  /**
   * The ID of the message to remove. The `id` tag in the [PRIVMSG](https://dev.twitch.tv/docs/irc/tags#privmsg-tags) tag contains the message’s ID. Restrictions:  
   *   
   * * The message must have been created within the last 6 hours.
   * * The message must not belong to the broadcaster.
   * * The message must not belong to another moderator.
   *   
   * If not specified, the request removes all messages in the broadcaster’s chat room.
   */
  message_id?: string;
}

export interface GetModeratorsParams {
  /** The ID of the broadcaster whose list of moderators you want to get. This ID must match the user ID in the access token. */
  broadcaster_id: string;
  /**
   * A list of user IDs used to filter the results. To specify more than one ID, include this parameter for each moderator you want to get. For example, `user_id=1234&user_id=5678`. You may specify a maximum of 100 IDs.  
   *   
   * The returned list includes only the users from the list who are moderators in the broadcaster’s channel. The list is returned in the same order as you specified the IDs.
   */
  user_id?: string | string[];
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20. */
  first?: string;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetModeratorsResponse {
  /** The list of moderators. */
  data: {
    /** The ID of the user that has permission to moderate the broadcaster’s channel. */
    user_id: string;
    /** The user’s login name. */
    user_login: string;
    /** The user’s display name. */
    user_name: string;
  }[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ query parameter. */
    cursor: string;
  };
}

export interface AddChannelModeratorParams {
  /** The ID of the broadcaster that owns the chat room. This ID must match the user ID in the access token. */
  broadcaster_id: string;
  /** The ID of the user to add as a moderator in the broadcaster’s chat room. */
  user_id: string;
}

export interface RemoveChannelModeratorParams {
  /** The ID of the broadcaster that owns the chat room. This ID must match the user ID in the access token. */
  broadcaster_id: string;
  /** The ID of the user to remove as a moderator from the broadcaster’s chat room. */
  user_id: string;
}

export interface GetVIPsParams {
  /** Filters the list for specific VIPs. To specify more than one user, include the _user\_id_ parameter for each user to get. For example, `&user_id=1234&user_id=5678`. The maximum number of IDs that you may specify is 100\. Ignores the ID of those users in the list that aren’t VIPs. */
  user_id?: string | string[];
  /** The ID of the broadcaster whose list of VIPs you want to get. This ID must match the user ID in the access token. */
  broadcaster_id: string;
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100\. The default is 20. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetVIPsResponse {
  /** The list of VIPs. The list is empty if the broadcaster doesn’t have VIP users. */
  data: {
    /** An ID that uniquely identifies the VIP user. */
    user_id: string;
    /** The user’s display name. */
    user_name: string;
    /** The user’s login name. */
    user_login: string;
  }[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ query parameter. */
    cursor: string;
  };
}

export interface AddChannelVIPParams {
  /** The ID of the user to give VIP status to. */
  user_id: string;
  /** The ID of the broadcaster that’s adding the user as a VIP. This ID must match the user ID in the access token. */
  broadcaster_id: string;
}

export interface RemoveChannelVIPParams {
  /** The ID of the user to remove VIP status from. */
  user_id: string;
  /** The ID of the broadcaster who owns the channel where the user has VIP status. */
  broadcaster_id: string;
}

export interface GetPollsParams {
  /** The ID of the broadcaster that created the polls. This ID must match the user ID in the user access token. */
  broadcaster_id: string;
  /**
   * A list of IDs that identify the polls to return. To specify more than one ID, include this parameter for each poll you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 20 IDs.  
   *   
   * Specify this parameter only if you want to filter the list that the request returns. The endpoint ignores duplicate IDs and those not owned by this broadcaster.
   */
  id?: string | string[];
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 20 items per page. The default is 20. */
  first?: string;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetPollsResponse {
  /** A list of polls. The polls are returned in descending order of start time unless you specify IDs in the request, in which case they’re returned in the same order as you passed them in the request. The list is empty if the broadcaster hasn’t created polls. */
  data: {
    /** An ID that identifies the poll. */
    id: string;
    /** An ID that identifies the broadcaster that created the poll. */
    broadcaster_id: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The question that viewers are voting on. For example, _What game should I play next?_ The title may contain a maximum of 60 characters. */
    title: string;
    /** A list of choices that viewers can choose from. The list will contain a minimum of two choices and up to a maximum of five choices. */
    choices: {
      /** An ID that identifies this choice. */
      id: string;
      /** The choice’s title. The title may contain a maximum of 25 characters. */
      title: string;
      /** The total number of votes cast for this choice. */
      votes: number;
      /** The number of votes cast using Channel Points. */
      channel_points_votes: number;
      /** Not used; will be set to 0. */
      bits_votes: number;
    }[];
    /** Not used; will be set to **false**. */
    bits_voting_enabled: boolean;
    /** Not used; will be set to 0. */
    bits_per_vote: number;
    /** A Boolean value that indicates whether viewers may cast additional votes using Channel Points. For information about Channel Points, see [Channel Points Guide](https://help.twitch.tv/s/article/channel-points-guide). */
    channel_points_voting_enabled: boolean;
    /** The number of points the viewer must spend to cast one additional vote. */
    channel_points_per_vote: number;
    /**
     * The poll’s status. Valid values are:  
     *   
     * * ACTIVE — The poll is running.
     * * COMPLETED — The poll ended on schedule (see the `duration` field).
     * * TERMINATED — The poll was terminated before its scheduled end.
     * * ARCHIVED — The poll has been archived and is no longer visible on the channel.
     * * MODERATED — The poll was deleted.
     * * INVALID — Something went wrong while determining the state.
     */
    status: 'ACTIVE' | 'COMPLETED' | 'TERMINATED' | 'ARCHIVED' | 'MODERATED' | 'INVALID';
    /** The length of time (in seconds) that the poll will run for. */
    duration: number;
    /** The UTC date and time (in RFC3339 format) of when the poll began. */
    started_at: string;
    /** The UTC date and time (in RFC3339 format) of when the poll ended. If `status` is ACTIVE, this field is set to **null**. */
    ended_at: string;
  }[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ query parameter. */
    cursor: string;
  };
}

export interface CreatePollBody {
  /** The ID of the broadcaster that’s running the poll. This ID must match the user ID in the user access token. */
  broadcaster_id: string;
  /** The question that viewers will vote on. For example, _What game should I play next?_ The question may contain a maximum of 60 characters. */
  title: string;
  /** A list of choices that viewers may choose from. The list must contain a minimum of 2 choices and up to a maximum of 5 choices. */
  choices: {
    /** One of the choices the viewer may select. The choice may contain a maximum of 25 characters. */
    title: string;
  }[];
  /** The length of time (in seconds) that the poll will run for. The minimum is 15 seconds and the maximum is 1800 seconds (30 minutes). */
  duration: number;
  /** A Boolean value that indicates whether viewers may cast additional votes using Channel Points. If **true**, the viewer may cast more than one vote but each additional vote costs the number of Channel Points specified in `channel_points_per_vote`. The default is **false** (viewers may cast only one vote). For information about Channel Points, see [Channel Points Guide](https://help.twitch.tv/s/article/channel-points-guide). */
  channel_points_voting_enabled?: boolean;
  /** The number of points that the viewer must spend to cast one additional vote. The minimum is 1 and the maximum is 1000000\. Set only if `ChannelPointsVotingEnabled` is **true**. */
  channel_points_per_vote?: number;
}

export interface CreatePollResponse {
  /** A list that contains the single poll that you created. */
  data: {
    /** An ID that identifies the poll. */
    id: string;
    /** An ID that identifies the broadcaster that created the poll. */
    broadcaster_id: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The question that viewers are voting on. For example, _What game should I play next?_ The title may contain a maximum of 60 characters. */
    title: string;
    /** A list of choices that viewers can choose from. The list will contain a minimum of two choices and up to a maximum of five choices. */
    choices: {
      /** An ID that identifies this choice. */
      id: string;
      /** The choice’s title. The title may contain a maximum of 25 characters. */
      title: string;
      /** The total number of votes cast for this choice. */
      votes: number;
      /** The number of votes cast using Channel Points. */
      channel_points_votes: number;
      /** Not used; will be set to 0. */
      bits_votes: number;
    }[];
    /** Not used; will be set to **false**. */
    bits_voting_enabled: boolean;
    /** Not used; will be set to 0. */
    bits_per_vote: number;
    /** A Boolean value that indicates whether viewers may cast additional votes using Channel Points. For information about Channel Points, see [Channel Points Guide](https://help.twitch.tv/s/article/channel-points-guide). */
    channel_points_voting_enabled: boolean;
    /** The number of points the viewer must spend to cast one additional vote. */
    channel_points_per_vote: number;
    /**
     * The poll’s status. Valid values are:  
     *   
     * * ACTIVE — The poll is running.
     * * COMPLETED — The poll ended on schedule (see the `duration` field).
     * * TERMINATED — The poll was terminated before its scheduled end.
     * * ARCHIVED — The poll has been archived and is no longer visible on the channel.
     * * MODERATED — The poll was deleted.
     * * INVALID — Something went wrong while determining the state.
     */
    status: 'ACTIVE' | 'COMPLETED' | 'TERMINATED' | 'ARCHIVED' | 'MODERATED' | 'INVALID';
    /** The length of time (in seconds) that the poll will run for. */
    duration: number;
    /** The UTC date and time (in RFC3339 format) of when the poll began. */
    started_at: string;
    /** The UTC date and time (in RFC3339 format) of when the poll ended. If `status` is ACTIVE, this field is set to **null**. */
    ended_at: string;
  }[];
}

export interface EndPollBody {
  /** The ID of the broadcaster that’s running the poll. This ID must match the user ID in the user access token. */
  broadcaster_id: string;
  /** The ID of the poll to update. */
  id: string;
  /**
   * The status to set the poll to. Possible case-sensitive values are:  
   *   
   * * TERMINATED — Ends the poll before the poll is scheduled to end. The poll remains publicly visible.
   * * ARCHIVED — Ends the poll before the poll is scheduled to end, and then archives it so it's no longer publicly visible.
   */
  status: 'TERMINATED' | 'ARCHIVED';
}

export interface EndPollResponse {
  /** A list that contains the poll that you ended. */
  data: {
    /** An ID that identifies the poll. */
    id: string;
    /** An ID that identifies the broadcaster that created the poll. */
    broadcaster_id: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The question that viewers are voting on. For example, _What game should I play next?_ The title may contain a maximum of 60 characters. */
    title: string;
    /** A list of choices that viewers can choose from. The list will contain a minimum of two choices and up to a maximum of five choices. */
    choices: {
      /** An ID that identifies this choice. */
      id: string;
      /** The choice’s title. The title may contain a maximum of 25 characters. */
      title: string;
      /** The total number of votes cast for this choice. */
      votes: number;
      /** The number of votes cast using Channel Points. */
      channel_points_votes: number;
      /** Not used; will be set to 0. */
      bits_votes: number;
    }[];
    /** Not used; will be set to **false**. */
    bits_voting_enabled: boolean;
    /** Not used; will be set to 0. */
    bits_per_vote: number;
    /** A Boolean value that indicates whether viewers may cast additional votes using Channel Points. For information about Channel Points, see [Channel Points Guide](https://help.twitch.tv/s/article/channel-points-guide). */
    channel_points_voting_enabled: boolean;
    /** The number of points the viewer must spend to cast one additional vote. */
    channel_points_per_vote: number;
    /**
     * The poll’s status. Valid values are:  
     *   
     * * ACTIVE — The poll is running.
     * * COMPLETED — The poll ended on schedule (see the `duration` field).
     * * TERMINATED — The poll was terminated before its scheduled end.
     * * ARCHIVED — The poll has been archived and is no longer visible on the channel.
     * * MODERATED — The poll was deleted.
     * * INVALID — Something went wrong while determining the state.
     */
    status: 'ACTIVE' | 'COMPLETED' | 'TERMINATED' | 'ARCHIVED' | 'MODERATED' | 'INVALID';
    /** The length of time (in seconds) that the poll will run for. */
    duration: number;
    /** The UTC date and time (in RFC3339 format) of when the poll began. */
    started_at: string;
    /** The UTC date and time (in RFC3339 format) of when the poll ended. If `status` is ACTIVE, this field is set to **null**. */
    ended_at: string;
  }[];
}

export interface GetPredictionsParams {
  /** The ID of the broadcaster whose predictions you want to get. This ID must match the user ID associated with the user access token. */
  broadcaster_id: string;
  /** The ID of the prediction to get. To specify more than one ID, include this parameter for each prediction you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 25 IDs. The endpoint ignores duplicate IDs and those not owned by the broadcaster. */
  id?: string | string[];
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 25 items per page. The default is 20. */
  first?: string;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetPredictionsResponse {
  /** The broadcaster’s list of Channel Points Predictions. The list is sorted in descending ordered by when the prediction began (the most recent prediction is first). The list is empty if the broadcaster hasn’t created predictions. */
  data: {
    /** An ID that identifies this prediction. */
    id: string;
    /** An ID that identifies the broadcaster that created the prediction. */
    broadcaster_id: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The question that the prediction asks. For example, _Will I finish this entire pizza?_ */
    title: string;
    /** The ID of the winning outcome. Is **null** unless `status` is RESOLVED. */
    winning_outcome_id: string;
    /** The list of possible outcomes for the prediction. */
    outcomes: {
      /** An ID that identifies this outcome. */
      id: string;
      /** The outcome’s text. */
      title: string;
      /** The number of unique viewers that chose this outcome. */
      users: number;
      /** The number of Channel Points spent by viewers on this outcome. */
      channel_points: number;
      /** A list of viewers who were the top predictors; otherwise, **null** if none. */
      top_predictors: Object[];
      /**
       * The color that visually identifies this outcome in the UX. Possible values are:  
       *   
       * * BLUE
       * * PINK
       *   
       * If the number of outcomes is two, the color is BLUE for the first outcome and PINK for the second outcome. If there are more than two outcomes, the color is BLUE for all outcomes.
       */
      color: 'BLUE' | 'PINK';
    }[];
    /** The length of time (in seconds) that the prediction will run for. */
    prediction_window: number;
    /**
     * The prediction’s status. Valid values are:  
     *   
     * * ACTIVE — The Prediction is running and viewers can make predictions.
     * * CANCELED — The broadcaster canceled the Prediction and refunded the Channel Points to the participants.
     * * LOCKED — The broadcaster locked the Prediction, which means viewers can no longer make predictions.
     * * RESOLVED — The winning outcome was determined and the Channel Points were distributed to the viewers who predicted the correct outcome.
     */
    status: 'ACTIVE' | 'CANCELED' | 'LOCKED' | 'RESOLVED';
    /** The UTC date and time of when the Prediction began. */
    created_at: string;
    /** The UTC date and time of when the Prediction ended. If `status` is ACTIVE, this is set to **null**. */
    ended_at: string;
    /** The UTC date and time of when the Prediction was locked. If `status` is not LOCKED, this is set to **null**. */
    locked_at: string;
  }[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ query parameter. */
    cursor: string;
  };
}

export interface CreatePredictionBody {
  /** The ID of the broadcaster that’s running the prediction. This ID must match the user ID in the user access token. */
  broadcaster_id: string;
  /** The question that the broadcaster is asking. For example, _Will I finish this entire pizza?_ The title is limited to a maximum of 45 characters. */
  title: string;
  /** The list of possible outcomes that the viewers may choose from. The list must contain a minimum of 2 choices and up to a maximum of 10 choices. */
  outcomes: {
    /** The text of one of the outcomes that the viewer may select. The title is limited to a maximum of 25 characters. */
    title: string;
  }[];
  /** The length of time (in seconds) that the prediction will run for. The minimum is 30 seconds and the maximum is 1800 seconds (30 minutes). */
  prediction_window: number;
}

export interface CreatePredictionResponse {
  /** A list that contains the single prediction that you created. */
  data: {
    /** An ID that identifies this prediction. */
    id: string;
    /** An ID that identifies the broadcaster that created the prediction. */
    broadcaster_id: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The question that the prediction asks. For example, _Will I finish this entire pizza?_ */
    title: string;
    /** The ID of the winning outcome. Is **null** unless `status` is RESOLVED. */
    winning_outcome_id: string;
    /** The list of possible outcomes for the prediction. */
    outcomes: {
      /** An ID that identifies this outcome. */
      id: string;
      /** The outcome’s text. */
      title: string;
      /** The number of unique viewers that chose this outcome. */
      users: number;
      /** The number of Channel Points spent by viewers on this outcome. */
      channel_points: number;
      /** A list of viewers who were the top predictors; otherwise, **null** if none. */
      top_predictors: Object[];
      /**
       * The color that visually identifies this outcome in the UX. Possible values are:  
       *   
       * * BLUE
       * * PINK
       *   
       * If the number of outcomes is two, the color is BLUE for the first outcome and PINK for the second outcome. If there are more than two outcomes, the color is BLUE for all outcomes.
       */
      color: 'BLUE' | 'PINK';
    }[];
    /** The length of time (in seconds) that the prediction will run for. */
    prediction_window: number;
    /**
     * The prediction’s status. Valid values are:  
     *   
     * * ACTIVE — The Prediction is running and viewers can make predictions.
     * * CANCELED — The broadcaster canceled the Prediction and refunded the Channel Points to the participants.
     * * LOCKED — The broadcaster locked the Prediction, which means viewers can no longer make predictions.
     * * RESOLVED — The winning outcome was determined and the Channel Points were distributed to the viewers who predicted the correct outcome.
     */
    status: 'ACTIVE' | 'CANCELED' | 'LOCKED' | 'RESOLVED';
    /** The UTC date and time of when the Prediction began. */
    created_at: string;
    /** The UTC date and time of when the Prediction ended. If `status` is ACTIVE, this is set to **null**. */
    ended_at: string;
    /** The UTC date and time of when the Prediction was locked. If `status` is not LOCKED, this is set to **null**. */
    locked_at: string;
  }[];
}

export interface EndPredictionBody {
  /** The ID of the broadcaster that’s running the prediction. This ID must match the user ID in the user access token. */
  broadcaster_id: string;
  /** The ID of the prediction to update. */
  id: string;
  /**
   * The status to set the prediction to. Possible case-sensitive values are:  
   *   
   * * RESOLVED — The winning outcome is determined and the Channel Points are distributed to the viewers who predicted the correct outcome.
   * * CANCELED — The broadcaster is canceling the prediction and sending refunds to the participants.
   * * LOCKED — The broadcaster is locking the prediction, which means viewers may no longer make predictions.
   *   
   * The broadcaster can update an active prediction to LOCKED, RESOLVED, or CANCELED; and update a locked prediction to RESOLVED or CANCELED.  
   *   
   * The broadcaster has up to 24 hours after the prediction window closes to resolve the prediction. If not, Twitch sets the status to CANCELED and returns the points.
   */
  status: 'RESOLVED' | 'CANCELED' | 'LOCKED';
  /** The ID of the winning outcome. You must set this parameter if you set `status` to RESOLVED. */
  winning_outcome_id?: string;
}

export interface EndPredictionResponse {
  /** A list that contains the single prediction that you updated. */
  data: {
    /** An ID that identifies this prediction. */
    id: string;
    /** An ID that identifies the broadcaster that created the prediction. */
    broadcaster_id: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The question that the prediction asks. For example, _Will I finish this entire pizza?_ */
    title: string;
    /** The ID of the winning outcome. Is **null** unless `status` is RESOLVED. */
    winning_outcome_id: string;
    /** The list of possible outcomes for the prediction. */
    outcomes: {
      /** An ID that identifies this outcome. */
      id: string;
      /** The outcome’s text. */
      title: string;
      /** The number of unique viewers that chose this outcome. */
      users: number;
      /** The number of Channel Points spent by viewers on this outcome. */
      channel_points: number;
      /** A list of viewers who were the top predictors; otherwise, **null** if none. */
      top_predictors: Object[];
      /**
       * The color that visually identifies this outcome in the UX. Possible values are:  
       *   
       * * BLUE
       * * PINK
       *   
       * If the number of outcomes is two, the color is BLUE for the first outcome and PINK for the second outcome. If there are more than two outcomes, the color is BLUE for all outcomes.
       */
      color: 'BLUE' | 'PINK';
    }[];
    /** The length of time (in seconds) that the prediction will run for. */
    prediction_window: number;
    /**
     * The prediction’s status. Valid values are:  
     *   
     * * ACTIVE — The Prediction is running and viewers can make predictions.
     * * CANCELED — The broadcaster canceled the Prediction and refunded the Channel Points to the participants.
     * * LOCKED — The broadcaster locked the Prediction, which means viewers can no longer make predictions.
     * * RESOLVED — The winning outcome was determined and the Channel Points were distributed to the viewers who predicted the correct outcome.
     */
    status: 'ACTIVE' | 'CANCELED' | 'LOCKED' | 'RESOLVED';
    /** The UTC date and time of when the Prediction began. */
    created_at: string;
    /** The UTC date and time of when the Prediction ended. If `status` is ACTIVE, this is set to **null**. */
    ended_at: string;
    /** The UTC date and time of when the Prediction was locked. If `status` is not LOCKED, this is set to **null**. */
    locked_at: string;
  }[];
}

export interface StartRaidParams {
  /** The ID of the broadcaster that’s sending the raiding party. This ID must match the user ID associated with the user access token. */
  from_broadcaster_id: string;
  /** The ID of the broadcaster to raid. */
  to_broadcaster_id: string;
}

export interface StartRaidResponse {
  /** A list that contains a single object with information about the pending raid. */
  data: {
    /** The UTC date and time, in RFC3339 format, of when the raid was requested. */
    created_at: string;
    /** A Boolean value that indicates whether the channel being raided contains mature content. */
    is_mature: boolean;
  }[];
}

export interface CancelRaidParams {
  /** The ID of the broadcaster that initiated the raid. This ID must match the user ID associated with the user access token. */
  broadcaster_id: string;
}

export interface GetChannelStreamScheduleParams {
  /** The ID of the broadcaster that owns the streaming schedule you want to get. */
  broadcaster_id: string;
  /** The ID of the scheduled segment to return. To specify more than one segment, include the ID of each segment you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 100 IDs. */
  id?: string | string[];
  /** The UTC date and time that identifies when in the broadcaster’s schedule to start returning segments. If not specified, the request returns segments starting after the current UTC date and time. Specify the date and time in RFC3339 format (for example, `2022-09-01T00:00:00Z`). */
  start_time?: string;
  /** Not supported. */
  utc_offset?: string;
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 25 items per page. The default is 20. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetChannelStreamScheduleResponse {
  /** The broadcaster’s streaming schedule. */
  data: {
    /** The list of broadcasts in the broadcaster’s streaming schedule. */
    segments: {
      /** An ID that identifies this broadcast segment. */
      id: string;
      /** The UTC date and time (in RFC3339 format) of when the broadcast starts. */
      start_time: string;
      /** The UTC date and time (in RFC3339 format) of when the broadcast ends. */
      end_time: string;
      /** The broadcast segment’s title. */
      title: string;
      /** Indicates whether the broadcaster canceled this segment of a recurring broadcast. If the broadcaster canceled this segment, this field is set to the same value that’s in the `end_time` field; otherwise, it’s set to **null**. */
      canceled_until: string;
      /** The type of content that the broadcaster plans to stream or **null** if not specified. */
      category: Object;
      /** A Boolean value that determines whether the broadcast is part of a recurring series that streams at the same time each week or is a one-time broadcast. Is **true** if the broadcast is part of a recurring series. */
      is_recurring: boolean;
    }[];
    /** The ID of the broadcaster that owns the broadcast schedule. */
    broadcaster_id: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The dates when the broadcaster is on vacation and not streaming. Is set to **null** if vacation mode is not enabled. */
    vacation: {
      /** The UTC date and time (in RFC3339 format) of when the broadcaster’s vacation starts. */
      start_time: string;
      /** The UTC date and time (in RFC3339 format) of when the broadcaster’s vacation ends. */
      end_time: string;
    };
    /** The information used to page through a list of results. The object is empty if there are no more pages left to page through. [Read more](https://dev.twitch.tv/docs/api/guide#pagination). */
    pagination: {
      /** The cursor used to get the next page of results. Set the request’s _after_ query parameter to this value. */
      cursor: string;
    };
  };
}

export interface GetChanneliCalendarParams {
  /** The ID of the broadcaster that owns the streaming schedule you want to get. */
  broadcaster_id: string;
}

export interface UpdateChannelStreamScheduleParams {
  /** The ID of the broadcaster whose schedule settings you want to update. The ID must match the user ID in the user access token. */
  broadcaster_id: string;
  /** A Boolean value that indicates whether the broadcaster has scheduled a vacation. Set to **true** to enable Vacation Mode and add vacation dates, or **false** to cancel a previously scheduled vacation. */
  is_vacation_enabled?: boolean;
  /** The UTC date and time of when the broadcaster’s vacation starts. Specify the date and time in RFC3339 format (for example, 2021-05-16T00:00:00Z). Required if _is\_vacation\_enabled_ is **true**. */
  vacation_start_time?: string;
  /** The UTC date and time of when the broadcaster’s vacation ends. Specify the date and time in RFC3339 format (for example, 2021-05-30T23:59:59Z). Required if _is\_vacation\_enabled_ is **true**. */
  vacation_end_time?: string;
  /** The time zone that the broadcaster broadcasts from. Specify the time zone using [IANA time zone database](https://www.iana.org/time-zones) format (for example, America/New\_York). Required if _is\_vacation\_enabled_ is **true**. */
  timezone?: string;
}

export interface CreateChannelStreamScheduleSegmentBody {
  /** The date and time that the broadcast segment starts. Specify the date and time in RFC3339 format (for example, 2021-07-01T18:00:00Z). */
  start_time: string;
  /** The time zone where the broadcast takes place. Specify the time zone using [IANA time zone database](https://www.iana.org/time-zones) format (for example, America/New\_York). */
  timezone: string;
  /** The length of time, in minutes, that the broadcast is scheduled to run. The duration must be in the range 30 through 1380 (23 hours). */
  duration: string;
  /** A Boolean value that determines whether the broadcast recurs weekly. Is **true** if the broadcast recurs weekly. Only partners and affiliates may add non-recurring broadcasts. */
  is_recurring: boolean;
  /** The ID of the category that best represents the broadcast’s content. To get the category ID, use the [Search Categories](https://dev.twitch.tv/docs/api/reference#search-categories) endpoint. */
  category_id?: string;
  /** The broadcast’s title. The title may contain a maximum of 140 characters. */
  title?: string;
}

export interface CreateChannelStreamScheduleSegmentParams {
  /** The ID of the broadcaster that owns the schedule to add the broadcast segment to. This ID must match the user ID in the user access token. */
  broadcaster_id: string;
}

export interface CreateChannelStreamScheduleSegmentResponse {
  /** The broadcaster’s streaming scheduled. */
  data: {
    /** A list that contains the single broadcast segment that you added. */
    segments: {
      /** An ID that identifies this broadcast segment. */
      id: string;
      /** The UTC date and time (in RFC3339 format) of when the broadcast starts. */
      start_time: string;
      /** The UTC date and time (in RFC3339 format) of when the broadcast ends. */
      end_time: string;
      /** The broadcast segment’s title. */
      title: string;
      /** Indicates whether the broadcaster canceled this segment of a recurring broadcast. If the broadcaster canceled this segment, this field is set to the same value that’s in the `end_time` field; otherwise, it’s set to **null**. */
      canceled_until: string;
      /** The type of content that the broadcaster plans to stream or **null** if not specified. */
      category: Object;
      /** A Boolean value that determines whether the broadcast is part of a recurring series that streams at the same time each week or is a one-time broadcast. Is **true** if the broadcast is part of a recurring series. */
      is_recurring: boolean;
    }[];
    /** The ID of the broadcaster that owns the broadcast schedule. */
    broadcaster_id: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The dates when the broadcaster is on vacation and not streaming. Is set to **null** if vacation mode is not enabled. */
    vacation: {
      /** The UTC date and time (in RFC3339 format) of when the broadcaster’s vacation starts. */
      start_time: string;
      /** The UTC date and time (in RFC3339 format) of when the broadcaster’s vacation ends. */
      end_time: string;
    };
  };
}

export interface UpdateChannelStreamScheduleSegmentBody {
  /**
   * The date and time that the broadcast segment starts. Specify the date and time in RFC3339 format (for example, 2022-08-02T06:00:00Z).  
   *   
   * **NOTE**: Only partners and affiliates may update a broadcast’s start time and only for non-recurring segments.
   */
  start_time?: string;
  /** The length of time, in minutes, that the broadcast is scheduled to run. The duration must be in the range 30 through 1380 (23 hours). */
  duration?: string;
  /** The ID of the category that best represents the broadcast’s content. To get the category ID, use the [Search Categories](https://dev.twitch.tv/docs/api/reference#search-categories) endpoint. */
  category_id?: string;
  /** The broadcast’s title. The title may contain a maximum of 140 characters. */
  title?: string;
  /**
   * A Boolean value that indicates whether the broadcast is canceled. Set to **true** to cancel the segment.  
   *   
   * **NOTE**: For recurring segments, the API cancels the first segment after the current UTC date and time and not the specified segment (unless the specified segment is the next segment after the current UTC date and time).
   */
  is_canceled?: boolean;
  /** The time zone where the broadcast takes place. Specify the time zone using [IANA time zone database](https://www.iana.org/time-zones) format (for example, America/New\_York). */
  timezone?: string;
}

export interface UpdateChannelStreamScheduleSegmentParams {
  /** The ID of the broadcaster who owns the broadcast segment to update. This ID must match the user ID in the user access token. */
  broadcaster_id: string;
  /** The ID of the broadcast segment to update. */
  id: string;
}

export interface UpdateChannelStreamScheduleSegmentResponse {
  /** The broadcaster’s streaming scheduled. */
  data: {
    /** A list that contains the single broadcast segment that you updated. */
    segments: {
      /** An ID that identifies this broadcast segment. */
      id: string;
      /** The UTC date and time (in RFC3339 format) of when the broadcast starts. */
      start_time: string;
      /** The UTC date and time (in RFC3339 format) of when the broadcast ends. */
      end_time: string;
      /** The broadcast segment’s title. */
      title: string;
      /** Indicates whether the broadcaster canceled this segment of a recurring broadcast. If the broadcaster canceled this segment, this field is set to the same value that’s in the `end_time` field; otherwise, it’s set to **null**. */
      canceled_until: string;
      /** The type of content that the broadcaster plans to stream or **null** if not specified. */
      category: Object;
      /** A Boolean value that determines whether the broadcast is part of a recurring series that streams at the same time each week or is a one-time broadcast. Is **true** if the broadcast is part of a recurring series. */
      is_recurring: boolean;
    }[];
    /** The ID of the broadcaster that owns the broadcast schedule. */
    broadcaster_id: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The dates when the broadcaster is on vacation and not streaming. Is set to **null** if vacation mode is not enabled. */
    vacation: {
      /** The UTC date and time (in RFC3339 format) of when the broadcaster’s vacation starts. */
      start_time: string;
      /** The UTC date and time (in RFC3339 format) of when the broadcaster’s vacation ends. */
      end_time: string;
    };
  };
}

export interface DeleteChannelStreamScheduleSegmentParams {
  /** The ID of the broadcaster that owns the streaming schedule. This ID must match the user ID in the user access token. */
  broadcaster_id: string;
  /** The ID of the broadcast segment to remove. */
  id: string;
}

export interface SearchCategoriesParams {
  /** The URI-encoded search string. For example, encode _#archery_ as `%23archery` and search strings like _angel of death_ as `angel%20of%20death`. */
  query: string;
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface SearchCategoriesResponse {
  /** The list of games or categories that match the query. The list is empty if there are no matches. */
  data: {
    /** A URL to an image of the game’s box art or streaming category. */
    box_art_url: string;
    /** The name of the game or category. */
    name: string;
    /** An ID that uniquely identifies the game or category. */
    id: string;
  }[];
}

export interface SearchChannelsParams {
  /** The URI-encoded search string. For example, encode search strings like _angel of death_ as `angel%20of%20death`. */
  query: string;
  /** A Boolean value that determines whether the response includes only channels that are currently streaming live. Set to **true** to get only channels that are streaming live; otherwise, **false** to get live and offline channels. The default is **false**. */
  live_only?: boolean;
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface SearchChannelsResponse {
  /** The list of channels that match the query. The list is empty if there are no matches. */
  data: {
    /** The ISO 639-1 two-letter language code of the language used by the broadcaster. For example, _en_ for English. If the broadcaster uses a language not in the list of [supported stream languages](https://help.twitch.tv/s/article/languages-on-twitch#streamlang), the value is _other_. */
    broadcaster_language: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The broadcaster’s display name. */
    display_name: string;
    /** The ID of the game that the broadcaster is playing or last played. */
    game_id: string;
    /** The name of the game that the broadcaster is playing or last played. */
    game_name: string;
    /** An ID that uniquely identifies the channel (this is the broadcaster’s ID). */
    id: string;
    /** A Boolean value that determines whether the broadcaster is streaming live. Is **true** if the broadcaster is streaming live; otherwise, **false**. */
    is_live: boolean;
    /** The list of tags that apply to the stream. The list contains IDs only when the channel is steaming live. For a list of possible tags, see [List of All Tags](https://www.twitch.tv/directory/all/tags). The list doesn’t include Category Tags. */
    tag_ids: string[];
    /** A URL to a thumbnail of the broadcaster’s profile image. */
    thumbnail_url: string;
    /** The stream’s title. Is an empty string if the broadcaster didn’t set it. */
    title: string;
    /** The UTC date and time (in RFC3339 format) of when the broadcaster started streaming. The string is empty if the broadcaster is not streaming live. */
    started_at: string;
  }[];
}

export interface GetSoundtrackCurrentTrackParams {
  /** The ID of the broadcaster that’s playing a Soundtrack track. */
  broadcaster_id: string;
}

export interface GetSoundtrackCurrentTrackResponse {
  /** A list that contains the single Soundtrack track that the broadcaster is playing. */
  data: {
    /** Describes a track. */
    track: {
      /** Describes the album that the track is found on. */
      album: Object;
    };
    /** The source of the track that’s currently playing. For example, a playlist or station. */
    source: {
      /** The playlist’s or station’s ASIN (Amazon Standard Identification Number). */
      id: string;
      /** A URL to the playlist’s or station’s image art. */
      image_url: string;
      /** A URL to the playlist on Soundtrack. The string is empty if `content-type` is STATION. */
      soundtrack_url: string;
      /** A URL to the playlist on Spotify. The string is empty if `content-type` is STATION. */
      spotify_url: string;
      /** The playlist’s or station’s title. */
      title: string;
    };
  }[];
}

export interface GetSoundtrackPlaylistParams {
  /** The ID of the playlist to get. */
  id: string;
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 50 items per page. The default is 20. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetSoundtrackPlaylistResponse {
  /** The playlist’s list of tracks. */
  data: {
    /** The album that includes this track. */
    album: {
      /** The album’s ASIN (Amazon Standard Identification Number). */
      id: string;
      /** A URL to the album’s cover art. */
      image_url: string;
      /** The album’s name. If the album contains explicit content, the name will contain **\[Explicit\]** in the string. For example, Let It Die \[Explicit\]. */
      name: string;
    };
    /** The artists included on the track. */
    artists: {
      /** The ID of the Twitch user that created the track. The string is empty if a Twitch user didn’t create the track. */
      creator_channel_id: string;
      /** The artist’s ASIN (Amazon Standard Identification Number). */
      id: string;
      /** The artist’s name. This can be the band’s name or the solo artist’s name. */
      name: string;
    }[];
    /** The duration of the track, in seconds. */
    duration: number;
    /** The track’s ASIN (Amazon Standard Identification Number). */
    id: string;
    /** The track’s ISRC (International Standard Recording Code). */
    isrc: string;
    /** The track’s title. If the track contains explicit content, the title will contain **\[Explicit\]** in the string. For example, Let It Die \[Explicit\]. */
    title: string;
  }[];
  /** Contains the information used to page through a list of results. The object is empty if there are no more pages to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ query parameter. */
    cursor: string;
  };
}

export interface GetSoundtrackPlaylistsParams {
  /** The ID of the playlist to get. Specify an ID only if you want to get a single playlist instead of all playlists. */
  id?: string;
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 50 items per page. The default is 20. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetSoundtrackPlaylistsResponse {
  /** The list of Soundtrack playlists. */
  data: {
    /** A short description about the music that the playlist includes. */
    description: string;
    /** The playlist’s ASIN (Amazon Standard Identification Number). */
    id: string;
    /** A URL to the playlist’s image art. Is empty if the playlist doesn’t include art. */
    image_url: string;
    /** The playlist’s title. */
    title: string;
  }[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ query parameter. */
    cursor: string;
  };
}

export interface GetStreamKeyParams {
  /** The ID of the broadcaster that owns the channel. The ID must match the user ID in the access token. */
  broadcaster_id: string;
}

export interface GetStreamKeyResponse {
  /** A list that contains the channel’s stream key. */
  data: {
    /** The channel’s stream key. */
    stream_key: string;
  }[];
}

export interface GetStreamsParams {
  /** A user ID used to filter the list of streams. Returns only the streams of those users that are broadcasting. You may specify a maximum of 100 IDs. To specify multiple IDs, include the _user\_id_ parameter for each user. For example, `&user_id=1234&user_id=5678`. */
  user_id?: string | string[];
  /** A user login name used to filter the list of streams. Returns only the streams of those users that are broadcasting. You may specify a maximum of 100 login names. To specify multiple names, include the _user\_login_ parameter for each user. For example, `&user_login=foo&user_login=bar`. */
  user_login?: string | string[];
  /** A game (category) ID used to filter the list of streams. Returns only the streams that are broadcasting the game (category). You may specify a maximum of 100 IDs. To specify multiple IDs, include the _game\_id_ parameter for each game. For example, `&game_id=9876&game_id=5432`. */
  game_id?: string | string[];
  /**
   * The type of stream to filter the list of streams by. Possible values are:  
   *   
   * * all
   * * live
   *   
   * The default is _all_.
   */
  type?: 'all' | 'live';
  /**
   * A language code used to filter the list of streams. Returns only streams that broadcast in the specified language. Specify the language using an ISO 639-1 two-letter language code or _other_ if the broadcast uses a language not in the list of [supported stream languages](https://help.twitch.tv/s/article/languages-on-twitch#streamlang).  
   *   
   * You may specify a maximum of 100 language codes. To specify multiple languages, include the _language_ parameter for each language. For example, `&language=de&language=fr`.
   */
  language?: string | string[];
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20. */
  first?: number;
  /** The cursor used to get the previous page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  before?: string;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetStreamsResponse {
  /** The list of streams. */
  data: {
    /** An ID that identifies the stream. You can use this ID later to look up the video on demand (VOD). */
    id: string;
    /** The ID of the user that’s broadcasting the stream. */
    user_id: string;
    /** The user’s login name. */
    user_login: string;
    /** The user’s display name. */
    user_name: string;
    /** The ID of the category or game being played. */
    game_id: string;
    /** The name of the category or game being played. */
    game_name: string;
    /**
     * The type of stream. Possible values are:  
     *   
     * * live
     *   
     * If an error occurs, this field is set to an empty string.
     */
    type: 'live';
    /** The stream’s title. Is an empty string if not set. */
    title: string;
    /** The number of users watching the stream. */
    viewer_count: number;
    /** The UTC date and time (in RFC3339 format) of when the broadcast began. */
    started_at: string;
    /** The language that the stream uses. This is an ISO 639-1 two-letter language code or _other_ if the stream uses a language not in the list of [supported stream languages](https://help.twitch.tv/s/article/languages-on-twitch#streamlang). */
    language: string;
    /** A URL to an image of a frame from the last 5 minutes of the stream. Replace the width and height placeholders in the URL (`{width}x{height}`) with the size of the image you want, in pixels. */
    thumbnail_url: string;
    /** The IDs of the tags applied to the stream. To get a tag’s name, use the [Get All Stream Tags](https://dev.twitch.tv/docs/api/reference#get-all-stream-tags) endpoint. For a list of possible tags, see [List of All Tags](https://www.twitch.tv/directory/all/tags). */
    tag_ids: string;
    /** A Boolean value that indicates whether the stream is meant for mature audiences. */
    is_mature: boolean;
  }[];
  /** The information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Set the request’s _after_ or _before_ query parameter to this value depending on whether you’re paging forwards or backwards. */
    cursor: string;
  };
}

export interface GetFollowedStreamsParams {
  /** The ID of the user whose list of followed streams you want to get. This ID must match the user ID in the access token. */
  user_id: string;
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 100. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetFollowedStreamsResponse {
  /** The list of live streams of broadcasters that the specified user follows. The list is in descending order by the number of viewers watching the stream. Because viewers come and go during a stream, it’s possible to find duplicate or missing streams in the list as you page through the results. The list is empty if none of the followed broadcasters are streaming live. */
  data: {
    /** An ID that identifies the stream. You can use this ID later to look up the video on demand (VOD). */
    id: string;
    /** The ID of the user that’s broadcasting the stream. */
    user_id: string;
    /** The user’s login name. */
    user_login: string;
    /** The user’s display name. */
    user_name: string;
    /** The ID of the category or game being played. */
    game_id: string;
    /** The ID of the category or game being played. */
    game_name: string;
    /**
     * The type of stream. Possible values are:  
     *   
     * * live
     *   
     * If an error occurs, this field is set to an empty string.
     */
    type: 'live';
    /** The stream’s title. Is an empty string if not set. */
    title: string;
    /** The number of users watching the stream. */
    viewer_count: number;
    /** The UTC date and time (in RFC3339 format) of when the broadcast began. */
    started_at: string;
    /** The language that the stream uses. This is an ISO 639-1 two-letter language code or _other_ if the stream uses a language not in the list of [supported stream languages](https://help.twitch.tv/s/article/languages-on-twitch#streamlang). */
    language: string;
    /** A URL to an image of a frame from the last 5 minutes of the stream. Replace the width and height placeholders in the URL (`{width}x{height}`) with the size of the image you want, in pixels. */
    thumbnail_url: string;
    /** The IDs of the tags applied to the stream. To get a tag’s name, use the [Get All Stream Tags](https://dev.twitch.tv/docs/api/reference#get-all-stream-tags) endpoint. For a list of possible tags, see [List of All Tags](https://www.twitch.tv/directory/all/tags). */
    tag_ids: string;
    /** A Boolean value that indicates whether the stream is meant for mature audiences. */
    is_mature: boolean;
  }[];
  /** The information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Set the request’s _after_ query parameter to this value. */
    cursor: string;
  };
}

export interface CreateStreamMarkerBody {
  /** The ID of the broadcaster that’s streaming content. This ID must match the user ID in the access token or the user in the access token must be one of the broadcaster’s editors. */
  user_id: string;
  /** A short description of the marker to help the user remember why they marked the location. The maximum length of the description is 140 characters. */
  description?: string;
}

export interface CreateStreamMarkerResponse {
  /** A list that contains the single marker that you added. */
  data: {
    /** An ID that identifies this marker. */
    id: {
      /** The UTC date and time (in RFC3339 format) of when the user created the marker. */
      created_at: string;
      /** The relative offset (in seconds) of the marker from the beginning of the stream. */
      position_seconds: number;
      /** A description that the user gave the marker to help them remember why they marked the location. */
      description: string;
    };
  }[];
}

export interface GetStreamMarkersResponse {
  /** The list of markers grouped by the user that created the marks. */
  data: {
    /** The ID of the user that created the marker. */
    user_id: string;
    /** The user’s display name. */
    user_name: string;
    /** The user’s login name. */
    user_login: string;
    /** A list of videos that contain markers. The list contains a single video. */
    videos: Object[];
    /** An ID that identifies this video. */
    video_id: string;
    /** The list of markers in this video. The list in ascending order by when the marker was created. */
    markers: {
      /** An ID that identifies this marker. */
      id: string;
      /** The UTC date and time (in RFC3339 format) of when the user created the marker. */
      created_at: string;
      /** The description that the user gave the marker to help them remember why they marked the location. Is an empty string if the user didn’t provide one. */
      description: string;
      /** The relative offset (in seconds) of the marker from the beginning of the stream. */
      position_seconds: number;
      /** A URL to the video. */
      url: string;
    }[];
  }[];
  /** The information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Set the request’s _after_ or _before_ query parameter to this value depending on whether you’re paging forwards or backwards. */
    cursor: string;
  };
}

export interface GetBroadcasterSubscriptionsResponse {
  /** The list of users that subscribe to the broadcaster. The list is empty if the broadcaster has no subscribers. */
  data: {
    /** An ID that identifies the broadcaster. */
    broadcaster_id: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The ID of the user that gifted the subscription to the user. Is an empty string if `is_gift` is **false**. */
    gifter_id: string;
    /** The gifter’s login name. Is an empty string if `is_gift` is **false**. */
    gifter_login: string;
    /** The gifter’s display name. Is an empty string if `is_gift` is **false**. */
    gifter_name: string;
    /** A Boolean value that determines whether the subscription is a gift subscription. Is **true** if the subscription was gifted. */
    is_gift: boolean;
    /** The name of the subscription. */
    plan_name: string;
    /**
     * The type of subscription. Possible values are:  
     *   
     * * 1000 — Tier 1
     * * 2000 — Tier 2
     * * 3000 — Tier 3
     */
    tier: '1000' | '2000' | '3000';
    /** An ID that identifies the subscribing user. */
    user_id: string;
    /** The user’s display name. */
    user_name: string;
    /** The user’s login name. */
    user_login: string;
  }[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next or previous page of results. Use the cursor to set the request’s _after_ or _before_ query parameter depending on whether you’re paging forwards or backwards. */
    cursor: string;
  };
  /** The current number of subscriber points earned by this broadcaster. Points are based on the subscription tier of each user that subscribes to this broadcaster. For example, a Tier 1 subscription is worth 1 point, Tier 2 is worth 2 points, and Tier 3 is worth 6 points. The number of points determines the number of emote slots that are unlocked for the broadcaster (see [Subscriber Emote Slots](https://help.twitch.tv/s/article/subscriber-emote-guide#emoteslots)). */
  points: number;
  /** The total number of users that subscribe to this broadcaster. */
  total: number;
}

export interface CheckUserSubscriptionParams {
  /** The ID of a partner or affiliate broadcaster. */
  broadcaster_id: string;
  /** The ID of the user that you’re checking to see whether they subscribe to the broadcaster in broadcaster_id. This ID must match the user ID in the access Token. */
  user_id: string;
}

export interface CheckUserSubscriptionResponse {
  /** A list that contains a single object with information about the user’s subscription. */
  data: {
    /** An ID that identifies the broadcaster. */
    broadcaster_id: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** The ID of the user that gifted the subscription. The object includes this field only if `is_gift` is **true**. */
    gifter_id: string;
    /** The gifter’s login name. The object includes this field only if `is_gift` is **true**. */
    gifter_login: string;
    /** The gifter’s display name. The object includes this field only if `is_gift` is **true**. */
    gifter_name: string;
    /** A Boolean value that determines whether the subscription is a gift subscription. Is **true** if the subscription was gifted. */
    is_gift: boolean;
    /**
     * The type of subscription. Possible values are:  
     *   
     * * 1000 — Tier 1
     * * 2000 — Tier 2
     * * 3000 — Tier 3
     */
    tier: '1000' | '2000' | '3000';
  }[];
}

export interface GetAllStreamTagsParams {
  /** The ID of the tag to get. Used to filter the list of tags. To specify more than one tag, include the _tag\_id_ parameter for each tag to get. For example, `tag_id=1234&tag_id=5678`. The maximum number of IDs you may specify is 100\. Ignores invalid IDs but not duplicate IDs. */
  tag_id?: string | string[];
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100\. The default is 20. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetAllStreamTagsResponse {
  /** The list of stream tags that the broadcaster can apply to their channel. */
  data: {
    /** An ID that identifies this tag. */
    tag_id: string;
    /** A Boolean value that determines whether the tag is an automatic tag. An automatic tag is one that Twitch adds to the stream. Broadcasters may not add automatic tags to their channel. The value is **true** if the tag is an automatic tag; otherwise, **false**. */
    is_auto: boolean;
    /** A dictionary that contains the localized names of the tag. The key is in the form, <locale>-<country/region>. For example, en-us. The value is the localized name. */
    localization_names: Record<string, string>;
    /** A dictionary that contains the localized descriptions of the tag. The key is in the form, <locale>-<country/region>. For example, en-us. The value is the localized description. */
    localization_descriptions: Record<string, string>;
  }[];
  /** The information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Set the request’s _after_ query parameter to this value to page forwards through the results. */
    cursor: string;
  };
}

export interface GetStreamTagsParams {
  /** The ID of the broadcaster whose stream tags you want to get. */
  broadcaster_id: string;
}

export interface GetStreamTagsResponse {
  /** The list of stream tags. The list is empty if the broadcaster or Twitch hasn’t added tags to the broadcaster’s channel. */
  data: {
    /** An ID that identifies this tag. */
    tag_id: string;
    /** A Boolean value that determines whether the tag is an automatic tag. An automatic tag is one that Twitch adds to the stream. Broadcasters may not add automatic tags to their channel. The value is **true** if the tag is an automatic tag; otherwise, **false**. */
    is_auto: boolean;
    /** A dictionary that contains the localized names of the tag. The key is in the form, <locale>-<coutry/region>. For example, en-us. The value is the localized name. */
    localization_names: Record<string, string>;
    /** A dictionary that contains the localized descriptions of the tag. The key is in the form, <locale>-<coutry/region>. For example, en-us. The value is the localized description. */
    localization_descriptions: Record<string, string>;
  }[];
}

export interface ReplaceStreamTagsBody {
  /**
   * A list of IDs that identify the tags to apply to the channel. You may specify a maximum of five tags.  
   *   
   * To remove all tags from the channel, set `tag_ids` to an empty array.
   */
  tag_ids?: string[];
}

export interface ReplaceStreamTagsParams {
  /** The ID of the broadcaster that owns the channel to apply the tags to. This ID must match the user ID in the access token. */
  broadcaster_id: string;
}

export interface GetChannelTeamsParams {
  /** The ID of the broadcaster whose teams you want to get. */
  broadcaster_id: string;
}

export interface GetChannelTeamsResponse {
  /** The list of teams that the broadcaster is a member of. */
  data: {
    /** An ID that identifies the broadcaster. */
    broadcaster_id: string;
    /** The broadcaster’s login name. */
    broadcaster_login: string;
    /** The broadcaster’s display name. */
    broadcaster_name: string;
    /** A URL to the team’s background image. */
    background_image_url: string;
    /** A URL to the team’s banner. */
    banner: string;
    /** The UTC date and time (in RFC3339 format) of when the team was created. */
    created_at: string;
    /** The UTC date and time (in RFC3339 format) of the last time the team was updated. */
    updated_at: string;
    /** The team’s description. The description may contain formatting such as Markdown, HTML, newline (\\n) characters, etc. */
    info: string;
    /** A URL to a thumbnail image of the team’s logo. */
    thumbnail_url: string;
    /** The team’s name. */
    team_name: string;
    /** The team’s display name. */
    team_display_name: string;
    /** An ID that identifies the team. */
    id: string;
  }[];
}

export interface GetTeamsParams {
  /** The name of the team to get. This parameter and the _id_ parameter are mutually exclusive; you must specify the team’s name or ID but not both. */
  name?: string;
  /** The ID of the team to get. This parameter and the _name_ parameter are mutually exclusive; you must specify the team’s name or ID but not both. */
  id?: string;
}

export interface GetTeamsResponse {
  /** A list that contains the single team that you requested. */
  data: {
    /** The list of team members. */
    users: {
      /** An ID that identifies the team member. */
      user_id: string;
      /** The team member’s login name. */
      user_login: string;
      /** The team member’s display name. */
      user_name: string;
    }[];
    /** A URL to the team’s background image. */
    background_image_url: string;
    /** A URL to the team’s banner. */
    banner: string;
    /** The UTC date and time (in RFC3339 format) of when the team was created. */
    created_at: string;
    /** The UTC date and time (in RFC3339 format) of the last time the team was updated. */
    updated_at: string;
    /** The team’s description. The description may contain formatting such as Markdown, HTML, newline (\\n) characters, etc. */
    info: string;
    /** A URL to a thumbnail image of the team’s logo. */
    thumbnail_url: string;
    /** The team’s name. */
    team_name: string;
    /** The team’s display name. */
    team_display_name: string;
    /** An ID that identifies the team. */
    id: string;
  }[];
}

export interface GetUsersParams {
  /** The ID of the user to get. To specify more than one user, include the _id_ parameter for each user to get. For example, `id=1234&id=5678`. The maximum number of IDs you may specify is 100. */
  id?: string | string[];
  /** The login name of the user to get. To specify more than one user, include the _login_ parameter for each user to get. For example, `login=foo&login=bar`. The maximum number of login names you may specify is 100. */
  login?: string | string[];
}

export interface GetUsersResponse {
  /** The list of users. */
  data: {
    /** An ID that identifies the user. */
    id: string;
    /** The user’s login name. */
    login: string;
    /** The user’s display name. */
    display_name: string;
    /**
     * The type of user. Possible values are:  
     *   
     * * admin — Twitch administrator
     * * global\_mod
     * * staff — Twitch staff
     * * "" — Normal user
     */
    type: 'admin' | 'global_mod' | 'staff' | '';
    /**
     * The type of broadcaster. Possible values are:  
     *   
     * * affiliate — An [affiliate broadcaster](https://help.twitch.tv/s/article/joining-the-affiliate-program target=)
     * * partner — A [partner broadcaster](https://help.twitch.tv/s/article/partner-program-overview)
     * * "" — A normal broadcaster
     */
    broadcaster_type: 'affiliate' | 'partner' | '';
    /** The user’s description of their channel. */
    description: string;
    /** A URL to the user’s profile image. */
    profile_image_url: string;
    /** A URL to the user’s offline image. */
    offline_image_url: string;
    /**
     * The number of times the user’s channel has been viewed.  
     *   
     * **NOTE**: This field has been deprecated (see [Get Users API endpoint – “view\_count” deprecation](https://discuss.dev.twitch.tv/t/get-users-api-endpoint-view-count-deprecation/37777)). Any data in this field is not valid and should not be used.
     */
    view_count: number;
    /**
     * The user’s verified email address. The object includes this field only if the user access token includes the **user:read:email** scope.  
     *   
     * If the request contains more than one user, only the user associated with the access token that provided consent will include an email address — the email address for all other users will be empty.
     */
    email: string;
    /** The UTC date and time that the user’s account was created. The timestamp is in RFC3339 format. */
    created_at: string;
  }[];
}

export interface UpdateUserParams {
  /**
   * The string to update the channel’s description to. The description is limited to a maximum of 300 characters.  
   *   
   * To remove the description, specify this parameter but don’t set it’s value (for example, `?description=`).
   */
  description?: string;
}

export interface UpdateUserResponse {
  /** A list contains the single user that you updated. */
  data: {
    /** An ID that identifies the user. */
    id: string;
    /** The user’s login name. */
    login: string;
    /** The user’s display name. */
    display_name: string;
    /**
     * The type of user. Possible values are:  
     *   
     * * admin — Twitch administrator
     * * global\_mod
     * * staff — Twitch staff
     * * "" — Normal user
     */
    type: 'admin' | 'global_mod' | 'staff' | '';
    /**
     * The type of broadcaster. Possible values are:  
     *   
     * * affiliate — An [affiliate broadcaster](https://help.twitch.tv/s/article/joining-the-affiliate-program target=)
     * * partner — A [partner broadcaster](https://help.twitch.tv/s/article/partner-program-overview)
     * * "" — A normal broadcaster
     */
    broadcaster_type: 'affiliate' | 'partner' | '';
    /** The user’s description of their channel. */
    description: string;
    /** A URL to the user’s profile image. */
    profile_image_url: string;
    /** A URL to the user’s offline image. */
    offline_image_url: string;
    /**
     * The number of times the user’s channel has been viewed.  
     *   
     * **NOTE**: This field has been deprecated (see [Get Users API endpoint – “view\_count” deprecation](https://discuss.dev.twitch.tv/t/get-users-api-endpoint-view-count-deprecation/37777)). Any data in this field is not valid and should not be used.
     */
    view_count: number;
    /**
     * The user’s verified email address. The object includes this field only if the user access token includes the **user:read:email** scope.  
     *   
     * If the request contains more than one user, only the user associated with the access token that provided consent will include an email address — the email address for all other users will be empty.
     */
    email: string;
    /** The UTC date and time that the user’s account was created. The timestamp is in RFC3339 format. */
    created_at: string;
  }[];
}

export interface GetUsersFollowsParams {
  /**
   * A user ID. Specify this parameter to discover the users that this user is following.  
   *   
   * You must specify this parameter, the _to\_id_ parameter, or both.
   */
  from_id?: string;
  /**
   * A user ID. Specify this parameter to discover the users who are following this user.  
   *   
   * You must specify this parameter, the _from\_id_ parameter, or both.
   */
  to_id?: string;
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100\. The default is 20. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetUsersFollowsResponse {
  /**
   * The number of items in the `data` field.  
   *   
   * * If the request includes only _from\_id_, this is the total number of followed users.
   * * If the request includes only _to\_id_, this is the total number of followers.
   * * If the request specifies both _from\_id_ and _to\_id_, the total is 1 if the "from" user follows the "to" user; otherwise, the total is 0.
   */
  total: number;
  /** The list of follower-followee relationship information. The list is in descending order by when the follow occurred (most recent follow first). */
  data: {
    /** The ID of the user that’s following the user in `to_id`. */
    from_id: string;
    /** The follower’s login name. */
    from_login: string;
    /** The follower’s display name. */
    from_name: string;
    /** The ID of the user that’s being followed by the user in `from_id`. */
    to_id: string;
    /** The login name of the user that’s being followed. */
    to_login: string;
    /** The display name of the user that’s being followed. */
    to_name: string;
    /** The UTC date and time (in RFC3339 format) of when the user in `from_id` began following the user in `to_id`. */
    followed_at: string;
  }[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ query parameter. */
    cursor: string;
  };
}

export interface GetUserBlockListParams {
  /** The ID of the broadcaster whose list of blocked users you want to get. */
  broadcaster_id: string;
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100\. The default is 20. */
  first?: number;
  /** The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  after?: string;
}

export interface GetUserBlockListResponse {
  /** The list of blocked users. The list is in descending order by when the user was blocked. */
  data: {
    /** An ID that identifies the blocked user. */
    user_id: string;
    /** The blocked user’s login name. */
    user_login: string;
    /** The blocked user’s display name. */
    display_name: string;
  }[];
}

export interface BlockUserParams {
  /** The ID of the user to block. The API ignores the request if the broadcaster has already blocked the user. */
  target_user_id: string;
  /**
   * The location where the harassment took place that is causing the brodcaster to block the user. Possible values are:  
   *   
   * * chat
   * * whisper
   *   
   * .
   */
  source_context?: 'chat' | 'whisper';
  /**
   * The reason that the broadcaster is blocking the user. Possible values are:  
   *   
   * * harassment
   * * spam
   * * other
   */
  reason?: 'harassment' | 'spam' | 'other';
}

export interface UnblockUserParams {
  /** The ID of the user to remove from the broadcaster’s list of blocked users. The API ignores the request if the broadcaster hasn’t blocked the user. */
  target_user_id: string;
}

export interface GetUserExtensionsResponse {
  /** The list of extensions that the user has installed. */
  data: {
    /** An ID that identifies the extension. */
    id: string;
    /** The extension’s version. */
    version: string;
    /** The extension’s name. */
    name: string;
    /** A Boolean value that determines whether the extension is configured and can be activated. Is **true** if the extension is configured and can be activated. */
    can_activate: boolean;
    /**
     * The extension types that you can activate for this extension. Possible values are:  
     *   
     * * component
     * * mobile
     * * overlay
     * * panel
     */
    type: 'component' | 'mobile' | 'overlay' | 'panel'[];
  }[];
}

export interface GetUserActiveExtensionsParams {
  /**
   * The ID of the broadcaster whose active extensions you want to get.  
   *   
   * This parameter is required if you specify an app access token and is optional if you specify a user access token. If you specify a user access token and don’t specify this parameter, the API uses the user ID from the access token.
   */
  user_id?: string;
}

export interface GetUserActiveExtensionsResponse {
  /** The active extensions that the broadcaster has installed. */
  data: {
    /** A dictionary that contains the data for a panel extension. The dictionary’s key is a sequential number beginning with 1\. The following fields contain the panel’s data for each key. */
    panel: {
      /** A Boolean value that determines the extension’s activation state. If **false**, the user has not configured this panel extension. */
      active: boolean;
      /** An ID that identifies the extension. */
      id: string;
      /** The extension’s version. */
      version: string;
      /** The extension’s name. */
      name: string;
    };
    /** A dictionary that contains the data for a video-overlay extension. The dictionary’s key is a sequential number beginning with 1\. The following fields contain the overlay’s data for each key. */
    overlay: {
      /** A Boolean value that determines the extension’s activation state. If **false**, the user has not configured this overlay extension. */
      active: boolean;
      /** An ID that identifies the extension. */
      id: string;
      /** The extension’s version. */
      version: string;
      /** The extension’s name. */
      name: string;
    };
    /** A dictionary that contains the data for a video-component extension. The dictionary’s key is a sequential number beginning with 1\. The following fields contain the component’s data for each key. */
    component: {
      /** A Boolean value that determines the extension’s activation state. If **false**, the user has not configured this component extension. */
      active: boolean;
      /** An ID that identifies the extension. */
      id: string;
      /** The extension’s version. */
      version: string;
      /** The extension’s name. */
      name: string;
      /** The x-coordinate where the extension is placed. */
      x: number;
      /** The y-coordinate where the extension is placed. */
      y: number;
    };
  };
}

export interface UpdateUserExtensionsBody {
  /**
   * The extensions to update. The `data` field is a dictionary of extension types. The dictionary’s possible keys are: panel, overlay, or component. The key’s value is a dictionary of extensions.  
   *   
   * For the extension’s dictionary, the key is a sequential number beginning with 1\. For panel and overlay extensions, the key’s value is an object that contains the following fields: `active` (true/false), `id` (the extension’s ID), and `version` (the extension’s version).  
   *   
   * For component extensions, the key’s value includes the above fields plus the `x` and `y` fields, which identify the coordinate where the extension is placed.
   */
  data: Record<string, Record<string, any>>;
}

export interface UpdateUserExtensionsResponse {
  /** The extensions that the broadcaster updated. */
  data: {
    /** A dictionary that contains the data for a panel extension. The dictionary’s key is a sequential number beginning with 1\. The following fields contain the panel’s data for each key. */
    panel: {
      /** A Boolean value that determines the extension’s activation state. If **false**, the user has not configured a panel extension. */
      active: boolean;
      /** An ID that identifies the extension. */
      id: string;
      /** The extension’s version. */
      version: string;
      /** The extension’s name. */
      name: string;
    };
    /** A dictionary that contains the data for a video-overlay extension. The dictionary’s key is a sequential number beginning with 1\. The following fields contain the overlay’s data for each key. */
    overlay: {
      /** A Boolean value that determines the extension’s activation state. If **false**, the user has not configured an overlay extension. */
      active: boolean;
      /** An ID that identifies the extension. */
      id: string;
      /** The extension’s version. */
      version: string;
      /** The extension’s name. */
      name: string;
    };
    /** A dictionary that contains the data for a video-component extension. The dictionary’s key is a sequential number beginning with 1\. The following fields contain the component’s data for each key. */
    component: {
      /** A Boolean value that determines the extension’s activation state. If **false**, the user has not configured a component extension. */
      active: boolean;
      /** An ID that identifies the extension. */
      id: string;
      /** The extension’s version. */
      version: string;
      /** The extension’s name. */
      name: string;
      /** The x-coordinate where the extension is placed. */
      x: number;
      /** The y-coordinate where the extension is placed. */
      y: number;
    };
  };
}

export interface GetVideosParams {
  /**
   * A list of IDs that identify the videos you want to get. To get more than one video, include this parameter for each video you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 100 IDs. The endpoint ignores duplicate IDs and IDs that weren’t found (if there’s at least one valid ID).  
   *   
   * The _id_, _user\_id_, and _game\_id_ parameters are mutually exclusive.
   */
  id?: string | string[];
  /**
   * The ID of the user whose list of videos you want to get.  
   *   
   * The _id_, _user\_id_, and _game\_id_ parameters are mutually exclusive.
   */
  user_id?: string;
  /**
   * A category or game ID. The response contains a maximum of 500 videos that show this content. To get category/game IDs, use the [Search Categories](https://dev.twitch.tv/docs/api/reference#search-categories) endpoint.  
   *   
   * The _id_, _user\_id_, and _game\_id_ parameters are mutually exclusive.
   */
  game_id?: string;
  /**
   * A filter used to filter the list of videos by the language that the video owner broadcasts in. For example, to get videos that were broadcast in German, set this parameter to the ISO 639-1 two-letter code for German (i.e., DE). For a list of supported languages, see [Supported Stream Language](https://help.twitch.tv/s/article/languages-on-twitch#streamlang). If the language is not supported, use “other.”  
   *   
   * Specify this parameter only if you specify the _game\_id_ query parameter.
   */
  language?: string;
  /**
   * A filter used to filter the list of videos by when they were published. For example, videos published in the last week. Possible values are:  
   *   
   * * all
   * * day
   * * month
   * * week
   *   
   * The default is “all,” which returns videos published in all periods.  
   *   
   * Specify this parameter only if you specify the _game\_id_ or _user\_id_ query parameter.
   */
  period?: 'all' | 'day' | 'month' | 'week';
  /**
   * The order to sort the returned videos in. Possible values are:  
   *   
   * * time — Sort the results in descending order by when they were created (i.e., latest video first).
   * * trending — Sort the results in descending order by biggest gains in viewership (i.e., highest trending video first).
   * * views — Sort the results in descending order by most views (i.e., highest number of views first).
   *   
   * The default is “time.”  
   *   
   * Specify this parameter only if you specify the _game\_id_ or _user\_id_ query parameter.
   */
  sort?: 'time' | 'trending' | 'views';
  /**
   * A filter used to filter the list of videos by the video’s type. Possible case-sensitive values are:  
   *   
   * * all
   * * archive — On-demand videos (VODs) of past streams.
   * * highlight — Highlight reels of past streams.
   * * upload — External videos that the broadcaster uploaded using the Video Producer.
   *   
   * The default is “all,” which returns all video types.  
   *   
   * Specify this parameter only if you specify the _game\_id_ or _user\_id_ query parameter.
   */
  type?: 'all' | 'archive' | 'highlight' | 'upload';
  /**
   * The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100\. The default is 20.  
   *   
   * Specify this parameter only if you specify the _game\_id_ or _user\_id_ query parameter.
   */
  first?: string;
  /**
   * The cursor used to get the next page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)  
   *   
   * Specify this parameter only if you specify the _user\_id_ query parameter.
   */
  after?: string;
  /**
   * The cursor used to get the previous page of results. The **Pagination** object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)  
   *   
   * Specify this parameter only if you specify the _user\_id_ query parameter.
   */
  before?: string;
}

export interface GetVideosResponse {
  /** The list of published videos that match the filter criteria. */
  data: {
    /** An ID that identifies the video. */
    id: string;
    /** The ID of the stream that the video originated from if the video’s type is “archive;” otherwise, **null**. */
    stream_id: string;
    /** The ID of the broadcaster that owns the video. */
    user_id: string;
    /** The broadcaster’s login name. */
    user_login: string;
    /** The broadcaster’s display name. */
    user_name: string;
    /** The video’s title. */
    title: string;
    /** The video’s description. */
    description: string;
    /** The date and time, in UTC, of when the video was created. The timestamp is in RFC3339 format. */
    created_at: string;
    /** The date and time, in UTC, of when the video was published. The timestamp is in RFC3339 format. */
    published_at: string;
    /** The video’s URL. */
    url: string;
    /** A URL to a thumbnail image of the video. Before using the URL, you must replace the `%{width}` and `%{height}` placeholders with the width and height of the thumbnail you want returned. Specify the width and height in pixels. Because the CDN preserves the thumbnail’s ratio, the thumbnail may not be the exact size you requested. */
    thumbnail_url: string;
    /** The video’s viewable state. Always set to **public**. */
    viewable: string;
    /** The number of times that users have watched the video. */
    view_count: number;
    /** The ISO 639-1 two-letter language code that the video was broadcast in. For example, the language code is DE if the video was broadcast in German. For a list of supported languages, see [Supported Stream Language](https://help.twitch.tv/s/article/languages-on-twitch#streamlang). The language value is “other” if the video was broadcast in a language not in the list of supported languages. */
    language: string;
    /**
     * The video’s type. Possible values are:  
     *   
     * * archive — An on-demand video (VOD) of one of the broadcaster's past streams.
     * * highlight — A highlight reel of one of the broadcaster's past streams. See [Creating Highlights](https://help.twitch.tv/s/article/creating-highlights-and-stream-markers).
     * * upload — A video that the broadcaster uploaded to their video library. See Upload under [Video Producer](https://help.twitch.tv/s/article/video-on-demand?language=en%5FUS#videoproducer).
     */
    type: 'archive' | 'highlight' | 'upload';
    /** The video’s length in ISO 8601 duration format. For example, 3m21s represents 3 minutes, 21 seconds. */
    duration: string;
    /** The segments that Twitch Audio Recognition muted; otherwise, **null**. */
    muted_segments: {
      /** The duration of the muted segment, in seconds. */
      duration: number;
      /** The offset, in seconds, from the beginning of the video to where the muted segment begins. */
      offset: number;
    }[];
  }[];
  /** Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: {
    /** The cursor used to get the next page of results. Use the cursor to set the request’s _after_ or _before_ query parameter depending on whether you’re paging forwards or backwards through the results. */
    cursor: string;
  };
}

export interface DeleteVideosParams {
  /**
   * The list of videos to delete. To specify more than one video, include the _id_ parameter for each video to delete. For example, `id=1234&id=5678`. You can delete a maximum of 5 videos per request. Ignores invalid video IDs.  
   *   
   * If the user doesn’t have permission to delete one of the videos in the list, none of the videos are deleted.
   */
  id: string | string[];
}

export interface DeleteVideosResponse {
  /** The list of IDs of the videos that were deleted. */
  data: string[];
}

export interface SendWhisperParams {
  /** The ID of the user sending the whisper. This user must have a verified phone number. This ID must match the user ID in the user access token. */
  from_user_id: string;
  /** The ID of the user to receive the whisper. */
  to_user_id: string;
}

