import type {
  StartCommercialResponse,
  StartCommercialBody,
  GetExtensionAnalyticsResponse,
  GetExtensionAnalyticsParams,
  GetGameAnalyticsResponse,
  GetGameAnalyticsParams,
  GetBitsLeaderboardResponse,
  GetBitsLeaderboardParams,
  GetCheermotesResponse,
  GetCheermotesParams,
  GetExtensionTransactionsResponse,
  GetExtensionTransactionsParams,
  GetChannelInformationResponse,
  GetChannelInformationParams,
  ModifyChannelInformationParams,
  ModifyChannelInformationBody,
  GetChannelEditorsResponse,
  GetChannelEditorsParams,
  CreateCustomRewardsResponse,
  CreateCustomRewardsParams,
  CreateCustomRewardsBody,
  DeleteCustomRewardParams,
  GetCustomRewardResponse,
  GetCustomRewardParams,
  GetCustomRewardRedemptionResponse,
  GetCustomRewardRedemptionParams,
  UpdateCustomRewardResponse,
  UpdateCustomRewardParams,
  UpdateCustomRewardBody,
  UpdateRedemptionStatusResponse,
  UpdateRedemptionStatusParams,
  UpdateRedemptionStatusBody,
  GetCharityCampaignResponse,
  GetCharityCampaignParams,
  GetCharityCampaignDonationsResponse,
  GetCharityCampaignDonationsParams,
  GetChattersResponse,
  GetChattersParams,
  GetChannelEmotesResponse,
  GetChannelEmotesParams,
  GetGlobalEmotesResponse,
  GetEmoteSetsResponse,
  GetEmoteSetsParams,
  GetChannelChatBadgesResponse,
  GetGlobalChatBadgesResponse,
  GetChatSettingsResponse,
  GetChatSettingsParams,
  UpdateChatSettingsResponse,
  UpdateChatSettingsParams,
  UpdateChatSettingsBody,
  SendChatAnnouncementParams,
  SendChatAnnouncementBody,
  GetUserChatColorResponse,
  GetUserChatColorParams,
  UpdateUserChatColorParams,
  CreateClipResponse,
  CreateClipParams,
  GetClipsResponse,
  GetClipsParams,
  GetCodeStatusResponse,
  GetCodeStatusParams,
  GetDropsEntitlementsResponse,
  GetDropsEntitlementsParams,
  UpdateDropsEntitlementsResponse,
  RedeemCodeResponse,
  RedeemCodeParams,
  GetExtensionConfigurationSegmentResponse,
  GetExtensionConfigurationSegmentParams,
  SetExtensionConfigurationSegmentBody,
  SetExtensionRequiredConfigurationParams,
  SetExtensionRequiredConfigurationBody,
  SendExtensionPubSubMessageBody,
  GetExtensionLiveChannelsResponse,
  GetExtensionLiveChannelsParams,
  GetExtensionSecretsResponse,
  CreateExtensionSecretResponse,
  CreateExtensionSecretParams,
  SendExtensionChatMessageParams,
  SendExtensionChatMessageBody,
  GetExtensionsResponse,
  GetExtensionsParams,
  GetReleasedExtensionsResponse,
  GetReleasedExtensionsParams,
  GetExtensionBitsProductsResponse,
  GetExtensionBitsProductsParams,
  UpdateExtensionBitsProductResponse,
  CreateEventSubSubscriptionResponse,
  CreateEventSubSubscriptionBody,
  DeleteEventSubSubscriptionParams,
  GetEventSubSubscriptionsResponse,
  GetEventSubSubscriptionsParams,
  GetTopGamesResponse,
  GetTopGamesParams,
  GetGamesResponse,
  GetGamesParams,
  GetCreatorGoalsResponse,
  GetCreatorGoalsParams,
  GetHypeTrainEventsResponse,
  GetHypeTrainEventsParams,
  CheckAutoModStatusResponse,
  CheckAutoModStatusParams,
  CheckAutoModStatusBody,
  ManageHeldAutoModMessagesBody,
  GetAutoModSettingsResponse,
  GetAutoModSettingsParams,
  UpdateAutoModSettingsResponse,
  UpdateAutoModSettingsParams,
  UpdateAutoModSettingsBody,
  GetBannedUsersResponse,
  GetBannedUsersParams,
  BanUserResponse,
  BanUserParams,
  BanUserBody,
  UnbanUserParams,
  GetBlockedTermsResponse,
  GetBlockedTermsParams,
  AddBlockedTermResponse,
  AddBlockedTermParams,
  AddBlockedTermBody,
  RemoveBlockedTermParams,
  DeleteChatMessagesParams,
  GetModeratorsResponse,
  GetModeratorsParams,
  AddChannelModeratorParams,
  RemoveChannelModeratorParams,
  GetVIPsResponse,
  GetVIPsParams,
  AddChannelVIPParams,
  RemoveChannelVIPParams,
  GetPollsResponse,
  GetPollsParams,
  CreatePollResponse,
  CreatePollBody,
  EndPollResponse,
  EndPollBody,
  GetPredictionsResponse,
  GetPredictionsParams,
  CreatePredictionResponse,
  CreatePredictionBody,
  EndPredictionResponse,
  EndPredictionBody,
  StartRaidResponse,
  StartRaidParams,
  CancelRaidParams,
  GetChannelStreamScheduleResponse,
  GetChannelStreamScheduleParams,
  GetChanneliCalendarParams,
  UpdateChannelStreamScheduleParams,
  CreateChannelStreamScheduleSegmentResponse,
  CreateChannelStreamScheduleSegmentParams,
  CreateChannelStreamScheduleSegmentBody,
  UpdateChannelStreamScheduleSegmentResponse,
  UpdateChannelStreamScheduleSegmentParams,
  UpdateChannelStreamScheduleSegmentBody,
  DeleteChannelStreamScheduleSegmentParams,
  SearchCategoriesResponse,
  SearchCategoriesParams,
  SearchChannelsResponse,
  SearchChannelsParams,
  GetSoundtrackCurrentTrackResponse,
  GetSoundtrackCurrentTrackParams,
  GetSoundtrackPlaylistResponse,
  GetSoundtrackPlaylistParams,
  GetSoundtrackPlaylistsResponse,
  GetSoundtrackPlaylistsParams,
  GetStreamKeyResponse,
  GetStreamKeyParams,
  GetStreamsResponse,
  GetStreamsParams,
  GetFollowedStreamsResponse,
  GetFollowedStreamsParams,
  CreateStreamMarkerResponse,
  CreateStreamMarkerBody,
  GetStreamMarkersResponse,
  GetBroadcasterSubscriptionsResponse,
  CheckUserSubscriptionResponse,
  CheckUserSubscriptionParams,
  GetAllStreamTagsResponse,
  GetAllStreamTagsParams,
  GetStreamTagsResponse,
  GetStreamTagsParams,
  ReplaceStreamTagsParams,
  ReplaceStreamTagsBody,
  GetChannelTeamsResponse,
  GetChannelTeamsParams,
  GetTeamsResponse,
  GetTeamsParams,
  GetUsersResponse,
  GetUsersParams,
  UpdateUserResponse,
  UpdateUserParams,
  GetUsersFollowsResponse,
  GetUsersFollowsParams,
  GetUserBlockListResponse,
  GetUserBlockListParams,
  BlockUserParams,
  UnblockUserParams,
  GetUserExtensionsResponse,
  GetUserActiveExtensionsResponse,
  GetUserActiveExtensionsParams,
  UpdateUserExtensionsResponse,
  UpdateUserExtensionsBody,
  GetVideosResponse,
  GetVideosParams,
  DeleteVideosResponse,
  DeleteVideosParams,
  SendWhisperParams,
} from './types';

export type ApiResponse<T> = Promise<{
  ok: boolean;
  status: number;
  data: T;
}>;

const getSearchParams = <T extends Record<string, any>>(
  params: T,
  possibleArrays: (keyof T)[] = [],
): string => {
  let searchParams: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (possibleArrays.includes(key) && Array.isArray(value)) {
      value.forEach((v) => searchParams.push(`${key}=${v}`));
    } else {
      searchParams.push(`${key}=${value}`);
    }
  }
  return searchParams.join('&');
};

const getApiResponse = async (response: Response) => ({
  ok: response.ok,
  status: response.status,
  data: await response.json(),
})

export type TwitchApiOptions = {
  accessToken?: string;
  clientId?: string;
};

export class TwitchApi {
  private _accessToken: string;
  private _clientId: string;

  constructor({ accessToken = '', clientId = '' }: TwitchApiOptions = {}) {
    this._accessToken = accessToken;
    this._clientId = clientId;
  }

  private getAuthHeaders(accessToken: string, clientId: string) {
    return {
      Authorization: `Bearer ${accessToken || this._accessToken}`,
      'Client-Id': clientId || this._clientId,
    };
  }

  ads = {
    /**
     * Starts a commercial on the specified channel. To start a commercial, the channel must be live.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **channel:edit:commercial** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/channels/commercial`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * This request starts a commercial.
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/channels/commercial' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
     * -H 'Content-Type: application/json' \
     * --data-raw '{
     *   "broadcaster_id": "41245072",
     *   "length": 60
     * }'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "length" : 60,
     *       "message" : "",
     *       "retry_after" : 480
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully started the commercial.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The _length_ query parameter is required.
     * * The ID in _broadcaster\_id_ is not valid.
     * * To start a commercial, the broadcaster must be streaming live.
     * * The broadcaster may not run another commercial until the cooldown period expires. The `retry_after` field in the previous start commercial response specifies the amount of time the broadcaster must wait between running commercials.
     *
     * ### 401 Unauthorized
     *
     * * The ID in `broadcaster_id` must match the user ID found in the request’s OAuth token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:edit:commercial** scope.
     * * The OAuth token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.
     *
     * ### 404 Not Found
     *
     * * The ID in `broadcaster_id` was not found.
     *
     * ### 429 Too Many Requests
     *
     * * The broadcaster may not run another commercial until the cooldown period expires. The `retry_after` field in the previous start commercial response specifies the amount of time the broadcaster must wait between running commercials.
     *
     * @see https://dev.twitch.tv/docs/api/reference#start-commercial
     */
    startCommercial: async (
      body: StartCommercialBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<StartCommercialResponse> => {
      const url = 'https://api.twitch.tv/helix/channels/commercial';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
  };
  analytics = {
    /**
     * Gets an analytics report for one or more extensions. The response contains the URLs used to download the reports (CSV files). [Learn More](https://dev.twitch.tv/docs/insights)
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **analytics:read:extensions** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/analytics/extensions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the URLs for all reports for all extensions of the authenticated client. The request was issued on June 1, 2018.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/analytics/extensions' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *    "data": [
     *       {
     *          "extension_id": "efgh",
     *          "URL": "https://twitch-piper-reports.s3-us-west-2.amazonaws.com/dynamic/LoL%20ADC...",
     *          "type": "overview_v2",
     *          "date_range": {
     *             "started_at": "2018-03-01T00:00:00Z",
     *             "ended_at": "2018-06-01T00:00:00Z"
     *          }
     *       },
     *       ...
     *    ],
     *    "pagination": {"cursor": "eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6NX19"}
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the broadcaster’s analytics reports.
     *
     * ### 400 Bad Request
     *
     * * The start and end dates are optional but if you specify one, you must specify the other.
     * * The end date must be equal to or later than the start date.
     * * The cursor specified in the _after_ query parameter is not valid.
     * * The resource supports only forward pagination (use the _after_ query parameter).
     * * The _first_ query parameter is outside the allowed range of values.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **analytics:read:extensions** scope.
     * * The OAuth token is not valid.
     * * The Client-Id header is required.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.
     *
     * ### 404 Not Found
     *
     * * The extension specified in the _extension\_id_ query parameter was not found.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-extension-analytics
     */
    getExtensionAnalytics: async (
      params: GetExtensionAnalyticsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetExtensionAnalyticsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/analytics/extensions?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets an analytics report for one or more games. The response contains the URLs used to download the reports (CSV files). [Learn more](https://dev.twitch.tv/docs/insights)
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **analytics:read:games** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/analytics/games`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the URL for a downloadable CSV report for game ID 493057, covering the period January 1, 2018 through March 1, 2018.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/analytics/games?game_id=493057&started_at=2018-01-01T00:00:00Z&ended_at=2018-03-01T00:00:00Z' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "game_id" : "493057",
     *       "URL" : "https://twitch-piper-reports.s3-us-west-2.amazonaws.com/games/66170/overview/15183...",
     *       "type" : "overview_v2",
     *       "date_range" : {
     *         "started_at" : "2018-01-01T00:00:00Z",
     *         "ended_at" : "2018-03-01T00:00:00Z"
     *       }
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ### Example Request
     *
     * Gets the first 5 URLs for all reports for all games of the authenticated client. The request was issued on June 14, 2018.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/analytics/games?first=5' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "game_id": "9821",
     *       "URL": "https://twitch-piper-reports.s3-us-west-2.amazonaws.com/games/9821/overview/152642...",
     *       "type" : "overview_v2",
     *       "date_range" : {
     *         "started_at" : "2018-03-13T00:00:00Z",
     *         "ended_at" : "2018-06-13T00:00:00Z"
     *       }
     *     },
     *     ...
     *   ],
     *   "pagination": {"cursor": "eyJiIjpudWxsLJxhIjoiIn0gf5"}
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the broadcaster’s analytics reports.
     *
     * ### 400 Bad Request
     *
     * * The start and end dates are optional but if you specify one, you must specify the other.
     * * The end date must be equal to or later than the start date.
     * * The cursor specified in the _after_ query parameter is not valid.
     * * The resource supports only forward pagination (use the _after_ query parameter).
     * * The _first_ query parameter is outside the allowed range of values.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **analytics:read:games** scope.
     * * The OAuth token is not valid.
     * * The Client-Id header is required.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.
     *
     * ### 404 Not Found
     *
     * * The game specified in the _game\_id_ query parameter was not found.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-game-analytics
     */
    getGameAnalytics: async (
      params: GetGameAnalyticsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetGameAnalyticsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/analytics/games?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  bits = {
    /**
     * Gets the Bits leaderboard for the authenticated broadcaster. The users are ranked by how much they’ve cheered.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **bits:read** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/bits/leaderboard`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets information about the authenticated broadcaster’s top two Bits leaderboard entries for the current week.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/bits/leaderboard?count=2&period=week' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "user_id": "158010205",
     *       "user_login": "tundracowboy",
     *       "user_name": "TundraCowboy",
     *       "rank": 1,
     *       "score": 12543
     *     },
     *     {
     *       "user_id": "7168163",
     *       "user_login": "topramens",
     *       "user_name": "Topramens",
     *       "rank": 2,
     *       "score": 6900
     *     }
     *   ],
     *   "date_range": {
     *     "started_at": "2018-02-05T08:00:00Z",
     *     "ended_at": "2018-02-12T08:00:00Z"
     *   },
     *   "total": 2
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the broadcaster’s Bits leaderboard.
     *
     * ### 400 Bad Request
     *
     * * The time period specified in the _period_ query parameter is not valid.
     * * The value in the _count_ query parameter is outside the range of allowed values.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a user access token.
     * * The user access token must include the the **bits:read** scope.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * ### 403 Forbidden
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-bits-leaderboard
     */
    getBitsLeaderboard: async (
      params: GetBitsLeaderboardParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetBitsLeaderboardResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/bits/leaderboard?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets a list of Cheermotes that users can use to cheer Bits in any Bits-enabled channel’s chat room. Cheermotes are animated emotes that viewers can assign Bits to.
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/bits/cheermotes`
     *
     * ## Examples
     *
     * ### Example Requests
     *
     * Gets a list of all global Cheermotes.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/bits/cheermotes' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
     *
     * ```
     *
     * Gets a list of all global Cheermotes and any Cheermotes that the broadcaster has uploaded.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/bits/cheermotes?broadcaster_id=41245072' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "prefix": "Cheer",
     *       "tiers": [
     *         {
     *           "min_bits": 1,
     *           "id": "1",
     *           "color": "#979797",
     *           "images": {
     *             "dark": {
     *               "animated": {
     *                 "1": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/1.gif",
     *                 "1.5": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/1.5.gif",
     *                 "2": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/2.gif",
     *                 "3": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/3.gif",
     *                 "4": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/4.gif"
     *               },
     *               "static": {
     *                 "1": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/static/1/1.png",
     *                 "1.5": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/static/1/1.5.png",
     *                 "2": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/static/1/2.png",
     *                 "3": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/static/1/3.png",
     *                 "4": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/static/1/4.png"
     *               }
     *             },
     *             "light": {
     *               "animated": {
     *                 "1": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/animated/1/1.gif",
     *                 "1.5": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/animated/1/1.5.gif",
     *                 "2": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/animated/1/2.gif",
     *                 "3": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/animated/1/3.gif",
     *                 "4": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/animated/1/4.gif"
     *               },
     *               "static": {
     *                 "1": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/static/1/1.png",
     *                 "1.5": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/static/1/1.5.png",
     *                 "2": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/static/1/2.png",
     *                 "3": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/static/1/3.png",
     *                 "4": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/static/1/4.png"
     *               }
     *             }
     *           },
     *           "can_cheer": true,
     *           "show_in_bits_card": true
     *         }
     *         ...
     *       ],
     *       "type": "global_first_party",
     *       "order": 1,
     *       "last_updated": "2018-05-22T00:06:04Z",
     *       "is_charitable": false
     *     },
     *     ...
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the Cheermotes.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token or user access token.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-cheermotes
     */
    getCheermotes: async (
      params: GetCheermotesParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetCheermotesResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/bits/cheermotes?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets a list of transactions for an extension. A transaction records the exchange of a currency (for example, Bits) for a digital product.
     *
     * ## Authentication
     *
     * Requires an app access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/extensions/transactions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET
     * 'https://api.twitch.tv/helix/extensions/transactions?extension_id=1234' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "74c52265-e214-48a6-91b9-23b6014e8041",
     *       "timestamp": "2019-01-28T04:15:53.325Z",
     *       "broadcaster_id": "439964613",
     *       "broadcaster_login": "chikuseuma",
     *       "broadcaster_name": "chikuseuma",
     *       "user_id": "424596340",
     *       "user_login": "quotrok",
     *       "user_name": "quotrok",
     *       "product_type": "BITS_IN_EXTENSION",
     *       "product_data": {
     *         "domain": "twitch.ext.uo6dggojyb8d6soh92zknwmi5ej1q2",
     *         "sku": "testSku100",
     *         "cost": {
     *           "amount": 100,
     *           "type": "bits"
     *         },
     *         "inDevelopment": false,
     *         "displayName": "Test Product 100",
     *         "expiration": "",
     *         "broadcast": false
     *       }
     *     },
     *     {
     *       "id": "8d303dc6-a460-4945-9f48-59c31d6735cb",
     *       "timestamp": "2019-01-18T09:10:13.397Z",
     *       "broadcaster_id": "439964613",
     *       "broadcaster_login": "chikuseuma",
     *       "broadcaster_name": "chikuseuma",
     *       "user_id": "439966926",
     *       "user_login": "liscuit",
     *       "user_name": "liscuit",
     *       "product_type": "BITS_IN_EXTENSION",
     *       "product_data": {
     *         "domain": "twitch.ext.uo6dggojyb8d6soh92zknwmi5ej1q2",
     *         "sku": "testSku200",
     *         "cost": {
     *           "amount": 200,
     *           "type": "bits"
     *         },
     *         "inDevelopment": false,
     *         "displayName": "Test Product 200",
     *         "expiration": "",
     *         "broadcast": false
     *       }
     *     },
     *     ...
     *   ],
     *   "pagination": {
     *     "cursor": "cursorString"
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Sccessfully retrieved the list of transactions.
     *
     * ### 400 Bad Request
     *
     * * The _extension\_id_ query parameter is required.
     * * The request specified too many _id_ query parameters.
     * * The pagination cursor is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token.
     * * The access token is not valid.
     * * The ID in the _extension\_id_ query parameter must match the client ID in the access token.
     * * The ID in the Client-Id header must match the client ID in the access token.
     *
     * ### 404 Not Found
     *
     * * One or more of the transaction IDs specified using the _id_ query parameter were not found.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-extension-transactions
     */
    getExtensionTransactions: async (
      params: GetExtensionTransactionsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetExtensionTransactionsResponse> => {
      const s = getSearchParams(params, ["id"]);
      const url = `https://api.twitch.tv/helix/extensions/transactions?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  channels = {
    /**
     * Gets information about one or more channels.
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/channels`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets information about the TwitchDev channel.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/channels?broadcaster_id=141981764' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_id": "141981764",
     *       "broadcaster_login": "twitchdev",
     *       "broadcaster_name": "TwitchDev",
     *       "broadcaster_language": "en",
     *       "game_id": "509670",
     *       "game_name": "Science & Technology",
     *       "title": "TwitchDev Monthly Update // May 6, 2021",
     *       "delay": 0
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### HTTP Code
     *
     * Description
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of channels.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The broadcaster ID is not valid.
     * * The number of _broadcaster\_id_ query parameters exceeds the maximum allowed.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token or user access token.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * ### 429 Too Many Requests
     *
     * * The application exceeded the number of calls it may make per minute. For details, see [Rate Limits](https://dev.twitch.tv/docs/api/guide#twitch-rate-limits).
     *
     * ### 500 Internal Server Error
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-channel-information
     */
    getChannelInformation: async (
      params: GetChannelInformationParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetChannelInformationResponse> => {
      const s = getSearchParams(params, ["broadcaster_id"]);
      const url = `https://api.twitch.tv/helix/channels?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Updates a channel’s properties.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **channel:manage:broadcast** scope.
     *
     * ## URL
     *
     * `PATCH https://api.twitch.tv/helix/channels`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X PATCH 'https://api.twitch.tv/helix/channels?broadcaster_id=41245072' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
     * -H 'Content-Type: application/json' \
     * --data-raw '{"game_id":"33214", "title":"there are helicopters in the game? REASON TO PLAY FORTNITE found", "broadcaster_language":"en"}'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * 204 No Content
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully updated the channel’s properties.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The request must update at least one property.
     * * The `title` field may not contain an empty string.
     * * The ID in `game_id` is not valid.
     * * To update the `delay` field, the broadcaster must have partner status.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _broadcaster\_id_ must match the user ID found in the OAuth token.
     * * The Authorization header is required and must specify a user access token.
     * * The OAuth token must include the **channel:manage:broadcast** scope.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * ### 500 Internal server error
     *
     * @see https://dev.twitch.tv/docs/api/reference#modify-channel-information
     */
    modifyChannelInformation: async (
      params: ModifyChannelInformationParams,
      body: ModifyChannelInformationBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/channels?${s}`;
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Gets a list of users that are editors for the specified broadcaster.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **channel:read:editors** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/channels/editors`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the list of editors for TwitchDev.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/channels/editors?broadcaster_id=141981764' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "user_id": "182891647",
     *       "user_name": "mauerbac",
     *       "created_at": "2019-02-15T21:19:50.380833Z"
     *     },
     *     {
     *       "user_id": "135093069",
     *       "user_name": "BlueLava",
     *       "created_at": "2018-03-07T16:28:29.872937Z"
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of editors.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The ID in the _broadcaster\_id_ query parameter must match the user ID found in the OAuth token.
     * * The Authorization header is required and must specify a user access token.
     * * The OAuth token must include the **channel:read:editors** scope.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-channel-editors
     */
    getChannelEditors: async (
      params: GetChannelEditorsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetChannelEditorsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/channels/editors?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  channelPoints = {
    /**
     * Creates a Custom Reward in the broadcaster’s channel. The maximum number of custom rewards per channel is 50, which includes both enabled and disabled rewards.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **channel:manage:redemptions** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/channel_points/custom_rewards`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Creates a custom reward.
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=274637212' \
     * -H 'client-id: gx2pv4208cff0ig9ou7nk3riccffxt' \
     * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2' \
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "title":"game analysis 1v1",
     *   "cost":50000
     * }'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_name": "torpedo09",
     *       "broadcaster_login": "torpedo09",
     *       "broadcaster_id": "274637212",
     *       "id": "afaa7e34-6b17-49f0-a19a-d1e76eaaf673",
     *       "image": null,
     *       "background_color": "#00E5CB",
     *       "is_enabled": true,
     *       "cost": 50000,
     *       "title": "game analysis 1v1",
     *       "prompt": "",
     *       "is_user_input_required": false,
     *       "max_per_stream_setting": {
     *         "is_enabled": false,
     *         "max_per_stream": 0
     *       },
     *       "max_per_user_per_stream_setting": {
     *         "is_enabled": false,
     *         "max_per_user_per_stream": 0
     *       },
     *       "global_cooldown_setting": {
     *         "is_enabled": false,
     *         "global_cooldown_seconds": 0
     *       },
     *       "is_paused": false,
     *       "is_in_stock": true,
     *       "default_image": {
     *         "url_1x": "https://static-cdn.jtvnw.net/custom-reward-images/default-1.png",
     *         "url_2x": "https://static-cdn.jtvnw.net/custom-reward-images/default-2.png",
     *         "url_4x": "https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
     *       },
     *       "should_redemptions_skip_request_queue": false,
     *       "redemptions_redeemed_current_stream": null,
     *       "cooldown_expires_at": null
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully created the Custom Reward.
     *
     * ### 400 Bad Request
     *
     * * The request exceeds the maximum number of rewards allowed per channel.
     * * The _broadcaster\_id_ query parameter is required.
     * * The `title` field is required.
     * * The `title` must contain a minimum of 1 character and a maximum of 45 characters.
     * * The `title` must be unique amongst all of the broadcaster's custom rewards.
     * * The `cost` field is required.
     * * The `cost` field must contain a minimum of 1 point.
     * * The `prompt` field is limited to a maximum of 200 characters.
     * * If `is_max_per_stream_enabled` is **true**, the minimum value for `max_per_stream` is 1.
     * * If `is_max_per_user_per_stream_enabled` is **true**, the minimum value for `max_per_user_per_stream` is 1.
     * * If `is_global_cooldown_enabled` is **true**, the minimum value for `global_cooldown_seconds` is 1.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a user access token.
     * * The user access token is missing the **channel:manage:redemptions** scope.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * ### 403 Forbidden
     *
     * * The broadcaster is not a partner or affiliate.
     *
     * ### 500 Internal Server Error
     *
     * @see https://dev.twitch.tv/docs/api/reference#create-custom-rewards
     */
    createCustomRewards: async (
      params: CreateCustomRewardsParams,
      body: CreateCustomRewardsBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<CreateCustomRewardsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/channel_points/custom_rewards?${s}`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Deletes a custom reward that the broadcaster created.
     *
     * The app used to create the reward is the only app that may delete it. If the reward’s redemption status is UNFULFILLED at the time the reward is deleted, its redemption status is marked as FULFILLED.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **channel:manage:redemptions** scope.
     *
     * ## URL
     *
     * `DELETE https://api.twitch.tv/helix/channel_points/custom_rewards`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Deletes the specified custom reward.
     *
     * ```
     * curl -X DELETE 'https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=274637212&id=b045196d-9ce7-4a27-a9b9-279ed341ab28' \
     * -H 'Client-Id: gx2pv4208cff0ig9ou7nk3riccffxt' \
     * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * 204 No Content
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully deleted the custom reward.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The _id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a user access token.
     * * The user access token must include the **channel:manage:redemptions** scope.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * ### 403 Forbidden
     *
     * * The ID in the Client-Id header must match the client ID used to create the custom reward.
     * * The broadcaster is not a partner or affiliate.
     *
     * ### 404 Not Found
     *
     * * The custom reward specified in the _id_ query parameter was not found.
     *
     * ### 500 Internal Server Error
     *
     * @see https://dev.twitch.tv/docs/api/reference#delete-custom-reward
     */
    deleteCustomReward: async (
      params: DeleteCustomRewardParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/channel_points/custom_rewards?${s}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets a list of custom rewards that the specified broadcaster created.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **channel:read:redemptions** scope.
     *
     * **NOTE**: A channel may offer a maximum of 50 rewards, which includes both enabled and disabled rewards.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/channel_points/custom_rewards`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the broadcaster’s list of custom rewards.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=274637212'
     * -H 'Client-Id: gx2pv4208cff0ig9ou7nk3riccffxt' \
     * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_name": "torpedo09",
     *       "broadcaster_login": "torpedo09",
     *       "broadcaster_id": "274637212",
     *       "id": "92af127c-7326-4483-a52b-b0da0be61c01",
     *       "image": null,
     *       "background_color": "#00E5CB",
     *       "is_enabled": true,
     *       "cost": 50000,
     *       "title": "game analysis",
     *       "prompt": "",
     *       "is_user_input_required": false,
     *       "max_per_stream_setting": {
     *         "is_enabled": false,
     *         "max_per_stream": 0
     *       },
     *       "max_per_user_per_stream_setting": {
     *         "is_enabled": false,
     *         "max_per_user_per_stream": 0
     *       },
     *       "global_cooldown_setting": {
     *         "is_enabled": false,
     *         "global_cooldown_seconds": 0
     *       },
     *       "is_paused": false,
     *       "is_in_stock": true,
     *       "default_image": {
     *         "url_1x": "https://static-cdn.jtvnw.net/custom-reward-images/default-1.png",
     *         "url_2x": "https://static-cdn.jtvnw.net/custom-reward-images/default-2.png",
     *         "url_4x": "https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
     *       },
     *       "should_redemptions_skip_request_queue": false,
     *       "redemptions_redeemed_current_stream": null,
     *       "cooldown_expires_at": null
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ### Example Request
     *
     * Gets the list of custom rewards that the calling Client ID can manage.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=274637212&only_manageable_rewards=true'
     * -H 'Client-Id: gx2pv4208cff0ig9ou7nk3riccffxt' \
     * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2'​​​​​​​
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_name": "torpedo09",
     *       "broadcaster_id": "274637212",
     *       "id": "92af127c-7326-4483-a52b-b0da0be61c01",
     *       "image": null,
     *       "background_color": "#00E5CB",
     *       "is_enabled": true,
     *       "cost": 50000,
     *       "title": "game analysis",
     *       "prompt": "",
     *       "is_user_input_required": false,
     *       "max_per_stream_setting": {
     *         "is_enabled": false,
     *         "max_per_stream": 0
     *       },
     *       "max_per_user_per_stream_setting": {
     *         "is_enabled": false,
     *         "max_per_user_per_stream": 0
     *       },
     *       "global_cooldown_setting": {
     *         "is_enabled": false,
     *         "global_cooldown_seconds": 0
     *       },
     *       "is_paused": false,
     *       "is_in_stock": true,
     *       "default_image": {
     *         "url_1x": "https://static-cdn.jtvnw.net/custom-reward-images/default-1.png",
     *         "url_2x": "https://static-cdn.jtvnw.net/custom-reward-images/default-2.png",
     *         "url_4x": "https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
     *       },
     *       "should_redemptions_skip_request_queue": false,
     *       "redemptions_redeemed_current_stream": null,
     *       "cooldown_expires_at": null
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ### Example Request
     *
     * Gets the specified custom reward.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=274637212&id=92af127c-7326-4483-a52b-b0da0be61c01'
     * -H 'Client-Id: gx2pv4208cff0ig9ou7nk3riccffxt' \
     * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2'​​​​​​​​​​​​​​
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_name": "torpedo09",
     *       "broadcaster_id": "274637212",
     *       "id": "92af127c-7326-4483-a52b-b0da0be61c01",
     *       "image": null,
     *       "background_color": "#00E5CB",
     *       "is_enabled": true,
     *       "cost": 50000,
     *       "title": "game analysis",
     *       "prompt": "",
     *       "is_user_input_required": false,
     *       "max_per_stream_setting": {
     *         "is_enabled": false,
     *         "max_per_stream": 0
     *       },
     *       "max_per_user_per_stream_setting": {
     *         "is_enabled": false,
     *         "max_per_user_per_stream": 0
     *       },
     *       "global_cooldown_setting": {
     *         "is_enabled": false,
     *         "global_cooldown_seconds": 0
     *       },
     *       "is_paused": false,
     *       "is_in_stock": true,
     *       "default_image": {
     *         "url_1x": "https://static-cdn.jtvnw.net/custom-reward-images/default-1.png",
     *         "url_2x": "https://static-cdn.jtvnw.net/custom-reward-images/default-2.png",
     *         "url_4x": "https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
     *       },
     *       "should_redemptions_skip_request_queue": false,
     *       "redemptions_redeemed_current_stream": null,
     *       "cooldown_expires_at": null
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the broadcaster’s list of the Custom Rewards.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The request exceeds the maximum number of _id_ query parameters that you may specify.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header must specify a user access token.
     * * The user access token must include the **channel:read:redemptions** scope.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * ### 403 Forbidden
     *
     * * The broadcaster is not a partner or affiliate.
     *
     * ### 404 Not Found
     *
     * * All of the custom rewards specified using the _id_ query parameter were not found.
     *
     * ### 500 Internal Server Error
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-custom-reward
     */
    getCustomReward: async (
      params: GetCustomRewardParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetCustomRewardResponse> => {
      const s = getSearchParams(params, ["id"]);
      const url = `https://api.twitch.tv/helix/channel_points/custom_rewards?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets a list of redemptions for the specified custom reward. The app used to create the reward is the only app that may get the redemptions.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **channel:read:redemptions** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the list of redemptions that were canceled for the specified reward.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?broadcaster_id=274637212&reward_id=92af127c-7326-4483-a52b-b0da0be61c01&status=CANCELED' \
     * -H 'Client-Id: gx2pv4208cff0ig9ou7nk3riccffxt' \
     * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_name": "torpedo09",
     *       "broadcaster_login": "torpedo09",
     *       "broadcaster_id": "274637212",
     *       "id": "17fa2df1-ad76-4804-bfa5-a40ef63efe63",
     *       "user_login": "torpedo09",
     *       "user_id": "274637212",
     *       "user_name": "torpedo09",
     *       "user_input": "",
     *       "status": "CANCELED",
     *       "redeemed_at": "2020-07-01T18:37:32Z",
     *       "reward": {
     *         "id": "92af127c-7326-4483-a52b-b0da0be61c01",
     *         "title": "game analysis",
     *         "prompt": "",
     *         "cost": 50000
     *       }
     *     }
     *   ],
     *   "pagination": {
     *       "cursor": "eyJiIjpudWxsLCJhIjp7IkN1cnNvciI6Ik1UZG1ZVEprWmpFdFlXUTNOaTAwT0RBMExXSm1ZVFV0WVRRd1pXWTJNMlZtWlRZelgxOHlNREl3TFRBM0xUQXhWREU0T2pNM09qTXlMakl6TXpFeU56RTFOMW89In19"
     *   }
     * }
     *
     * ```
     *
     * ### Example Request
     *
     * Gets redemptions by ID.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?broadcaster_id=274637212&reward_id=92af127c-7326-4483-a52b-b0da0be61c01&id=17fa2df1-ad76-4804-bfa5-a40ef63efe63' \
     * -H 'Client-Id: gx2pv4208cff0ig9ou7nk3riccffxt' \
     * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_name": "torpedo09",
     *       "broadcaster_login": "torpedo09",
     *       "broadcaster_id": "274637212",
     *       "id": "17fa2df1-ad76-4804-bfa5-a40ef63efe63",
     *       "user_id": "274637212",
     *       "user_name": "torpedo09",
     *       "user_input": "",
     *       "status": "CANCELED",
     *       "redeemed_at": "2020-07-01T18:37:32Z",
     *       "reward": {
     *         "id": "92af127c-7326-4483-a52b-b0da0be61c01",
     *         "title": "game analysis",
     *         "prompt": "",
     *         "cost": 50000
     *       }
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 Ok
     *
     * Successfully retrieved the list of redeemed custom rewards.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The _reward\_id_ query parameter is required.
     * * The _status_ query parameter is required if you didn't specify the _id_ query parameter.
     * * The value in the _status_ query parameter is not valid.
     * * The value in the _sort_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a user access token.
     * * The user access token must include the **channel:read:redemptions** scope.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * ### 403 Forbidden
     *
     * * The ID in the Client-Id header must match the client ID used to create the custom reward.
     * * The broadcaster is not a partner or affiliate.
     *
     * ### 404 Not Found
     *
     * * All of the redemptions specified using the _id_ query parameter were not found.
     *
     * ### 500 Internal Server Error
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-custom-reward-redemption
     */
    getCustomRewardRedemption: async (
      params: GetCustomRewardRedemptionParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetCustomRewardRedemptionResponse> => {
      const s = getSearchParams(params, ["id"]);
      const url = `https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Updates a custom reward. The app used to create the reward is the only app that may update the reward.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **channel:manage:redemptions** scope.
     *
     * ## URL
     *
     * `PATCH https://api.twitch.tv/helix/channel_points/custom_rewards`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Disables the specified custom reward.
     *
     * ```
     * curl -X PATCH 'https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=274637212&id=92af127c-7326-4483-a52b-b0da0be61c01' \
     * -H 'client-id: gx2pv4208cff0ig9ou7nk3riccffxt' \
     * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2' \
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "is_enabled": false
     *  }'
     *
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_name": "torpedo09",
     *       "broadcaster_login": "torpedo09",
     *       "broadcaster_id": "274637212",
     *       "id": "92af127c-7326-4483-a52b-b0da0be61c01",
     *       "image": null,
     *       "background_color": "#00E5CB",
     *       "is_enabled": false,
     *       "cost": 30000,
     *       "title": "game analysis 2v2",
     *       "prompt": "",
     *       "is_user_input_required": false,
     *       "max_per_stream_setting": {
     *         "is_enabled": true,
     *         "max_per_stream": 60
     *       },
     *       "max_per_user_per_stream_setting": {
     *         "is_enabled": false,
     *         "max_per_user_per_stream": 0
     *       },
     *       "global_cooldown_setting": {
     *         "is_enabled": false,
     *         "global_cooldown_seconds": 0
     *       },
     *       "is_paused": false,
     *       "is_in_stock": false,
     *       "default_image": {
     *         "url_1x": "https://static-cdn.jtvnw.net/custom-reward-images/default-1.png",
     *         "url_2x": "https://static-cdn.jtvnw.net/custom-reward-images/default-2.png",
     *         "url_4x": "https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
     *       },
     *       "should_redemptions_skip_request_queue": true,
     *       "redemptions_redeemed_current_stream": 60,
     *       "cooldown_expires_at": null
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ### Example Request
     *
     * Updates the reward’s title.
     *
     * ```
     * curl -X PATCH 'https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=274637212&id=92af127c-7326-4483-a52b-b0da0be61c01' \
     * -H 'client-id: gx2pv4208cff0ig9ou7nk3riccffxt' \
     * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2' \
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "title": "game analysis 2v2"
     *  }'
     *
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_name": "torpedo09",
     *       "broadcaster_login": "torpedo09",
     *       "broadcaster_id": "274637212",
     *       "id": "92af127c-7326-4483-a52b-b0da0be61c01",
     *       "image": null,
     *       "background_color": "",
     *       "is_enabled": false,
     *       "cost": 30000,
     *       "title": "game analysis 2v2",
     *       "prompt": "",
     *       "is_user_input_required": false,
     *       "max_per_stream_setting": {
     *         "is_enabled": true,
     *         "max_per_stream": 60
     *       },
     *       "max_per_user_per_stream_setting": {
     *         "is_enabled": false,
     *         "max_per_user_per_stream": 0
     *       },
     *       "global_cooldown_setting": {
     *         "is_enabled": false,
     *         "global_cooldown_seconds": 0
     *       },
     *       "is_paused": false,
     *       "is_in_stock": true,
     *       "default_image": {
     *         "url_1x": "https://static-cdn.jtvnw.net/custom-reward-images/default-1.png",
     *         "url_2x": "https://static-cdn.jtvnw.net/custom-reward-images/default-2.png",
     *         "url_4x": "https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
     *       },
     *       "should_redemptions_skip_request_queue": true,
     *       "redemptions_redeemed_current_stream": 60,
     *       "cooldown_expires_at": null
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully updated the Custom Reward.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The _id_ query parameter is required.
     * * The `title` must contain a minimum of 1 character and a maximum of 45 characters.
     * * The `title` must be unique amongst all of the broadcaster's custom rewards.
     * * The `cost` field must contain a minimum of 1 point.
     * * The `prompt` field is limited to a maximum of 200 characters.
     * * If `is_max_per_stream_enabled` is **true**, the minimum value for `max_per_stream` is 1.
     * * If `is_max_per_user_per_stream_enabled` is **true**, the minimum value for `max_per_user_per_stream` is 1.
     * * If `is_global_cooldown_enabled` is **true**, the minimum value for `global_cooldown_seconds` is 1 and the maximum is 604800.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a user access token.
     * * The user access token must include the **channel:manage:redemptions** scope.
     * * The OAuth token is not valide.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * ### 403 Forbidden
     *
     * * The ID in the Client-Id header must match the client ID used to create the custom reward.
     * * The broadcaster is not a partner or affiliate.
     *
     * ### 404 Not Found
     *
     * * The custom reward specified in the _id_ query parameter was not found.
     *
     * ### 500 Internal Server Error
     *
     * @see https://dev.twitch.tv/docs/api/reference#update-custom-reward
     */
    updateCustomReward: async (
      params: UpdateCustomRewardParams,
      body: UpdateCustomRewardBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<UpdateCustomRewardResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/channel_points/custom_rewards?${s}`;
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Updates a redemption’s status. You may update a redemption only if its status is UNFULFILLED. The app used to create the reward is the only app that may update the redemption.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **channel:manage:redemptions** scope.
     *
     * ## URL
     *
     * `PATCH https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Updates a redemption’s status.
     *
     * ```
     * curl --X PATCH 'https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?broadcaster_id=274637212&reward_id=92af127c-7326-4483-a52b-b0da0be61c01&id=17fa2df1-ad76-4804-bfa5-a40ef63efe63' \
     * -H 'client-id: gx2pv4208cff0ig9ou7nk3riccffxt' \
     * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2' \
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "status": "CANCELED"
     * }'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_name": "torpedo09",
     *       "broadcaster_login": "torpedo09",
     *       "broadcaster_id": "274637212",
     *       "id": "17fa2df1-ad76-4804-bfa5-a40ef63efe63",
     *       "user_id": "274637212",
     *       "user_name": "torpedo09",
     *       "user_login": "torpedo09",
     *       "user_input": "",
     *       "status": "CANCELED",
     *       "redeemed_at": "2020-07-01T18:37:32Z",
     *       "reward": {
     *         "id": "92af127c-7326-4483-a52b-b0da0be61c01",
     *         "title": "game analysis",
     *         "prompt": "",
     *         "cost": 50000
     *       }
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully updated the redemption’s status.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The _reward\_id_ query parameter is required.
     * * The _id_ query parameter is required.
     * * The value in the _status_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a user access token.
     * * The user access token must include the **channel:manage:redemptions** scope.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * ### 403 Forbidden
     *
     * * The ID in the Client-Id header must match the client ID used to create the custom reward.
     * * The broadcaster is not a partner or affiliate.
     *
     * ### 404 Not Found
     *
     * * The custom reward specified in the _reward\_id_ query parameter was not found.
     * * The redemptions specified using the _id_ query parameter were not found or their statuses weren't marked as UNFULFILLED.
     *
     * ### 500 Internal Server Error
     *
     * @see https://dev.twitch.tv/docs/api/reference#update-redemption-status
     */
    updateRedemptionStatus: async (
      params: UpdateRedemptionStatusParams,
      body: UpdateRedemptionStatusBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<UpdateRedemptionStatusResponse> => {
      const s = getSearchParams(params, ["id"]);
      const url = `https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?${s}`;
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
  };
  charity = {
    /**
     * [BETA](https://dev.twitch.tv/docs/product-lifecycle) Gets information about the charity campaign that a broadcaster is running. For example, the campaign’s fundraising goal and the current amount of donations.
     *
     * To receive events when progress is made towards the campaign’s goal or the broadcaster changes the fundraising goal, subscribe to the [channel.charity\_campaign.progress](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelcharity%5Fcampaignprogress) subscription type.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:read:charity** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/charity/campaigns`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the broadcaster’s active charity campaign.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/charity/campaigns?broadcaster_id=123456' \
     * -H 'Authorization: Bearer kpvy3cjboyptmiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfn0nyan9c87zr6t'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     *
     * {
     *   "data": [
     *     {
     *       "id": "123-abc-456-def",
     *       "broadcaster_id": "123456",
     *       "broadcaster_name": "SunnySideUp",
     *       "broadcaster_login": "sunnysideup",
     *       "charity_name": "Example name",
     *       "charity_description": "Example description",
     *       "charity_logo": "https://abc.cloudfront.net/ppgf/1000/100.png",
     *       "charity_website": "https://www.example.com",
     *       "current_amount": {
     *         "value": 86000,
     *         "decimal_places": 2,
     *         "currency": "USD"
     *       },
     *       "target_amount": {
     *         "value": 1500000,
     *         "decimal_places": 2,
     *         "currency": "USD"
     *       }
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved information about the broadcaster’s active charity campaign.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The _broadcaster\_id_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The ID in the _broadcaster\_id_ query parameter must match the user ID in the access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:read:charity** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header must match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * The broadcaster is not a partner or affiliate.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-charity-campaign
     */
    getCharityCampaign: async (
      params: GetCharityCampaignParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetCharityCampaignResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/charity/campaigns?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * [BETA](https://dev.twitch.tv/docs/product-lifecycle) Gets the list of donations that users have made to the broadcaster’s active charity campaign.
     *
     * To receive events as donations occur, subscribe to the [channel.charity\_campaign.donate](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelcharity%5Fcampaigndonate) subscription type.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:read:charity** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/charity/donations`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the broadcaster’s active charity campaign.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/charity/donations?broadcaster_id=123456' \
     * -H 'Authorization: Bearer kpvy3cjboyptmiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfn0nyan9c87zr6t'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     *
     * {
     *   "data": [
     *     {
     *       "campaign_id": "123-abc-456-def",
     *       "user_id": "5678",
     *       "user_login": "cool_user",
     *       "user_name": "Cool_User",
     *       "amount": {
     *         "value": 500,
     *         "decimal_places": 2,
     *         "currency": "USD"
     *       }
     *     },
     *     {
     *       "campaign_id": "123-abc-456-def",
     *       "user_id": "8765",
     *       "user_login": "cool_user2",
     *       "user_name": "Cool_User2",
     *       "amount": {
     *         "value": 10000,
     *         "decimal_places": 2,
     *         "currency": "USD"
     *       }
     *     },
     *     . . .
     *   ],
     *   "pagination" : {
     *       "cursor" : "eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6NX19"
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of donations that users contributed to the broadcaster’s charity campaign.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The _broadcaster\_id_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The ID in the _broadcaster\_id_ query parameter must match the user ID in the access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:read:charity** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header must match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * The broadcaster is not a partner or affiliate.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-charity-campaign-donations
     */
    getCharityCampaignDonations: async (
      params: GetCharityCampaignDonationsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetCharityCampaignDonationsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/charity/donations?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  chat = {
    /**
     * [BETA](https://dev.twitch.tv/docs/product-lifecycle) Gets the list of users that are connected to the broadcaster’s chat session.
     *
     * **NOTE**: There is a delay between when users join and leave a chat and when the list is updated accordingly.
     *
     * To determine whether a user is a moderator or VIP, use the [Get Moderators](https://dev.twitch.tv/docs/api/reference#get-moderators) and [Get VIPs](https://dev.twitch.tv/docs/api/reference#get-vips) endpoints. You can check the roles of up to 100 users.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **moderator:read:chatters** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/chat/chatters`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the list of users that are connected to the specified broadcaster’s chat room.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/chat/chatters?broadcaster_id=123456&moderator_id=654321' \
     * -H 'Authorization: Bearer kpvy3cjboyptmiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfn0nyan9c87zr6t'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     *
     * {
     *   "data": [
     *     {
     *       "user_id": "128393656",
     *       "user_login": "smittysmithers",
     *       "user_name": "smittysmithers"
     *     },
     *     ...
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6NX19"
     *   },
     *   "total": 8
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the broadcaster’s list of chatters.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The ID in the _broadcaster\_id_ query parameter is not valid.
     * * The _moderator\_id_ query parameter is required.
     * * The ID in the _moderator\_id_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The ID in the _moderator\_id_ query parameter must match the user ID in the access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **moderator:read:chatters** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * The user in the _moderator\_id_ query parameter is not one of the broadcaster's moderators.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-chatters
     */
    getChatters: async (
      params: GetChattersParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetChattersResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/chat/chatters?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets all emotes that the specified Twitch channel created. Broadcasters create these custom emotes for users who subscribe to or follow the channel or cheer Bits in the channel’s chat window. [Learn More](https://dev.twitch.tv/docs/irc/emotes)
     *
     * For information about the custom emotes, see [subscriber emotes](https://help.twitch.tv/s/article/subscriber-emote-guide), [Bits tier emotes](https://help.twitch.tv/s/article/custom-bit-badges-guide?language=bg#slots), and [follower emotes](https://blog.twitch.tv/en/2021/06/04/kicking-off-10-years-with-our-biggest-emote-update-ever/).
     *
     * **NOTE:** With the exception of custom follower emotes, users may use custom emotes in any Twitch chat.
     *
     * ## Authorization
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/chat/emotes`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets custom emotes that the TwitchDev channel created.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/chat/emotes?broadcaster_id=141981764' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ```
     * # Twitch CLI example that gets the custom emotes for the specified channel.
     *
     * twitch api get /chat/emotes -q broadcaster_id=141981764
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     *
     * {
     *   "data": [
     *     {
     *       "id": "304456832",
     *       "name": "twitchdevPitchfork",
     *       "images": {
     *         "url_1x": "https://static-cdn.jtvnw.net/emoticons/v2/304456832/static/light/1.0",
     *         "url_2x": "https://static-cdn.jtvnw.net/emoticons/v2/304456832/static/light/2.0",
     *         "url_4x": "https://static-cdn.jtvnw.net/emoticons/v2/304456832/static/light/3.0"
     *       },
     *       "tier": "1000",
     *       "emote_type": "subscriptions",
     *       "emote_set_id": "301590448",
     *       "format": [
     *         "static"
     *       ],
     *       "scale": [
     *         "1.0",
     *         "2.0",
     *         "3.0"
     *       ],
     *       "theme_mode": [
     *         "light",
     *         "dark"
     *       ]
     *     },
     *     ...
     *     {
     *       "id": "emotesv2_4c3b4ed516de493bbcd2df2f5d450f49",
     *       "name": "twitchdevHyperPitchfork",
     *       "images": {
     *         "url_1x": "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_4c3b4ed516de493bbcd2df2f5d450f49/static/light/1.0",
     *         "url_2x": "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_4c3b4ed516de493bbcd2df2f5d450f49/static/light/2.0",
     *         "url_4x": "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_4c3b4ed516de493bbcd2df2f5d450f49/static/light/3.0"
     *       },
     *       "tier": "1000",
     *       "emote_type": "subscriptions",
     *       "emote_set_id": "318939165",
     *       "format": [
     *         "static",
     *         "animated"
     *       ],
     *       "scale": [
     *         "1.0",
     *         "2.0",
     *         "3.0"
     *       ],
     *       "theme_mode": [
     *         "light",
     *         "dark"
     *       ]
     *     },
     *   ],
     *   "template": "https://static-cdn.jtvnw.net/emoticons/v2/{{id}}/{{format}}/{{theme_mode}}/{{scale}}"
     * }
     *
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the custom emotes for the specified broadcaster.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a valid app access token or user access token.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-channel-emotes
     */
    getChannelEmotes: async (
      params: GetChannelEmotesParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetChannelEmotesResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/chat/emotes?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets all [global emotes](https://www.twitch.tv/creatorcamp/en/learn-the-basics/emotes/). Global emotes are Twitch-created emotes that users can use in any Twitch chat.
     *
     * [Learn More](https://dev.twitch.tv/docs/irc/emotes)
     *
     * ## Authorization
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/chat/emotes/global`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets all global emotes.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/chat/emotes/global' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ```
     * # Twitch CLI example that gets all global emotes.
     *
     * twitch api get /chat/emotes/global
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     *
     * {
     *   "data": [
     *     {
     *       "id": "196892",
     *       "name": "TwitchUnity",
     *       "images": {
     *         "url_1x": "https://static-cdn.jtvnw.net/emoticons/v2/196892/static/light/1.0",
     *         "url_2x": "https://static-cdn.jtvnw.net/emoticons/v2/196892/static/light/2.0",
     *         "url_4x": "https://static-cdn.jtvnw.net/emoticons/v2/196892/static/light/3.0"
     *       },
     *       "format": [
     *         "static"
     *       ],
     *       "scale": [
     *         "1.0",
     *         "2.0",
     *         "3.0"
     *       ],
     *       "theme_mode": [
     *         "light",
     *         "dark"
     *       ]
     *     },
     *     ...
     *   ],
     *   "template": "https://static-cdn.jtvnw.net/emoticons/v2/{{id}}/{{format}}/{{theme_mode}}/{{scale}}"
     * }
     *
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the global emotes.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a valid app access token or user access token.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-global-emotes
     */
    getGlobalEmotes: async (
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetGlobalEmotesResponse> => {
      const url = 'https://api.twitch.tv/helix/chat/emotes/global';
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets emotes for one or more specified emote sets.
     *
     * An emote set groups emotes that have a similar context. For example, Twitch places all the subscriber emotes that a broadcaster uploads for their channel in the same emote set.
     *
     * [Learn More](https://dev.twitch.tv/docs/irc/emotes)
     *
     * ## Authorization
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/chat/emotes/set`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the emotes for the TwitchDev subscriber emote set.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/chat/emotes/set?emote_set_id=301590448' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ```
     * # Twitch CLI example that gets the emotes for the specified emote set.
     *
     * twitch api get /chat/emotes/set -q emote_set_id=301590448
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     *
     * {
     *   "data": [
     *     {
     *       "id": "304456832",
     *       "name": "twitchdevPitchfork",
     *       "images": {
     *         "url_1x": "https://static-cdn.jtvnw.net/emoticons/v2/304456832/static/light/1.0",
     *         "url_2x": "https://static-cdn.jtvnw.net/emoticons/v2/304456832/static/light/2.0",
     *         "url_4x": "https://static-cdn.jtvnw.net/emoticons/v2/304456832/static/light/3.0"
     *       },
     *       "emote_type": "subscriptions",
     *       "emote_set_id": "301590448",
     *       "owner_id": "141981764",
     *       "format": [
     *         "static"
     *       ],
     *       "scale": [
     *         "1.0",
     *         "2.0",
     *         "3.0"
     *       ],
     *       "theme_mode": [
     *         "light",
     *         "dark"
     *       ]
     *     },
     *     ...
     *   ],
     *   "template": "https://static-cdn.jtvnw.net/emoticons/v2/{{id}}/{{format}}/{{theme_mode}}/{{scale}}"
     * }
     *
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the emotes for the specified emote sets.
     *
     * ### 400 Bad Request
     *
     * * The _emote\_set\_id_ query parameter is required.
     * * The number of _emote\_set\_id_ query parameters exceeds the maximum allowed.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a valid app access token or user access token.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-emote-sets
     */
    getEmoteSets: async (
      params: GetEmoteSetsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetEmoteSetsResponse> => {
      const s = getSearchParams(params, ["emote_set_id"]);
      const url = `https://api.twitch.tv/helix/chat/emotes/set?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets all badges that the specified broadcaster created. The list is empty if the broadcaster hasn’t created custom chat badges. For information about custom badges, see [subscriber badges](https://help.twitch.tv/s/article/subscriber-badge-guide) and [Bits badges](https://help.twitch.tv/s/article/custom-bit-badges-guide).
     *
     * ## Authorization
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/chat/badges`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Get the list of custom chat badges that the BlueLava Twitch channel created.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/chat/badges?broadcaster_id=135093069' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "set_id": "bits",
     *       "versions": [
     *         {
     *           "id": "1",
     *           "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/743a0f3b-84b3-450b-96a0-503d7f4a9764/1",
     *           "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/743a0f3b-84b3-450b-96a0-503d7f4a9764/2",
     *           "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/743a0f3b-84b3-450b-96a0-503d7f4a9764/3"
     *         }
     *       ]
     *     },
     *     {
     *       "set_id": "subscriber",
     *       "versions": [
     *         {
     *           "id": "0",
     *           "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/eb4a8a4c-eacd-4f5e-b9f2-394348310442/1",
     *           "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/eb4a8a4c-eacd-4f5e-b9f2-394348310442/2",
     *           "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/eb4a8a4c-eacd-4f5e-b9f2-394348310442/3"
     *         },
     *         ...
     *       ]
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the broadcaster’s custom chat badges.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a valid app access token or user access token.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-channel-chat-badges
     */
    getChannelChatBadges: async (
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetChannelChatBadgesResponse> => {
      const url = 'https://api.twitch.tv/helix/chat/badges';
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets the list of chat badges that Twitch created. Users can use these badges in any channel’s chat room. For information about chat badges, see [Twitch Chat Badges Guide](https://help.twitch.tv/s/article/twitch-chat-badges-guide).
     *
     * ## Authorization
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/chat/badges/global`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the list of global chat badges.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/chat/badges/global' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     ...
     *     {
     *       "set_id": "vip",
     *       "versions": [
     *         {
     *           "id": "1",
     *           "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/1",
     *           "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/2",
     *           "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/3"
     *         }
     *       ]
     *     },
     *     ...
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of global chat badges.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a valid app access token or user access token.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-global-chat-badges
     */
    getGlobalChatBadges: async (
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetGlobalChatBadgesResponse> => {
      const url = 'https://api.twitch.tv/helix/chat/badges/global';
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets the broadcaster’s chat settings.
     *
     * For an overview of chat settings, see [Chat Commands for Broadcasters and Moderators](https://help.twitch.tv/s/article/chat-commands#AllMods) and [Moderator Preferences](https://help.twitch.tv/s/article/setting-up-moderation-for-your-twitch-channel#modpreferences).
     *
     * ## Authorization
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/chat/settings`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/chat/settings?broadcaster_id=1234' \
     * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_id": "713936733",
     *       "slow_mode": false,
     *       "slow_mode_wait_time": null,
     *       "follower_mode": true,
     *       "follower_mode_duration": 0,
     *       "subscriber_mode": false,
     *       "emote_mode": false,
     *       "unique_chat_mode": false,
     *       "non_moderator_chat_delay": true,
     *       "non_moderator_chat_delay_duration": 4
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the broadcaster’s chat settings.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a valid app access token or user access token.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-chat-settings
     */
    getChatSettings: async (
      params: GetChatSettingsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetChatSettingsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/chat/settings?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Updates the broadcaster’s chat settings.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the `moderator:manage:chat_settings` scope.
     *
     * ## URL
     *
     * `PATCH https://api.twitch.tv/helix/chat/settings`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * This example disables `follower_mode` by setting it to false.
     *
     * ```
     * curl -X PATCH 'https://api.twitch.tv/helix/chat/settings?broadcaster_id=1234&moderator_id=5678' \
     * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh' \
     * -H 'Content-Type: application/json' \
     * -d '{"follower_mode": false}'
     *
     * ```
     *
     * To change a setting’s value, the request must specify the mode field and its corresponding value field. For example, to change the value of `slow_mode_wait_time`, the request must also specify `slow_mode` even if it’s already **true**.
     *
     * ```
     * curl -X PATCH 'https://https://api.twitch.tv/helix/chat/settings?broadcaster_id=1234&moderator_id=5678' \
     * -H 'Authorization: Bearer 8j9yq1kpl92w96trqy7sintbsihdp' \
     * -H 'Client-Id: 0vql4f5yqu4spo6zrz1pkumcqwa9c' \
     * -H 'Content-Type: application/json' \
     * -d '{"slow_mode": true, "slow_mode_wait_time": 10}'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_id": "1234",
     *       "moderator_id": "5678",
     *       "slow_mode": true,
     *       "slow_mode_wait_time": 10,
     *       "follower_mode": false,
     *       "follower_mode_duration": null,
     *       "subscriber_mode": false,
     *       "emote_mode": false,
     *       "unique_chat_mode": false,
     *       "non_moderator_chat_delay": false,
     *       "non_moderator_chat_delay_duration": null
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully updated the broadcaster’s chat settings.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The _moderator\_id_ query parameter is required.
     * * If _slow\_mode_ is **true**, the `slow_mode_wait_time` field must be set to a valid value.
     * * If `follower_mode` is **true**, the `follower_mode_duration` field must be set to a valid value.
     * * If `non_moderator_chat_delay` is **true**, the `non_moderator_chat_delay_duration` field must be set to a valid value.
     *
     * ### 401 Unauthorized
     *
     * * The ID in the _moderator\_id_ query parameter must match the user ID in the user access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **moderator:manage:chat\_settings** scope.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the client ID in the access token.
     *
     * ### 403 Forbidden
     *
     * * The user in the _moderator\_id_ query parameter must have moderator privileges in the broadcaster's channel.
     *
     * @see https://dev.twitch.tv/docs/api/reference#update-chat-settings
     */
    updateChatSettings: async (
      params: UpdateChatSettingsParams,
      body: UpdateChatSettingsBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<UpdateChatSettingsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/chat/settings?${s}`;
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Sends an announcement to the broadcaster’s chat room.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **moderator:manage:announcements** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/chat/announcements`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Sends an announcement to the broadcaster’s chat room.
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/chat/announcements?broadcaster_id=11111&moderator_id=44444' \
     * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t' \
     * -H 'Content-Type: application/json' \
     * -d '{"message":"Hello chat!","color":"purple"}'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204No Content
     *
     * Successfully sent the announcement.
     *
     * ### 400Bad Request
     *
     * * The `message` field in the request's body is required.
     * * The specified color is not valid.
     *
     * ### 401Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token is missing the **moderator:manage:announcements** scope.
     * * The OAuth token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#send-chat-announcement
     */
    sendChatAnnouncement: async (
      params: SendChatAnnouncementParams,
      body: SendChatAnnouncementBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/chat/announcements?${s}`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Gets the color used for the user’s name in chat.
     *
     * ## Authorization
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/chat/color`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the chat color code used by the specified users.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/chat/color?user_id=11111&user_id=44444' \
     * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "user_id": "11111",
     *       "user_name": "SpeedySpeedster1",
     *       "user_login": "speedyspeedster1",
     *       "color": "#9146FF"
     *     },
     *     {
     *       "user_id": "44444",
     *       "user_name": "SpeedySpeedster2",
     *       "user_login": "speedyspeedster2",
     *       "color": ""
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200OK
     *
     * Successfully retrieved the chat color used by the specified users.
     *
     * ### 400Bad Request
     *
     * * The ID in the _user\_id_ query parameter is not valid.
     *
     * ### 401Unauthorized
     *
     * * The Authorization header is required and must contain an app access token or user access token.
     * * The OAuth token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-user-chat-color
     */
    getUserChatColor: async (
      params: GetUserChatColorParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetUserChatColorResponse> => {
      const s = getSearchParams(params, ["user_id"]);
      const url = `https://api.twitch.tv/helix/chat/color?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Updates the color used for the user’s name in chat.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **user:manage:chat\_color** scope.
     *
     * ## URL
     *
     * `PUT https://api.twitch.tv/helix/chat/color`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Uses a named color to change the color that the user uses for their name in chat.
     *
     * ```
     * curl -X PUT 'https://api.twitch.tv/helix/chat/color?user_id=123&color=blue' \
     * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
     *
     * ```
     *
     * Uses a color Hex code to change the color that the user uses for their name in chat.
     *
     * ```
     * curl -X PUT 'https://api.twitch.tv/helix/chat/color?user_id=123&color=%239146FF' \
     * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204No Content
     *
     * Successfully updated the user’s chat color.
     *
     * ### 400Bad Request
     *
     * * The ID in the _user\_id_ query parameter is not valid.
     * * The _color_ query parameter is required.
     * * The named color in the _color_ query parameter is not valid.
     * * To specify a Hex color code, the user must be a Turbo or Prime user.
     *
     * ### 401Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **user:manage:chat\_color** scope.
     * * The OAuth token is not valid.
     * * The ID in the _user\_id_ query parameter must match the user ID in the access token.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#update-user-chat-color
     */
    updateUserChatColor: async (
      params: UpdateUserChatColorParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/chat/color?${s}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  clips = {
    /**
     * Creates a clip from the broadcaster’s stream.
     *
     * This API captures up to 90 seconds of the broadcaster’s stream. The 90 seconds spans the point in the stream from when you called the API. For example, if you call the API at the 4:00 minute mark, the API captures from approximately the 3:35 mark to approximately the 4:05 minute mark. Twitch tries its best to capture 90 seconds of the stream, but the actual length may be less. This may occur if you begin capturing the clip near the beginning or end of the stream.
     *
     * By default, Twitch publishes up to the last 30 seconds of the 90 seconds window and provides a default title for the clip. To specify the title and the portion of the 90 seconds window that’s used for the clip, use the URL in the response’s `edit_url` field. You can specify a clip that’s from 5 seconds to 60 seconds in length. The URL is valid for up to 24 hours or until the clip is published, whichever comes first.
     *
     * Creating a clip is an asynchronous process that can take a short amount of time to complete. To determine whether the clip was successfully created, call [Get Clips](https://dev.twitch.tv/docs/api/reference#get-clips) using the clip ID that this request returned. If Get Clips returns the clip, the clip was successfully created. If after 15 seconds Get Clips hasn’t returned the clip, assume it failed.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **clips:edit** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/clips`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/clips?broadcaster_id=44322889' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *    "data":
     *    [{
     *       "id": "FiveWordsForClipSlug",
     *       "edit_url": "http://clips.twitch.tv/FiveWordsForClipSlug/edit"
     *    }]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 202 Accepted
     *
     * Successfully started the clip process.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The ID in the _broadcaster\_id_ query parameter was not found.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify user access token.
     * * The user access token must include the **clips:edit** scope.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * ### 403 Forbidden
     *
     * * The broadcaster has restricted the ability to capture clips to followers and/or subscribers only.
     * * The specified broadcaster has not enabled clips on their channel.
     *
     * ### 404 Not Found
     *
     * * The broadcaster in the _broadcaster\_id_ query parameter must be broadcasting live.
     *
     * @see https://dev.twitch.tv/docs/api/reference#create-clip
     */
    createClip: async (
      params: CreateClipParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<CreateClipResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/clips?${s}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets one or more video clips that were captured from streams. For information about clips, see [How to use clips](https://help.twitch.tv/s/article/how-to-use-clips).
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/clips`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets a clip by ID.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/clips?id=AwkwardHelplessSalamanderSwiftRage' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "AwkwardHelplessSalamanderSwiftRage",
     *       "url": "https://clips.twitch.tv/AwkwardHelplessSalamanderSwiftRage",
     *       "embed_url": "https://clips.twitch.tv/embed?clip=AwkwardHelplessSalamanderSwiftRage",
     *       "broadcaster_id": "67955580",
     *       "broadcaster_name": "ChewieMelodies",
     *       "creator_id": "53834192",
     *       "creator_name": "BlackNova03",
     *       "video_id": "205586603",
     *       "game_id": "488191",
     *       "language": "en",
     *       "title": "babymetal",
     *       "view_count": 10,
     *       "created_at": "2017-11-30T22:34:18Z",
     *       "thumbnail_url": "https://clips-media-assets.twitch.tv/157589949-preview-480x272.jpg",
     *       "duration": 60,
     *       "vod_offset": 480
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ### Example Request
     *
     * Gets the broadcaster’s top 5 clips based on views.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/clips?broadcaster_id=1234&first=5' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "RandomClip1",
     *       "url": "https://clips.twitch.tv/AwkwardHelplessSalamanderSwiftRage",
     *       "embed_url": "https://clips.twitch.tv/embed?clip=RandomClip1",
     *       "broadcaster_id": "1234",
     *       "broadcaster_name": "JJ",
     *       "creator_id": "123456",
     *       "creator_name": "MrMarshall",
     *       "video_id": "",
     *       "game_id": "33103",
     *       "language": "en",
     *       "title": "random1",
     *       "view_count": 10,
     *       "created_at": "2017-11-30T22:34:18Z",
     *       "thumbnail_url": "https://clips-media-assets.twitch.tv/157589949-preview-480x272.jpg",
     *       "duration": 12.9,
     *       "vod_offset": 1957
     *     },
     *     ...
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiIjpudWxsLCJhIjoiIn0"
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of video clips.
     *
     * ### 400 Bad Request
     *
     * * The _id_ or _game\_id_ or _broadcaster\_id_ query parameter is required.
     * * The _id_, _game\_id_, and _broadcaster\_id_ query parameters are mutually exclusive; you may specify only one of them.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain an app access token or user access token.
     * * The OAuth token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.
     *
     * ### 404 Not Found
     *
     * * The ID in _game\_id_ was not found.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-clips
     */
    getClips: async (
      params: GetClipsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetClipsResponse> => {
      const s = getSearchParams(params, ["id"]);
      const url = `https://api.twitch.tv/helix/clips?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  entitlements = {
    /**
     * Gets the status of one or more redemption codes for a Bits reward. Only client IDs approved by Twitch may request a redemption code’s status.
     *
     * Rate limit: You may send at most one request per second per user.
     *
     * ## Authentication
     *
     * Requires an app access token. The client ID in the access token must match a client ID that Twitch has approved to provide entitlements.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/entitlements/codes`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/entitlements/codes?code=KUHXV-4GXYP-AKAKK&code=XZDDZ-5SIQR-RT5M3&user_id=156900877' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data":[
     *     {
     *       "code":"KUHXV-4GXYP-AKAKK",
     *       "status":"UNUSED"
     *     },
     *     {
     *       "code":"XZDDZ-5SIQR-RT5M3",
     *       "status":"ALREADY_CLAIMED"
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the statuses of the specified codes.
     *
     * ### 400 Bad Request
     *
     * * The _user\_id_ query parameter is required.
     * * The _code_ query parameter is required.
     * * The _code_ query parameter may not contain a comma-delimited list of codes. Instead, repeat the parameter for each code. For example, `code=1234&code=5678`.
     * * The _code_ query parameter may not contain an empty string.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the access token.
     *
     * ### 403 Forbidden
     *
     * * The API accepts only app access tokens.
     * * The client ID specified in the access token is not approved for getting the statuses of the redemption codes.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-code-status
     */
    getCodeStatus: async (
      params: GetCodeStatusParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetCodeStatusResponse> => {
      const s = getSearchParams(params, ["code"]);
      const url = `https://api.twitch.tv/helix/entitlements/codes?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets an organization’s list of entitlements that have been granted to a game, a user, or both.
     *
     * The following table identifies the request parameters that you may specify based on the type of access token used.
     *
     * | Access token type | Parameter | Description |
     * | - | - | - |
     * | App | None | If you don’t specify request parameters, the request returns all entitlements that your organization owns. |
     * | App | user_id | The request returns all entitlements for any game that the organization granted to the specified user. |
     * | App | user_id, game_id | The request returns all entitlements that the specified game granted to the specified user. |
     * | App | game_id | The request returns all entitlements that the specified game granted to all entitled users. |
     * | User | None | If you don’t specify request parameters, the request returns all entitlements for any game that the organization granted to the user identified in the access token. |
     * | User | user_id | Invalid. |
     * | User | user_id, game_id | Invalid. |
     * | User | game_id | The request returns all entitlements that the specified game granted to the user identified in the access token. |
     *
     *
     * ## Authentication
     *
     * Requires an app access token or user access token. The client ID in the access token must own the game.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/entitlements/drops`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -H GET 'helix/entitlements/drops?user_id=25009227&game_id=33214' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "fb78259e-fb81-4d1b-8333-34a06ffc24c0",
     *       "benefit_id": "74c52265-e214-48a6-91b9-23b6014e8041",
     *       "timestamp": "2019-01-28T04:17:53.325Z",
     *       "user_id": "25009227",
     *       "game_id": "33214",
     *       "fulfillment_status": "CLAIMED",
     *       "updated_at": "2019-01-28T04:17:53.325Z"
     *     },
     *     {
     *       "id": "862750a5-265e-4ab6-9f0a-c64df3d54dd0",
     *       "benefit_id": "74c52265-e214-48a6-91b9-23b6014e8041",
     *       "timestamp": "2019-01-28T04:16:53.325Z",
     *       "user_id": "25009227",
     *       "game_id": "33214",
     *       "fulfillment_status": "CLAIMED",
     *       "updated_at": "2021-06-15T04:16:53.325Z"
     *     },
     *     {
     *       "id": "d8879baa-3966-4d10-8856-15fdd62cce02",
     *       "benefit_id": "cdfdc5c3-65a2-43bc-8767-fde06eb4ab2c",
     *       "timestamp": "2019-01-28T04:15:53.325Z",
     *       "user_id": "25009227",
     *       "game_id": "33214",
     *       "fulfillment_status": "FULFILLED",
     *       "updated_at": "2019-01-28T04:17:53.325Z"
     *     },
     *     ...
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiIjpudW..."
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the entitlements.
     *
     * ### 400 Bad Request
     *
     * * The value in the _fulfillment\_status_ query parameter is not valid.
     * * The ID in the _user\_id_ query parameter must match the user ID in the user access token.
     * * The client in the access token is not associated with a known organization.
     * * The owner of the client in the access token is not a member of the organization.
     *
     * ### 401 Unauthorized
     *
     * * The ID in the Client-Id header must match the Client ID in the access token.
     * * The Authorization header is required and must specify an app access token or user access token.
     * * The access token is not valid.
     *
     * ### 403 Fobidden
     *
     * * The organization associated with the client in the access token must own the game specified in the _game\_id_ query parameter.
     * * The organization associated with the client in the access token must own the entitlements specified in the _id_ query parameter.
     *
     * ### 500 Internal server error
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-drops-entitlements
     */
    getDropsEntitlements: async (
      params: GetDropsEntitlementsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetDropsEntitlementsResponse> => {
      const s = getSearchParams(params, ["id"]);
      const url = `https://api.twitch.tv/helix/entitlements/drops?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Updates the Drop entitlement’s fulfillment status.
     *
     * The following table identifies which entitlements are updated based on the type of access token used.
     *
     * | Access token type | Data that’s updated |
     * | - | - |
     * | App | Updates all entitlements with benefits owned by the organization in the access token. |
     * | User | Updates all entitlements owned by the user in the access token and where the benefits are owned by the organization in the access token. |
     *
     *
     * ## Authentication
     *
     * Requires an app access token or user access token. The client ID in the access token must own the game.
     *
     * ## URL
     *
     * `PATCH https://api.twitch.tv/helix/entitlements/drops`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -H PATCH 'helix/entitlements/drops' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "fulfillment_status": "FULFILLED",
     *   "entitlement_ids": [
     *     "fb78259e-fb81-4d1b-8333-34a06ffc24c0",
     *     "862750a5-265e-4ab6-9f0a-c64df3d54dd0",
     *     "d8879baa-3966-4d10-8856-15fdd62cce02",
     *     "9a290126-7e3b-4f66-a9ae-551537893b65"
     *   ]
     * }'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "status": "SUCCESS",
     *       "ids": [
     *         "fb78259e-fb81-4d1b-8333-34a06ffc24c0", "862750a5-265e-4ab6-9f0a-c64df3d54dd0"
     *       ]
     *     },
     *     {
     *       "status": "UNAUTHORIZED",
     *       "ids": [
     *         "d8879baa-3966-4d10-8856-15fdd62cce02"
     *       ]
     *     },
     *     {
     *       "status": "UPDATE_FAILED",
     *       "ids": [
     *         "9a290126-7e3b-4f66-a9ae-551537893b65"
     *       ]
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully requested the updates. Check the response to determine which updates succeeded.
     *
     * ### 400 Bad Request
     *
     * * The value in the `fulfillment_status` field is not valid.
     * * The client in the access token is not associated with a known organization.
     * * The owner of the client in the access token is not a member of the organization.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token or user access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the access token.
     *
     * ### 500 Internal server error
     *
     * @see https://dev.twitch.tv/docs/api/reference#update-drops-entitlements
     */
    updateDropsEntitlements: async (
      accessToken = '',
      clientId = '',
    ): ApiResponse<UpdateDropsEntitlementsResponse> => {
      const url = 'https://api.twitch.tv/helix/entitlements/drops';
      const response = await fetch(url, {
        method: 'PATCH',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Redeems one or more redemption codes. Redeeming a code credits the user’s account with the entitlement; for example, a Bits reward earned by playing a game.
     *
     * Rate limit: You may send at most one request per second per user.
     *
     * ## Authentication
     *
     * Requires an app access token. Only client IDs approved by Twitch may redeem codes on behalf of any Twitch user account.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/entitlements/codes`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/entitlements/codes?user_id=12345&code=8CD5P-V3J92-2S6JY&code=PUN4G-HYFVP-MMFET' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data":[
     *     {
     *       "code":"8CD5P-V3J92-2S6JY",
     *       "status":"SUCCESSFULLY_REDEEMED"
     *     },
     *     {
     *       "code":"PUN4G-HYFVP-MMFET",
     *       "status":"ALREADY_CLAIMED"
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully redeemed the code.
     *
     * ### 400 Bad Request
     *
     * * The _user\_id_ query parameter is required.
     * * The _code_ query parameter is required.
     * * The _code_ query parameter may not contain a comma-delimited list of codes. Instead, repeat the parameter for each code. For example, `code=1234&code=5678`.
     * * The _code_ query parameter may not contain an empty string.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the access token.
     *
     * ### 403 Forbidden
     *
     * * The API accepts only app access tokens.
     * * The client specified in the access token is not approved to redeem codes.
     *
     * ### 500 Internal server error
     *
     * @see https://dev.twitch.tv/docs/api/reference#redeem-code
     */
    redeemCode: async (
      params: RedeemCodeParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<RedeemCodeResponse> => {
      const s = getSearchParams(params, ["code"]);
      const url = `https://api.twitch.tv/helix/entitlements/codes?${s}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  extensions = {
    /**
     * Gets the specified configuration segment from the specified extension.
     *
     * **Rate Limits**: You may retrieve each segment a maximum of 20 times per minute.
     *
     * ## Authorization
     *
     * Requires a signed JSON Web Token (JWT) created by an Extension Backend Service (EBS). For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt). The signed JWT must include the `role`, `user_id`, and `exp` fields (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)). The `role` field must be set to _external_.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/extensions/configurations`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the global configuration segment from the specified extension. Because the request gets the global segment, it must not include the _broadcaster\_id_ query parameter.
     *
     * ```
     *
     * curl -X GET 'https://api.twitch.tv/helix/extensions/configurations?extension_id=<your extension id>&segment=global' \
     * -H 'Authorization: Bearer <your JWT token>' \
     * -H 'Client-Id: <your client ID>'
     *
     *
     * ```
     *
     * ### Example Response
     *
     * The following example shows a global segment that contains a plain-text string in the `content` field.
     *
     * ```
     *
     * {
     *   "data": [
     *     {
     *       "segment": "global",
     *       "content": "hello config!",
     *       "version": "0.0.1"
     *     }
     *   ]
     * }
     *
     *
     * ```
     *
     * The following example shows a global segment that contains a string-encoded JSON object in the `content` field.
     *
     * ```
     *
     * {
     *   "data": [
     *     {
     *       "segment": "global",
     *       "content": "{\"foo\":\"bar\"}",
     *       "version": "0.0.1"
     *     }
     *   ]
     * }
     *
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the configurations.
     *
     * ### 400 Bad Request
     *
     * * The _extension\_id_ query parameter is required.
     * * The value in the _segment_ query parameter is not valid.
     * * The _broadcaster\_id_ query parameter is required if the _segment_ query parameter is set to broadcaster or developer.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a JWT token.
     * * The JWT token is not valid.
     * * The Client-Id header is required.
     *
     * ### 429 Too many requests
     *
     * * The app exceeded the number of requests that it may make per minute. See Rate Limits above.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-extension-configuration-segment
     */
    getExtensionConfigurationSegment: async (
      params: GetExtensionConfigurationSegmentParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetExtensionConfigurationSegmentResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/extensions/configurations?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Updates a configuration segment. The segment is limited to 5 KB. Extensions that are active on a channel do not receive the updated configuration.
     *
     * **Rate Limits**: You may update the configuration a maximum of 20 times per minute.
     *
     * ## Authorization
     *
     * Requires a signed JSON Web Token (JWT) created by an Extension Backend Service (EBS). For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt). The signed JWT must include the `role`, `user_id`, and `exp` fields (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)). The `role` field must be set to _external_.
     *
     * ## URL
     *
     * `PUT https://api.twitch.tv/helix/extensions/configurations`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X PUT 'https://api.twitch.tv/helix/extensions/configurations' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "extension_id": "uo6dggojyb8d6soh92zknwmi5ej1q2",
     *   "segment": "global",
     *   "version": "0.0.1",
     *   "content": "hello config!"
     * }'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully updated the configuration.
     *
     * ### 400 Bad Request
     *
     * * The `broadcaster_id` field is required if `segment` is set to developer or broadcaster.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a JWT token.
     * * The JWT token is not valid.
     * * The Client-Id header is required.
     *
     * @see https://dev.twitch.tv/docs/api/reference#set-extension-configuration-segment
     */
    setExtensionConfigurationSegment: async (
      body: SetExtensionConfigurationSegmentBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const url = 'https://api.twitch.tv/helix/extensions/configurations';
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Updates the extension’s required\_configuration string. Use this endpoint if your extension requires the broadcaster to configure the extension before activating it (to require configuration, you must select **Custom/My Own Service** in Extension [Capabilities](https://dev.twitch.tv/docs/extensions/life-cycle/#capabilities)). For more information, see [Required Configurations](https://dev.twitch.tv/docs/extensions/building#required-configurations) and [Setting Required Configuration](https://dev.twitch.tv/docs/extensions/building#setting-required-configuration-with-the-configuration-service-optional).
     *
     * ## Authorization
     *
     * Requires a signed JSON Web Token (JWT) created by an EBS. For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt). The signed JWT must include the `role`, `user_id`, and `exp` fields (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)). Set the `role` field to _external_ and the `user_id` field to the ID of the user that owns the extension.
     *
     * ## URL
     *
     * `PUT https://api.twitch.tv/helix/extensions/required_configuration`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X PUT 'https://api.twitch.tv/helix/extensions/required_configuration?broadcaster_id=274637212' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "required_configuration": "RCS",
     *   "extension_id": "uo6dggojyb8d6soh92zknwmi5ej1q2",
     *   "extension_version": "0.0.1"
     * }'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 Not Found
     *
     * Successfully updated the extension’s required\_configuration string.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The `extension_id` field is required.
     * * The `extension_version` field is required.
     * * The `required_configuration` field is required.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a JWT token.
     * * The JWT token is not valid.
     * * The Client-Id header is required.
     *
     * @see https://dev.twitch.tv/docs/api/reference#set-extension-required-configuration
     */
    setExtensionRequiredConfiguration: async (
      params: SetExtensionRequiredConfigurationParams,
      body: SetExtensionRequiredConfigurationBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/extensions/required_configuration?${s}`;
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Sends a message to one or more viewers. You can send messages to a specific channel or to all channels where your extension is active. This endpoint uses the same mechanism as the [send](https://dev.twitch.tv/docs/extensions/reference#send) JavaScript helper function used to send messages.
     *
     * **Rate Limits**: You may send a maximum of 100 messages per minute per combination of extension client ID and broadcaster ID.
     *
     * ## Authorization
     *
     * Requires a signed JSON Web Token (JWT) created by an Extension Backend Service (EBS). For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt). The signed JWT must include the `role`, `user_id`, and `exp` fields (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)) along with the `channel_id` and `pubsub_perms` fields. The `role` field must be set to _external_.
     *
     * To send the message to a specific channel, set the `channel_id` field in the JWT to the channel’s ID and set the `pubsub_perms.send` array to _broadcast_.
     *
     * ```
     * {
     *   "exp": 1503343947,
     *   "user_id": "27419011",
     *   "role": "external",
     *   "channel_id": "27419011",
     *   "pubsub_perms": {
     *     "send":[
     *       "broadcast"
     *     ]
     *   }
     * }
     *
     * ```
     *
     * To send the message to all channels on which your extension is active, set the `channel_id` field to _all_ and set the `pubsub_perms.send` array to _global_.
     *
     * ```
     * {
     *   "exp": 1503343947,
     *   "user_id": "27419011",
     *   "role": "external",
     *   "channel_id": "all",
     *   "pubsub_perms": {
     *     "send":[
     *       "global"
     *     ]
     *   }
     * }
     *
     * ```
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/extensions/pubsub`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/extensions/pubsub' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "message": "hello world!",
     *   "broadcaster_id": "141981764",
     *   "target": ["broadcast"]
     * }'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully sent the message.
     *
     * ### 400 Bad Request
     *
     * * The `broadcaster_id` field in the request's body may only be set if the `is_global_broadcast` field is set to **false**.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a JWT token.
     * * The JWT token is not valid.
     * * The Client-Id header is required.
     *
     * ### 422 Unprocessable Entity
     *
     * * The message is too large.
     *
     * @see https://dev.twitch.tv/docs/api/reference#send-extension-pubsub-message
     */
    sendExtensionPubSubMessage: async (
      body: SendExtensionPubSubMessageBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const url = 'https://api.twitch.tv/helix/extensions/pubsub';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Gets a list of broadcasters that are streaming live and have installed or activated the extension.
     *
     * It may take a few minutes for the list to include or remove broadcasters that have recently gone live or stopped broadcasting.
     *
     * ## Authorization
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/extensions/live`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/extensions/live?extension_id=uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_id": "252766116",
     *       "broadcaster_name": "swoosh_xii",
     *       "game_name": "Tom Clancy's Rainbow Six Siege",
     *       "game_id": "460630",
     *       "title": "[PS4] ITA/ENG UNRANKED CHILLIN' (SUB 1/15) - !instagram !donation !sens !team !youtube"
     *     },
     *     {
     *       "broadcaster_id": "264525686",
     *       "broadcaster_name": "gaddem_",
     *       "game_name": "For Honor",
     *       "game_id": "490382",
     *       "title": "any Kätzchen ? - 680 Rep + > Kompetitive Kitten"
     *     },
     *     {
     *       "broadcaster_id": "264787895",
     *       "broadcaster_name": "LenhadorGameplay",
     *       "game_name": "For Honor",
     *       "game_id": "490382",
     *       "title": "Vazou o novo personagem! *Triste*"
     *     }
     *   ],
     *   "pagination": "YVc1emRHRnNiQ015TmpJek5qazVOVHBoYWpKbGRIZDFaR0Z5YjNCMGN6UTJNMkZ1TUdwM2FHWnBZbm8yYW5rNjoy"
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of broadcasters.
     *
     * ### 400 Bad Request
     *
     * * The _extension\_id_ query parameter is required.
     * * The pagination cursor is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token or user access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the client ID in the access token.
     *
     * ### 404 Not Found
     *
     * * The extension specified in the _extension\_id_ query parameter was not found or it's not being used in a live stream.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-extension-live-channels
     */
    getExtensionLiveChannels: async (
      params: GetExtensionLiveChannelsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetExtensionLiveChannelsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/extensions/live?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets an extension’s list of shared secrets.
     *
     * ## Authorization
     *
     * Requires a signed JSON Web Token (JWT) created by an Extension Backend Service (EBS). For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt). The signed JWT must include the `role`, `user_id`, and `exp` fields (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)). The `role` field must be set to _external_.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/extensions/jwt/secrets`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/extensions/jwt/secrets?extension_id=uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "format_version": 1,
     *       "secrets": [
     *         {
     *           "content": "secret",
     *           "active_at": "2021-03-29T06:58:40.858343036Z",
     *           "expires_at": "2121-03-05T06:58:40.858343036Z"
     *         }
     *       ]
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of secrets.
     *
     * ### 400 Bad Request
     *
     * * The _extension\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a JWT token.
     * * The JWT token is not valid.
     * * The Client-Id header is required.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-extension-secrets
     */
    getExtensionSecrets: async (
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetExtensionSecretsResponse> => {
      const url = 'https://api.twitch.tv/helix/extensions/jwt/secrets';
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Creates a shared secret used to sign and verify JWT tokens. Creating a new secret removes the current secrets from service. Use this function only when you are ready to use the new secret it returns.
     *
     * ## Authorization
     *
     * Requires a signed JSON Web Token (JWT) created by an Extension Backend Service (EBS). For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt). The signed JWT must include the `role`, `user_id`, and `exp` fields (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)). The `role` field must be set to _external_.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/extensions/jwt/secrets`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/extensions/jwt/secrets?extension_id=uo6dggojyb8d6soh92zknwmi5ej1q2&delay=600' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "format_version": 1,
     *       "secrets": [
     *         {
     *           "content": "old-secret",
     *           "active_at": "2021-03-29T06:58:40.858343036Z",
     *           "expires_at": "2021-04-22T05:21:54.99261682Z"
     *         },
     *         {
     *           "content": "new-secret",
     *           "active_at": "2021-04-22T04:16:54.996365329Z",
     *           "expires_at": "2121-03-29T04:16:54.996365329Z"
     *         }
     *       ]
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully created the new secret.
     *
     * ### 400 Bad Request
     *
     * * The _extension\_id_ query parameter is required.
     * * The delay specified in the _delay_ query parameter is too short.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a JWT token.
     * * The JWT token is not valid.
     * * The Client-Id header is required.
     *
     * @see https://dev.twitch.tv/docs/api/reference#create-extension-secret
     */
    createExtensionSecret: async (
      params: CreateExtensionSecretParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<CreateExtensionSecretResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/extensions/jwt/secrets?${s}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Sends a message to the specified broadcaster’s chat room. The extension’s name is used as the username for the message in the chat room. To send a chat message, your extension must enable **Chat Capabilities** (under your extension’s **Capabilities** tab).
     *
     * **Rate Limits**: You may send a maximum of 12 messages per minute per channel.
     *
     * ## Authorization
     *
     * Requires a signed JSON Web Token (JWT) created by an Extension Backend Service (EBS). For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt). The signed JWT must include the `role` and `user_id` fields (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)). The `role` field must be set to _external_.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/extensions/chat`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/extensions/chat?broadcaster_id=237757755' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "text": "Hello",
     *   "extension_id": "uo6dggojyb8d6soh92zknwmi5ej1q2",
     *   "extension_version": "0.0.9"
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully sent the chat message.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The `extension_id` field in the request's body is required.
     * * The `extension_version` field in the request's body is required.
     * * The `text` field in the request's body is required.
     * * The message is too long.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a JWT token.
     * * The ID in the _broadcaster\_id_ query parameter must match the `channel_id` claim in the JWT.
     * * The JWT token is not valid.
     * * The Client-Id header is required.
     *
     * @see https://dev.twitch.tv/docs/api/reference#send-extension-chat-message
     */
    sendExtensionChatMessage: async (
      params: SendExtensionChatMessageParams,
      body: SendExtensionChatMessageBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/extensions/chat?${s}`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Gets information about an extension.
     *
     * ## Authorization
     *
     * Requires a signed JSON Web Token (JWT) created by an Extension Backend Service (EBS). For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt). The signed JWT must include the `role` field (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)), and the `role` field must be set to _external_.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/extensions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/extensions?extension_id=uo6dggojyb8d6soh92zknwmi5ej1q2&extension_version=0.0.9' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "author_name": "Twitch Developers",
     *       "bits_enabled": true,
     *       "can_install": false,
     *       "configuration_location": "hosted",
     *       "description": "An extension for testing all the features that we add to extensions",
     *       "eula_tos_url": "",
     *       "has_chat_support": true,
     *       "icon_url": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/logob6c995d8-8b45-48cc-a748-b256e92ac1cd",
     *       "icon_urls": {
     *         "100x100": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/logob6c995d8-8b45-48cc-a748-b256e92ac1cd",
     *         "24x24": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/taskbar905b19da-e7e5-4d8f-beb7-f543a861ac1e",
     *         "300x200": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/discoveryd9545b2c-5474-46d7-a523-1c3835d862ce"
     *       },
     *       "id": "pgn0bjv51epi7eaekt53tovjnc82qo",
     *       "name": "Official Developers Demo",
     *       "privacy_policy_url": "",
     *       "request_identity_link": true,
     *       "screenshot_urls": [
     *         "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/screenshotbdec475d-3d2f-4378-b334-941dfddc897a"
     *       ],
     *       "state": "Released",
     *       "subscriptions_support_level": "optional",
     *       "summary": "Test ALL the extensions features!",
     *       "support_email": "dx-extensions-test-dev@justin.tv",
     *       "version": "0.0.9",
     *       "viewer_summary": "Test ALL the extensions features!",
     *       "views": {
     *         "mobile": {
     *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html"
     *         },
     *         "panel": {
     *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html",
     *           "height": 300,
     *           "can_link_external_content": false
     *         },
     *         "video_overlay": {
     *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html",
     *           "can_link_external_content": false
     *         },
     *         "component": {
     *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html",
     *           "aspect_width": 0,
     *           "aspect_height": 0,
     *           "aspect_ratio_x": 48000,
     *           "aspect_ratio_y": 36000,
     *           "autoscale": true,
     *           "scale_pixels": 1024,
     *           "target_height": 5333,
     *           "size": 0,
     *           "zoom": false,
     *           "zoom_pixels": 0,
     *           "can_link_external_content": false
     *         }
     *       },
     *       "allowlisted_config_urls": [],
     *       "allowlisted_panel_urls": []
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Sccessfully retrieved the list of extensions.
     *
     * ### 400 Bad Request
     *
     * * The _extension\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The request must specify the Authorization header.
     * * The Authorization header is required and must specify a JWT token.
     * * The JWT token is not valid.
     * * The request must specify the Client-Id header.
     *
     * ### 404 Not Found
     *
     * * The extension in the _extension\_id_ query parameter was not found.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-extensions
     */
    getExtensions: async (
      params: GetExtensionsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetExtensionsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/extensions?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets information about a released extension. Returns extensions whose `state` is Released.
     *
     * ## Authorization
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/extensions/released`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/extensions/released?extension_version=0.0.9&extension_id=uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "author_name": "Twitch Developer Experience",
     *       "bits_enabled": true,
     *       "can_install": false,
     *       "configuration_location": "hosted",
     *       "description": "An extension for testing all the features that we add to extensions",
     *       "eula_tos_url": "",
     *       "has_chat_support": true,
     *       "icon_url": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/logob6c995d8-8b45-48cc-a748-b256e92ac1cd",
     *       "icon_urls": {
     *         "100x100": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/logob6c995d8-8b45-48cc-a748-b256e92ac1cd",
     *         "24x24": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/taskbar905b19da-e7e5-4d8f-beb7-f543a861ac1e",
     *         "300x200": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/discoveryd9545b2c-5474-46d7-a523-1c3835d862ce"
     *       },
     *       "id": "pgn0bjv51epi7eaekt53tovjnc82qo",
     *       "name": "Official Developer Experience Demo",
     *       "privacy_policy_url": "",
     *       "request_identity_link": true,
     *       "screenshot_urls": [
     *         "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/screenshotbdec475d-3d2f-4378-b334-941dfddc897a"
     *       ],
     *       "state": "Released",
     *       "subscriptions_support_level": "optional",
     *       "summary": "Test ALL the extensions features!",
     *       "support_email": "dx-extensions-test-dev@justin.tv",
     *       "version": "0.0.9",
     *       "viewer_summary": "Test ALL the extensions features!",
     *       "views": {
     *         "mobile": {
     *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html"
     *         },
     *         "panel": {
     *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html",
     *           "height": 300,
     *           "can_link_external_content": false
     *         },
     *         "video_overlay": {
     *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html",
     *           "can_link_external_content": false
     *         },
     *         "component": {
     *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html",
     *           "aspect_width": 0,
     *           "aspect_height": 0,
     *           "aspect_ratio_x": 48000,
     *           "aspect_ratio_y": 36000,
     *           "autoscale": true,
     *           "scale_pixels": 1024,
     *           "target_height": 5333,
     *           "size": 0,
     *           "zoom": false,
     *           "zoom_pixels": 0,
     *           "can_link_external_content": false
     *         }
     *       },
     *       "allowlisted_config_urls": [],
     *       "allowlisted_panel_urls": []
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the extension.
     *
     * ### 400 Bad Request
     *
     * * The _extension\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header must specify an app access token or user access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the client ID in the access token.
     *
     * ### 404 Not Found
     *
     * * The extension specified in the _extension\_id_ query parameter was not found or is not released.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-released-extensions
     */
    getReleasedExtensions: async (
      params: GetReleasedExtensionsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetReleasedExtensionsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/extensions/released?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets the list of Bits products that belongs to the extension. The client ID in the app access token identifies the extension.
     *
     * ## Authorization
     *
     * Requires an app access token. The client ID in the app access token must be the extension’s client ID.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/bits/extensions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the extension’s products including its disabled and expired products.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/bits/extensions?should_include_all=true' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "sku": "1010",
     *       "cost": {
     *         "amount": 990,
     *         "type": "bits"
     *       },
     *       "in_development": true,
     *       "display_name": "Rusty Crate 2",
     *       "expiration": "2021-05-18T09:10:13.397Z",
     *       "is_broadcast": false
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of products.
     *
     * ### 400 Bad Request
     *
     * * The ID in the Client-Id header must belong to an extension.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token; you may not specify a user access token.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-extension-bits-products
     */
    getExtensionBitsProducts: async (
      params: GetExtensionBitsProductsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetExtensionBitsProductsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/bits/extensions?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Adds or updates a Bits product that the extension created. If the SKU doesn’t exist, the product is added. You may update all fields except the `sku` field.
     *
     * ## Authorization
     *
     * Requires an app access token. The client ID in the app access token must be the extension’s client ID.
     *
     * ## URL
     *
     * `PUT https://api.twitch.tv/helix/bits/extensions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X PUT 'https://api.twitch.tv/helix/bits/extensions' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Content-Type: application/json' \
     * -d {
     *   "sku": "1010",
     *   "cost": {
     *     "amount": 990,
     *     "type": "bits"
     *   },
     *   "in_development": true,
     *   "display_name": "Rusty Crate 2",
     *   "is_broadcast": true,
     *   "expiration": "2021-05-18T09:10:13.397Z"
     * }
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "sku": "1010",
     *       "cost": {
     *         "amount": 990,
     *         "type": "bits"
     *       },
     *       "in_development": true,
     *       "display_name": "Rusty Crate 2",
     *       "expiration": "2021-05-18T09:10:13.397Z",
     *       "is_broadcast": true
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully created the product.
     *
     * ### 400 Bad Request
     *
     * * The `sku` field is required.
     * * The value in the `sku` field is not valid. The SKU may contain only alphanumeric characters, dashes (-), underscores (\_), and periods (.).
     * * The `cost` object's `amount` field is required.
     * * The value in the `cost` object's `amount` field is not valid.
     * * The cost object's `type` field is required.
     * * The value in the `cost` object's `type` field is not valid.
     * * The `display_name` field is required.
     * * The ID in the Client-Id header must belong to the extension.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token; you may not specify a user access token.
     * * The OAuth token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the OAuth token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#update-extension-bits-product
     */
    updateExtensionBitsProduct: async (
      accessToken = '',
      clientId = '',
    ): ApiResponse<UpdateExtensionBitsProductResponse> => {
      const url = 'https://api.twitch.tv/helix/bits/extensions';
      const response = await fetch(url, {
        method: 'PUT',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  eventSub = {
    /**
     * Creates an EventSub subscription.
     *
     * ## Authentication
     *
     * If you use [webhooks to receive events](https://dev.twitch.tv/docs/eventsub/handling-webhook-events), the request must specify an app access token. The request will fail if you use a user access token. If the subscription type requires user authorization, the user must have granted your app (client ID) permissions to receive those events before you subscribe to them. For example, to subscribe to [channel.subscribe](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/#channelsubscribe) events, your app must get a user access token that includes the `channel:read:subscriptions` scope, which adds the required permission to your app access token’s client ID.
     *
     * If you use [WebSockets to receive events](https://dev.twitch.tv/docs/eventsub/handling-websocket-events), the request must specify a user access token. The request will fail if you use an app access token. If the subscription type requires user authorization, the token must include the required scope. However, if the subscription type doesn’t include user authorization, the token may include any scopes or no scopes.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/eventsub/subscriptions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Adds a user.update subscription.
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/eventsub/subscriptions' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
     * -H 'Content-Type: application/json' \
     * -d '{"type":"user.update","version":"1","condition":{"user_id":"1234"},"transport":{"method":"webhook","callback":"https://this-is-a-callback.com","secret":"s3cre7"}}'
     *
     * ```
     *
     * ```
     * # Twitch CLI example that adds a user.update subscription.
     *
     * twitch api post /eventsub/subscriptions -b '{"type":"user.update","version":"1","condition":{"user_id":"1234"},"transport":{"method":"webhook","callback":"https://this-is-a-callback.com","secret":"s3cre7"}}'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     *
     * {
     *   "data": [
     *     {
     *       "id": "26b1c993-bfcf-44d9-b876-379dacafe75a",
     *       "status": "webhook_callback_verification_pending",
     *       "type": "user.update",
     *       "version": "1",
     *       "condition": {
     *         "user_id": "1234"
     *       },
     *       "created_at": "2020-11-10T14:32:18.730260295Z",
     *       "transport": {
     *         "method": "webhook",
     *         "callback": "https://this-is-a-callback.com"
     *       },
     *       "cost": 1
     *     }
     *   ],
     *   "total": 1,
     *   "total_cost": 1,
     *   "max_total_cost": 10000
     * }
     *
     *
     * ```
     *
     * ## Response codes
     *
     * ### 202 Accepted
     *
     * Successfully accepted the subscription request.
     *
     * ### 400 Bad Request
     *
     * * The `condition` field is required.
     * * The user specified in the `condition` object does not exist.
     * * The `condition` object is missing one or more required fields.
     * * The combination of values in the `version` and `type` fields is not valid.
     * * The length of the string in the `secret` field is not valid.
     * * The URL in the transport's `callback` field is not valid. The URL must use the HTTPS protocol and the 443 port number.
     * * The value specified in the `method` field is not valid.
     * * The `callback` field is required if you specify the webhook transport method.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the client ID in the access token.
     *
     * ### 403 Forbidden
     *
     * * The subscription requires scopes that were not found in the client ID of the access token.
     *
     * ### 409 Conflict
     *
     * * A subscription already exists for the specified event type and condition combination.
     *
     * ### 429 Too Many Requests
     *
     * * The request exceeds the number of subscriptions that you may create with the same combination of `type` and `condition` values.
     *
     * @see https://dev.twitch.tv/docs/api/reference#create-eventsub-subscription
     */
    createEventSubSubscription: async (
      body: CreateEventSubSubscriptionBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<CreateEventSubSubscriptionResponse> => {
      const url = 'https://api.twitch.tv/helix/eventsub/subscriptions';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Deletes an EventSub subscription.
     *
     * ## Authentication
     *
     * If you use [webhooks to receive events](https://dev.twitch.tv/docs/eventsub/handling-webhook-events), the request must specify an app access token. The request will fail if you use a user access token.
     *
     * If you use [WebSockets to receive events](https://dev.twitch.tv/docs/eventsub/handling-websocket-events), the request must specify a user access token. The request will fail if you use an app access token. The token may include any scopes.
     *
     * ## URL
     *
     * `DELETE https://api.twitch.tv/helix/eventsub/subscriptions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Deletes the specified EventSub subscription.
     *
     * ```
     * curl -X DELETE
     * 'https://api.twitch.tv/helix/eventsub/subscriptions?id=26b1c993-bfcf-44d9-b876-379dacafe75a' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
     *
     * ```
     *
     * ```
     * # Twitch CLI example that deletes the specified subscription.
     *
     * twitch api delete /eventsub/subscriptions -q id=c839a466-034a-4d77-8d4d-c9a751516e7
     *
     * ```
     *
     * ### Example Response
     *
     * The response body is empty.
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully deleted the subscription.
     *
     * ### 400 Bad Request
     *
     * * The _id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the client ID in the access token.
     *
     * ### 404 Not Found
     *
     * * The subscription was not found.
     *
     * @see https://dev.twitch.tv/docs/api/reference#delete-eventsub-subscription
     */
    deleteEventSubSubscription: async (
      params: DeleteEventSubSubscriptionParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/eventsub/subscriptions?${s}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets a list of EventSub subscriptions that the client in the access token created.
     *
     * ## Authentication
     *
     * If you use [webhooks to receive events](https://dev.twitch.tv/docs/eventsub/handling-webhook-events), the request must specify an app access token. The request will fail if you use a user access token.
     *
     * If you use [WebSockets to receive events](https://dev.twitch.tv/docs/eventsub/handling-websocket-events), the request must specify a user access token. The request will fail if you use an app access token. The token may include any scopes.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/eventsub/subscriptions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets a list of EventSub subscriptions that you created. The list is ordered by the oldest subscription first.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/eventsub/subscriptions' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
     *
     * ```
     *
     * ```
     * # Twitch CLI example that gets a list of EventSub subscriptions that you created.
     *
     * twitch api get /eventsub/subscriptions
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "total": 2,
     *   "data": [
     *     {
     *       "id": "26b1c993-bfcf-44d9-b876-379dacafe75a",
     *       "status": "enabled",
     *       "type": "stream.online",
     *       "version": "1",
     *       "condition": {
     *         "broadcaster_user_id": "1234"
     *       },
     *       "created_at": "2020-11-10T20:08:33.12345678Z",
     *       "transport": {
     *         "method": "webhook",
     *         "callback": "https://this-is-a-callback.com"
     *       },
     *       "cost": 1
     *     },
     *     {
     *       "id": "35016908-41ff-33ce-7879-61b8dfc2ee16",
     *       "status": "webhook_callback_verification_pending",
     *       "type": "user.update",
     *       "version": "1",
     *       "condition": {
     *         "user_id": "1234"
     *       },
     *       "created_at": "2020-11-10T14:32:18.730260295Z",
     *       "transport": {
     *         "method": "webhook",
     *         "callback": "https://this-is-a-callback.com"
     *       },
     *       "cost": 0
     *     }
     *   ],
     *   "total_cost": 1,
     *   "max_total_cost": 10000,
     *   "pagination": {}
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the subscriptions.
     *
     * ### 400 Bad Request
     *
     * * The request may specify only one filter query parameter. For example, either _type_ or _status_ or _user\_id_.
     * * The value in the _type_ query parameter is not valid.
     * * The value in the _status_ query parameter is not valid.
     * * The cursor specified in the _after_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the client ID in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-eventsub-subscriptions
     */
    getEventSubSubscriptions: async (
      params: GetEventSubSubscriptionsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetEventSubSubscriptionsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/eventsub/subscriptions?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  games = {
    /**
     * Gets information about all broadcasts on Twitch.
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/games/top`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/games/top' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "493057",
     *       "name": "PLAYERUNKNOWN'S BATTLEGROUNDS",
     *       "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/PLAYERUNKNOWN%27S%20BATTLEGROUNDS-{width}x{height}.jpg"
     *     },
     *     ...
     *   ],
     *   "pagination":{"cursor":"eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6MjB9fQ=="}
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of broadcasts.
     *
     * ### 400 Bad Request
     *
     * * The value in the _first_ query parameter is not valid.
     * * The cursor in the _after_ or _before_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token or user access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the client ID in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-top-games
     */
    getTopGames: async (
      params: GetTopGamesParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetTopGamesResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/games/top?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets information about specified categories or games.
     *
     * You may get up to 100 categories or games by specifying their ID or name. You may specify all IDs, all names, or a combination of IDs and names. If you specify a combination of IDs and names, the total number of IDs and names must not exceed 100.
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/games`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/games?id=33214' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "33214",
     *       "name": "Fortnite",
     *       "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/33214-{width}x{height}.jpg"
     *     }
     *     ...
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiIjpudWxsLCJhIjp7IkN"
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the specified games.
     *
     * ### 400 Bad Request
     *
     * * The request must specify the _id_ and/or _name_ query parameter.
     * * The combined number of game IDs and game names that you specify in the request must not exceed 100.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token or user access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the client ID in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-games
     */
    getGames: async (
      params: GetGamesParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetGamesResponse> => {
      const s = getSearchParams(params, ["id","name"]);
      const url = `https://api.twitch.tv/helix/games?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  goals = {
    /**
     * Gets the broadcaster’s list of active goals. Use this endpoint to get the current progress of each goal.
     *
     * Instead of polling for the progress of a goal, consider [subscribing](https://dev.twitch.tv/docs/eventsub/manage-subscriptions) to receive notifications when a goal makes progress using the [channel.goal.progress](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelgoalprogress) subscription type. [Read More](https://dev.twitch.tv/docs/api/goals#requesting-event-notifications)
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:read:goals** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/goals`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/goals?broadcaster_id=141981764' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ```
     * # Twitch CLI example that gets the broadcaster's goals.
     *
     * twitch api get /goals -q broadcaster_id=141981764
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "1woowvbkiNv8BRxEWSqmQz6Zk92",
     *       "broadcaster_id": "141981764",
     *       "broadcaster_name": "TwitchDev",
     *       "broadcaster_login": "twitchdev",
     *       "type": "follower",
     *       "description": "Follow goal for Helix testing",
     *       "current_amount": 27062,
     *       "target_amount": 30000,
     *       "created_at": "2021-08-16T17:22:23Z"
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the broadcaster’s goals.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:read:goals** scope.
     * * The ID in _broadcaster\_id_ must match the user ID in the user access token.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-creator-goals
     */
    getCreatorGoals: async (
      params: GetCreatorGoalsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetCreatorGoalsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/goals?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  hypeTrain = {
    /**
     * Gets information about the broadcaster’s current or most recent Hype Train event.
     *
     * Instead of polling for events, consider [subscribing](https://dev.twitch.tv/docs/eventsub/manage-subscriptions) to Hype Train events ([Begin](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelhype%5Ftrainbegin), [Progress](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelhype%5Ftrainprogress), [End](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelhype%5Ftrainend)).
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **channel:read:hype\_train** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/hypetrain/events`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET
     * 'https://api.twitch.tv/helix/hypetrain/events?broadcaster_id=270954519&first=1' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "1b0AsbInCHZW2SQFQkCzqN07Ib2",
     *       "event_type": "hypetrain.progression",
     *       "event_timestamp": "2020-04-24T20:07:24Z",
     *       "version": "1.0",
     *       "event_data": {
     *         "broadcaster_id": "270954519",
     *         "cooldown_end_time": "2020-04-24T20:13:21.003802269Z",
     *         "expires_at": "2020-04-24T20:12:21.003802269Z",
     *         "goal": 1800,
     *         "id": "70f0c7d8-ff60-4c50-b138-f3a352833b50",
     *         "last_contribution": {
     *           "total": 200,
     *           "type": "BITS",
     *           "user": "134247454"
     *         },
     *         "level": 2,
     *         "started_at": "2020-04-24T20:05:47.30473127Z",
     *         "top_contributions": [
     *           {
     *             "total": 600,
     *             "type": "BITS",
     *             "user": "134247450"
     *           }
     *         ],
     *         "total": 600
     *       }
     *     }
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiIjpudWxsLCJhIjp7IkN1cnNvciI6IjI3MDk1NDUxOToxNTg3NzU4ODQ0OjFiMEFzYkluQ0haVzJTUUZRa0N6cU4wN0liMiJ9fQ"
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the broadcaster’s Hype Train events.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _broadcaster\_id_ must match the user ID in the user access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:read:hype\_train** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-hype-train-events
     */
    getHypeTrainEvents: async (
      params: GetHypeTrainEventsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetHypeTrainEventsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/hypetrain/events?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  moderation = {
    /**
     * Checks whether AutoMod would flag the specified message for review.
     *
     * AutoMod is a moderation tool that holds inappropriate or harassing chat messages for moderators to review. Moderators approve or deny the messages that AutoMod flags; only approved messages are released to chat. AutoMod detects misspellings and evasive language automatically. For information about AutoMod, see [How to Use AutoMod](https://help.twitch.tv/s/article/how-to-use-automod).
     *
     * **Rate Limits**: Rates are limited per channel based on the account type rather than per access token.
     *
     * | Account type | Limit per minute | Limit per hour |
     * | - | - | - |
     * | Normal | 5 | 50 |
     * | Affiliate | 10 | 100 |
     * | Partner | 30 | 300 |
     *
     *
     * The above limits are in addition to the standard [Twitch API rate limits](https://dev.twitch.tv/docs/api/guide#twitch-rate-limits). The rate limit headers in the response represent the Twitch rate limits and not the above limits.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **moderation:read** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/moderation/enforcements/status`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/moderation/enforcements/status?broadcaster_id=12345' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "data": [
     *     {
     *       "msg_id": "123",
     *       "msg_text": "Hello World!"
     *     },
     *     {
     *       "msg_id": "393",
     *       "msg_text": "Boooooo!"
     *     }
     *   ]
     * }'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "msg_id": "123",
     *       "is_permitted": true
     *     },
     *     {
     *       "msg_id": "393",
     *       "is_permitted": false
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully checked the messages.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The `data` field is required and the list must contain one or more messages to check.
     * * The `msg_id` field is required.
     * * The `msg_text` field is required.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **moderation:read** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * The ID in _broadcaster\_id_ must match the user ID in the user access token.
     *
     * ### 429 Too Many Requests
     *
     * * The broadcaster exceeded the number of chat message checks that they may make. See the endpoint's rate limits.
     *
     * @see https://dev.twitch.tv/docs/api/reference#check-automod-status
     */
    checkAutoModStatus: async (
      params: CheckAutoModStatusParams,
      body: CheckAutoModStatusBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<CheckAutoModStatusResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/moderation/enforcements/status?${s}`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Allow or deny the message that AutoMod flagged for review. For information about AutoMod, see [How to Use AutoMod](https://help.twitch.tv/s/article/how-to-use-automod).
     *
     * To get messages that AutoMod is holding for review, subscribe to the **automod-queue.<moderator\_id>.<channel\_id>** [topic](https://dev.twitch.tv/docs/pubsub#topics) using [PubSub](https://dev.twitch.tv/docs/pubsub). PubSub sends a notification to your app when AutoMod holds a message for review.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **moderator:manage:automod** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/moderation/automod/message`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/moderation/automod/message' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "user_id": "9327994",
     *   "msg_id": "836013710",
     *   "action": "ALLOW"
     * }'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully approved or denied the message.
     *
     * ### 400 Bad Request
     *
     * * The value in the `action` field is not valid.
     * * The `user_id` field is required.
     * * The `msg_id` field is required.
     * * The `action` field is required.
     *
     * ### 401 Unauthorized
     *
     * * The ID in `user_id` must match the user ID in the user access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **moderator:manage:automod** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * The user in _user\_id_ is not one of the broadcaster's moderators.
     *
     * ### 404 Not Found
     *
     * * The message specified in the `msg_id` field was not found.
     *
     * @see https://dev.twitch.tv/docs/api/reference#manage-held-automod-messages
     */
    manageHeldAutoModMessages: async (
      body: ManageHeldAutoModMessagesBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const url = 'https://api.twitch.tv/helix/moderation/automod/message';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Gets the broadcaster’s AutoMod settings. The settings are used to automatically block inappropriate or harassing messages from appearing in the broadcaster’s chat room.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **moderator:read:automod\_settings** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/moderation/automod/settings`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the broadcaster’s AutoMod settings.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/moderation/automod/settings?broadcaster_id=1234&moderator_id=5678' \
     * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
     *
     * ```
     *
     * ### Example Response
     *
     * Shows what the response looks like if the broadcaster hasn’t enabled AutoMod (none of the settings are set).
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_id": "1234",
     *       "moderator_id": "5678",
     *       "overall_level": null,
     *       "disability": 0,
     *       "aggression": 0,
     *       "sexuality_sex_or_gender": 0,
     *       "misogyny": 0,
     *       "bullying": 0,
     *       "swearing": 0,
     *       "race_ethnicity_or_religion": 0,
     *       "sex_based_terms": 0
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the broadcaster’s AutoMod settings.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The _moderator\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _moderator\_id_ must match the user ID in the user access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **moderator:read:automod\_settings** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * The user in _moderator\_id_ is not one of the broadcaster's moderators.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-automod-settings
     */
    getAutoModSettings: async (
      params: GetAutoModSettingsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetAutoModSettingsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/moderation/automod/settings?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Updates the broadcaster’s AutoMod settings. The settings are used to automatically block inappropriate or harassing messages from appearing in the broadcaster’s chat room.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **moderator:manage:automod\_settings** scope.
     *
     * ## URL
     *
     * `PUT https://api.twitch.tv/helix/moderation/automod/settings`
     *
     * ## Examples
     *
     * ### Example Request 1
     *
     * This example updates the `overall_level` setting to 3.
     *
     * ```
     * curl -X PUT 'https://api.twitch.tv/helix/moderation/automod/settings?broadcaster_id=1234&moderator_id=5678' \
     * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
     * ​​-H 'Content-Type: application/json' \
     * -d '{"overall_level":3}'
     *
     * ```
     *
     * ### Example Response 1
     *
     * Notice in the response that not all settings are set to level 3.
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_id": "1234",
     *       "moderator_id": "5678",
     *       "overall_level": 3,
     *       "disability": 3,
     *       "aggression": 3,
     *       "sexuality_sex_or_gender": 3,
     *       "misogyny": 3,
     *       "bullying": 2,
     *       "swearing": 0,
     *       "race_ethnicity_or_religion": 3,
     *       "sex_based_terms": 3
     *     }
     *   ]
     * }
     *
     * ```
     *
     * If `overall_level` is set to 3 and you try to change `swearing` to 2, all other settings are set to 0\. If the goal was to change the `swearing` setting and leave all the others unchanged, the request must have included all the other settings as well.
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_id": "1234",
     *       "moderator_id": "5678",
     *       "overall_level": null,
     *       "disability": 0,
     *       "aggression": 0,
     *       "sexuality_sex_or_gender": 0,
     *       "misogyny": 0,
     *       "bullying": 0,
     *       "swearing": 2,
     *       "race_ethnicity_or_religion": 0,
     *       "sex_based_terms": 0
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 Ok
     *
     * Success.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ is required.
     * * The _moderator\_id_ is required.
     * * The `overall_level` setting or one or more individual settings like `aggression` is required; the overall and individual settings are mutually exclusive, so don't set both.
     * * The value of one or more AutoMod settings is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _moderator\_id_ must match the user ID in the user access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **moderator:manage:automod\_settings** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * The user in _moderator\_id_ is not one of the broadcaster's moderators.
     *
     * @see https://dev.twitch.tv/docs/api/reference#update-automod-settings
     */
    updateAutoModSettings: async (
      params: UpdateAutoModSettingsParams,
      body: UpdateAutoModSettingsBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<UpdateAutoModSettingsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/moderation/automod/settings?${s}`;
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Gets all users that the broadcaster banned or put in a timeout.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **moderation:read** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/moderation/banned`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/moderation/banned?broadcaster_id=198704263' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "user_id": "423374343",
     *       "user_login": "glowillig",
     *       "user_name": "glowillig",
     *       "expires_at": "2022-03-15T02:00:28Z",
     *       "created_at": "2022-03-15T01:30:28Z",
     *       "reason": "Does not like pineapple on pizza.",
     *       "moderator_id": "141981764",
     *       "moderator_login": "twitchdev",
     *       "moderator_name": "TwitchDev"
     *     },
     *     {
     *       "user_id": "424596340",
     *       "user_login": "quotrok",
     *       "user_name": "quotrok",
     *       "expires_at": "2022-08-07T02:07:55Z",
     *       "created_at": "2022-08-07T02:02:55Z",
     *       "reason": "Inappropriate words.",
     *       "moderator_id": "141981764",
     *       "moderator_login": "twitchdev",
     *       "moderator_name": "TwitchDev"
     *     },
     *     ...
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiIjpudWxsLCJhIjp7IkN1cnNvciI6IjEwMDQ3MzA2NDo4NjQwNjU3MToxSVZCVDFKMnY5M1BTOXh3d1E0dUdXMkJOMFcifX0"
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of banned users.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _broadcaster\_id_ must match the user ID in the user access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **moderation:read** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-banned-users
     */
    getBannedUsers: async (
      params: GetBannedUsersParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetBannedUsersResponse> => {
      const s = getSearchParams(params, ["user_id"]);
      const url = `https://api.twitch.tv/helix/moderation/banned?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Bans a user from participating in the specified broadcaster’s chat room or puts them in a timeout.
     *
     * For information about banning or putting users in a timeout, see [Ban a User](https://help.twitch.tv/s/article/how-to-manage-harassment-in-chat#TheBanFeature) and [Timeout a User](https://help.twitch.tv/s/article/how-to-manage-harassment-in-chat#TheTimeoutFeature).
     *
     * If the user is currently in a timeout, you can call this endpoint to change the duration of the timeout or ban them altogether. If the user is currently banned, you cannot call this method to put them in a timeout instead.
     *
     * To remove a ban or end a timeout, see [Unban user](https://dev.twitch.tv/docs/api/reference#unban-user).
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **moderator:manage:banned\_users** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/moderation/bans`
     *
     * ## Examples
     *
     * ### Example Request 1
     *
     * Bans a user (it doesn’t include the `duration` field).
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/moderation/bans?broadcaster_id=1234&moderator_id=5678' \
     * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh' \
     * -H 'Content-Type: application/json' \
     * -d '{"data": {"user_id":"9876","reason":"no reason"}}'
     *
     * ```
     *
     * ### Example Response 1
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_id": "1234",
     *       "moderator_id": "5678",
     *       "user_id": "9876",
     *       "created_at": "2021-09-28T18:22:31Z",
     *       "end_time": null
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ### Example Request 2
     *
     * Puts a user in a 5-minute timeout.
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/moderation/bans?broadcaster_id=1234&moderator_id=5678' \
     * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh' \
     * -H 'Content-Type: application/json' \
     * -d '{"data": {"user_id":"9876","duration":300,"reason":"no reason"}}'
     *
     * ```
     *
     * ### Example Response 2
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_id": "1234",
     *       "moderator_id": "5678",
     *       "user_id": "9876",
     *       "created_at": "2021-09-28T19:27:31Z",
     *       "end_time": "2021-09-28T19:22:31Z"
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ### Example Request 3
     *
     * Shows what happens if you try to place a banned user in a timeout. You can ban a user that’s already in a timeout but you can’t move a banned user into a timeout. To do this, you’d have to remove the ban and then place them in a timeout.
     *
     * You’ll get the same response if you try to ban a user who is already banned.
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/moderation/bans?broadcaster_id=1234&moderator_id=5678' \
     * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh' \
     * -H 'Content-Type: application/json' \
     * -d '{"data": {"user_id":"9876","duration":300,"reason":"no reason"}}'
     *
     * ```
     *
     * ### Example Response 3
     *
     * ```
     * {
     *   "error": "Bad Request",
     *   "status": 400,
     *   "message": "user is already banned"
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully banned the user or placed them in a timeout.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The _moderator\_id_ query parameter is required.
     * * The `user_id` field is required.
     * * The text in the `reason` field is too long.
     * * The value in the `duration` field is not valid.
     * * The user specified in the `user_id` field may not be banned.
     * * The user specified in the `user_id` field may not be put in a timeout.
     * * The user specified in the `user_id` field is already banned.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _moderator\_id_ must match the user ID in the access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **moderator:manage:banned\_users** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * The user in _moderator\_id_ is not one of the broadcaster's moderators.
     *
     * ### 409 Conflict
     *
     * * You may not update the user's ban state while someone else is updating the state. For example, someone else is currently banning the user or putting them in a timeout, moving the user from a timeout to a ban, or removing the user from a ban or timeout. Please retry your request.
     *
     * ### 429 Too Many Requests
     *
     * * The app has exceeded the number of requests it may make per minute for this broadcaster.
     *
     * @see https://dev.twitch.tv/docs/api/reference#ban-user
     */
    banUser: async (
      params: BanUserParams,
      body: BanUserBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<BanUserResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/moderation/bans?${s}`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Removes the ban or timeout that was placed on the specified user.
     *
     * To ban a user, see [Ban user](https://dev.twitch.tv/docs/api/reference#ban-user).
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **moderator:manage:banned\_users** scope.
     *
     * ## URL
     *
     * `DELETE https://api.twitch.tv/helix/moderation/bans`
     *
     * ## Examples
     *
     * ### Example Request 1
     *
     * Removes a ban or timeout from a user.
     *
     * ```
     * curl -X DELETE 'https://api.twitch.tv/helix/moderation/bans?broadcaster_id=1234&moderator_id=5678&user_id=9876' \
     * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
     *
     * ```
     *
     * ### Example Request 2
     *
     * Tries to remove a ban or timeout from a user that is not currently banned or in a timeout.
     *
     * ```
     * curl -X DELETE 'https://api.twitch.tv/helix/moderation/bans?broadcaster_id=1234&moderator_id=5678&user_id=5432' \
     * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
     *
     * ```
     *
     * ### Example Response 2
     *
     * ```
     * {
     *   "error": "Bad Request",
     *   "status": 400,
     *   "message": "user is not banned"
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully removed the ban or timeout.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The _moderator\_id_ query parameter is required.
     * * The _user\_id_ query parameter is required.
     * * The user specified in the _user\_id_ query parameter is not banned.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _moderator\_id_ must match the user ID in the access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **moderator:manage:banned\_users** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * The user in _moderator\_id_ is not one of the broadcaster's moderators.
     *
     * ### 409 Conflict
     *
     * * You may not update the user's ban state while someone else is updating the state. For example, someone else is currently removing the ban or timeout, or they're moving the user from a timeout to a ban. Please retry your request.
     *
     * ### 429 Too Many Requests
     *
     * * The app has exceeded the number of requests it may make per minute for this broadcaster.
     *
     * @see https://dev.twitch.tv/docs/api/reference#unban-user
     */
    unbanUser: async (
      params: UnbanUserParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/moderation/bans?${s}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets the broadcaster’s list of non-private, blocked words or phrases. These are the terms that the broadcaster or moderator added manually or that were denied by AutoMod.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **moderator:read:blocked\_terms** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/moderation/blocked_terms`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the last 10 blocked terms (see the _first_ query parameter) that were added.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/moderation/blocked_terms?broadcaster_id=1234&moderator_id=5678&first=10' \
     * -H 'Authorization: Bearer f4otqljtpbpg24v41v9gechs4yvwy' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_id": "1234",
     *       "moderator_id": "5678",
     *       "id": "520e4d4e-0cda-49c7-821e-e5ef4f88c2f2",
     *       "text": "A phrase I’m not fond of",
     *       "created_at": "2021-09-29T19:45:37Z",
     *       "updated_at": "2021-09-29T19:45:37Z",
     *       "expires_at": null
     *     },
     *
     *     . . .
     *
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiIjpudWxsLCJhIjp7IkN1cnNvciI6I..."
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of blocked terms.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The _moderator\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _moderator\_id_ must match the user ID in the user access token.
     * * The Authorization header must contain a user access token.
     * * The user access token must include the **moderator:read:blocked\_terms** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * The user in _moderator\_id_ is not one of the broadcaster's moderators.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-blocked-terms
     */
    getBlockedTerms: async (
      params: GetBlockedTermsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetBlockedTermsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/moderation/blocked_terms?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Adds a word or phrase to the broadcaster’s list of blocked terms. These are the terms that the broadcaster doesn’t want used in their chat room.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **moderator:manage:blocked\_terms** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/moderation/blocked_terms`
     *
     * ## Examples
     *
     * ### Example Request 1
     *
     * Adds a blocked term. Adding the same term again will return the previously added term.
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/moderation/blocked_terms?broadcaster_id=1234&moderator_id=5678' \
     * -H 'Authorization: Bearer 789nj68b49pwqs9nh2y2jrlgzju3f' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh' \
     * -H 'Content-Type: application/json' \
     * -d '{"text":"A phrase I’m not fond of"}'
     *
     * ```
     *
     * ### Example Response 1
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_id": "713936733",
     *       "moderator_id": "713936733",
     *       "id": "3bb6e5d3-afb1-416c-ad4e-21af970ccfe7",
     *       "text": "A phrase I’m not fond of",
     *       "created_at": "2021-09-29T15:36:45Z",
     *       "updated_at": "2021-09-29T15:36:45Z",
     *       "expires_at": null
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ### Example Request 2
     *
     * Adds a term that uses the wildcard character (\*).
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/moderation/blocked_terms?broadcaster_id=1234&moderator_id=5678' \
     * -H 'Authorization: Bearer 789nj68b49pwqs9nh2y2jrlgzju3f' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh' \
     * -H 'Content-Type: application/json' \
     * -d '{"text":"crac*"}'
     *
     * ```
     *
     * ### Example Response 2
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_id": "1234",
     *       "moderator_id": "5678",
     *       "id": "520e4d4e-0cda-49c7-821e-e5ef4f88c2f2",
     *       "text": "crac*",
     *       "created_at": "2021-09-29T19:45:37Z",
     *       "updated_at": "2021-09-29T19:45:37Z",
     *       "expires_at": null
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of blocked terms.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The _moderator\_id_ query parameter is required.
     * * The `text` field is required.
     * * The length of the term in the `text` field is either too short or too long.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _moderator\_id_ must match the user ID in the user access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **moderator:manage:blocked\_terms** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * The user in _moderator\_id_ is not one of the broadcaster's moderators.
     *
     * @see https://dev.twitch.tv/docs/api/reference#add-blocked-term
     */
    addBlockedTerm: async (
      params: AddBlockedTermParams,
      body: AddBlockedTermBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<AddBlockedTermResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/moderation/blocked_terms?${s}`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Removes the word or phrase from the broadcaster’s list of blocked terms.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **moderator:manage:blocked\_terms** scope.
     *
     * ## URL
     *
     * `DELETE https://api.twitch.tv/helix/moderation/blocked_terms`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Deletes the specified blocked term.
     *
     * ```
     * curl -X DELETE 'https://api.twitch.tv/helix/moderation/blocked_terms?broadcaster_id=1234&moderator_id=5678&id=c9fc79b8-0f63-4ef7-9d38-efd811e74ac2' \
     * -H 'Authorization: Bearer f4otqljtpbpg24v41v9gechs4yvwy' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully removed the blocked term. Also returned if the ID is not found.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The _moderator\_id_ query parameter is required.
     * * The _id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _moderator\_id_ must match the user ID in the user access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **moderator:manage:blocked\_terms** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * The user in _moderator\_id_ is not one of the broadcaster's moderators.
     *
     * @see https://dev.twitch.tv/docs/api/reference#remove-blocked-term
     */
    removeBlockedTerm: async (
      params: RemoveBlockedTermParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/moderation/blocked_terms?${s}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Removes a single chat message or all chat messages from the broadcaster’s chat room.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **moderator:manage:chat\_messages** scope.
     *
     * ## URL
     *
     * `DELETE https://api.twitch.tv/helix/moderation/chat`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Removes all messages from the broadcaster’s chat room (doesn’t include the _message\_id_ query parameter).
     *
     * ```
     * curl -X DELETE 'https://api.twitch.tv/helix/moderation/chat?broadcaster_id=11111&moderator_id=44444' \
     * -H 'Authorization: Bearer f4otqljtpbpg24v41v9gechs4yvwy' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
     *
     * ```
     *
     * Removes the specified message from the broadcaster’s chat room.
     *
     * ```
     * curl -X DELETE 'https://api.twitch.tv/helix/moderation/chat?broadcaster_id=11111&moderator_id=44444&message_id=abc-123-def' \
     * -H 'Authorization: Bearer f4otqljtpbpg24v41v9gechs4yvwy' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully removed the specified messages.
     *
     * ### 400 Bad Request
     *
     * * You may not delete another moderator's messages.
     * * You may not delete the broadcaster's messages.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token is missing the **moderator:manage:chat\_messages** scope.
     * * The OAuth token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.
     *
     * ### 403 Forbidden
     *
     * * The user in _moderator\_id_ is not one of the broadcaster's moderators.
     *
     * ### 404 Not Found
     *
     * * The ID in _message\_id_ was not found.
     * * The specified message was created more than 6 hours ago.
     *
     * @see https://dev.twitch.tv/docs/api/reference#delete-chat-messages
     */
    deleteChatMessages: async (
      params: DeleteChatMessagesParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/moderation/chat?${s}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets all users allowed to moderate the broadcaster’s chat room.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **moderation:read** scope. If your app also adds and removes moderators, you can use the **channel:manage:moderators** scope instead.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/moderation/moderators`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=198704263' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "user_id": "424596340",
     *       "user_login": "quotrok",
     *       "user_name": "quotrok"
     *     },
     *     ...
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiIjpudWxsLCJhIjp7IkN1cnNvciI6IjEwMDQ3MzA2NDo4NjQwNjU3MToxSVZCVDFKMnY5M1BTOXh3d1E0dUdXMkJOMFcifX0"
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of moderators.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _broadcaster\_id_ must match the user ID found in the access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **moderation:read** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-moderators
     */
    getModerators: async (
      params: GetModeratorsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetModeratorsResponse> => {
      const s = getSearchParams(params, ["user_id"]);
      const url = `https://api.twitch.tv/helix/moderation/moderators?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Adds a moderator to the broadcaster’s chat room.
     *
     * **Rate Limits**: The broadcaster may add a maximum of 10 moderators within a 10-second window.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:manage:moderators** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/moderation/moderators`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=11111&user_id=44444' \
     * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully added the moderator.
     *
     * ### 400 Bad Request
     *
     * * The ID in _broadcaster\_id_ was not found.
     * * The ID in _user\_id_ was not found.
     * * The user in _user\_id_ is already a moderator in the broadcaster's chat room.
     * * The user in _user\_id_ cannot become a moderator because they're banned from the channel.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:manage:moderators** scope.
     * * The access token is not valid.
     * * The ID in the _broadcaster\_id_ query parameter must match the user ID in the access token.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 422 Unprocessable Entity
     *
     * * The user in _user\_id_ is a VIP. To make them a moderator, you must first remove them as a VIP (see [Remove Channel VIP](https://dev.twitch.tv/docs/api/reference#remove-channel-vip)).
     *
     * ### 429 Too Many Requests
     *
     * * The broadcaster has exceeded the number of requests allowed within a 10-second window. See this endpoint's rate limits.
     *
     * @see https://dev.twitch.tv/docs/api/reference#add-channel-moderator
     */
    addChannelModerator: async (
      params: AddChannelModeratorParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/moderation/moderators?${s}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Removes a moderator from the broadcaster’s chat room.
     *
     * **Rate Limits**: The broadcaster may remove a maximum of 10 moderators within a 10-second window.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:manage:moderators** scope.
     *
     * ## URL
     *
     * `DELETE https://api.twitch.tv/helix/moderation/moderators`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X DELETE 'https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=11111&user_id=44444' \
     * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully removed the moderator.
     *
     * ### 400 Bad Request
     *
     * * The ID in _broadcaster\_id_ was not found.
     * * The ID in _user\_id_ was not found.
     * * The user in _user\_id_ is not a moderator in the broadcaster's chat room.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:manage:moderators** scope.
     * * The access token is not valid.
     * * The ID in the _broadcaster\_id_ query parameter must match the user ID in the access token.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 429 Too Many Requests
     *
     * * The broadcaster has exceeded the number of requests allowed within a 10-second window. See this endpoint's rate limits.
     *
     * @see https://dev.twitch.tv/docs/api/reference#remove-channel-moderator
     */
    removeChannelModerator: async (
      params: RemoveChannelModeratorParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/moderation/moderators?${s}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets a list of the broadcaster’s VIPs.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:read:vips** scope. If your app also adds and removes VIP status, you can use the **channel:manage:vips** scope instead.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/channels/vips`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets a list of the broadcaster’s VIPs
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/channels/vips?broadcaster_id=123' \
     * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
     *
     * ```
     *
     * Gets a filtered list of the broadcaster’s VIPs. The list in the response contains only those users that are VIPs.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/channels/vips?broadcaster_id=123&user_id=456&user_id=678' \
     * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
     *
     * ```
     *
     * ### Example Request
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "user_id": "11111",
     *       "user_name": "UserDisplayName",
     *       "user_login": "userloginname"
     *     },
     *     ...
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6NX19"
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204No Content
     *
     * Successfully retrieved the broadcaster’s list of VIPs.
     *
     * ### 400Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The ID in the _user\_id_ query parameter is not valid.
     * * The number of _user\_id_ query parameters exceeds the maximum allowed.
     *
     * ### 401Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:read:vips** or **channel:manage:vips** scope.
     * * The OAuth token is not valid.
     * * The ID in the _broadcaster\_id_ query parameter must match the user ID in the access token.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-vips
     */
    getVIPs: async (
      params: GetVIPsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetVIPsResponse> => {
      const s = getSearchParams(params, ["user_id"]);
      const url = `https://api.twitch.tv/helix/channels/vips?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Adds the specified user as a VIP in the broadcaster’s channel.
     *
     * **Rate Limits**: The broadcaster may add a maximum of 10 VIPs within a 10-second window.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:manage:vips** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/channels/vips`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Adds a VIP to the broadcaster’s chat room.
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/channels/vips?broadcaster_id=123&user_id=456' \
     * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204No Content
     *
     * Successfully added the VIP.
     *
     * ### 400Bad Request
     *
     * * The user in the _user\_id_ query parameter is blocked from the broadcaster's channel.
     * * The ID in the _broadcaster\_id_ query parameter is not valid.
     * * The ID in the _user\_id_ query parameter is not valid.
     *
     * ### 401Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:manage:vips** scope.
     * * The OAuth token is not valid.
     * * The ID in the _broadcaster\_id_ query parameter must match the user ID in the access token.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.
     *
     * ### 403Forbidden
     *
     * * The ID in the _broadcaster\_id_ query parameter must match the user ID in the access token.
     *
     * ### 404Not Found
     *
     * * The ID in _broadcaster\_id_ was not found.
     * * The ID in _user\_id_ was not found.
     *
     * ### 409Conflict
     *
     * The broadcaster doesn’t have available VIP slots. [Read More](https://help.twitch.tv/s/article/Managing-Roles-for-your-Channel?language=en%5FUS#types)
     *
     * ### 422Unprocessable Entity
     *
     * * The user in _user\_id_ is a moderator. To make them a VIP, you must first remove them as a moderator (see [Remove Channel Moderator](https://dev.twitch.tv/docs/api/reference#remove-channel-moderator)).
     * * The user in the _user\_id_ query parameter is already a VIP.
     *
     * ### 425Too Early
     *
     * The broadcaster must complete the Build a Community requirement before they may assign VIPs.
     *
     * ### 429Too Many Requests
     *
     * The broadcaster exceeded the number of VIP that they may add within a 10-second window. See Rate Limits for this endpoint above.
     *
     * @see https://dev.twitch.tv/docs/api/reference#add-channel-vip
     */
    addChannelVIP: async (
      params: AddChannelVIPParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/channels/vips?${s}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Removes the specified user as a VIP in the broadcaster’s channel.
     *
     * If the broadcaster is removing the user’s VIP status, the ID in the _broadcaster\_id_ query parameter must match the user ID in the access token; otherwise, if the user is removing their VIP status themselves, the ID in the _user\_id_ query parameter must match the user ID in the access token.
     *
     * **Rate Limits**: The broadcaster may remove a maximum of 10 VIPs within a 10-second window.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:manage:vips** scope.
     *
     * ## URL
     *
     * `DELETE https://api.twitch.tv/helix/channels/vips`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Removes the VIP user from the broadcaster’s channel.
     *
     * ```
     * curl -X DELETE 'https://api.twitch.tv/helix/channels/vips?broadcaster_id=123&user_id=456' \
     * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204No Content
     *
     * Successfully removed the VIP status from the user.
     *
     * ### 400Bad Request
     *
     * * The ID in _broadcaster\_id_ is not valid.
     * * The ID in _user\_id_ is not valid.
     *
     * ### 401Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:manage:vips** scope.
     * * The OAuth token is not valid.
     * * The ID in the _broadcaster\_id_ query parameter must match the user ID in the access token.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.
     *
     * ### 403Forbidden
     *
     * * The user in _broadcaster\_id_ doesn't have permission to remove the user's VIP status.
     *
     * ### 404Not Found
     *
     * * The ID in _broadcaster\_id_ was not found.
     * * The ID in _user\_id_ was not found.
     *
     * ### 422Unprocessable Entity
     *
     * * The user in _user\_id_ is not a VIP in the broadcaster's channel.
     *
     * ### 429Too Many Requests
     *
     * The broadcaster exceeded the number of VIPs that they may remove within a 10-second window. See Rate Limits for this endpoint above.
     *
     * @see https://dev.twitch.tv/docs/api/reference#remove-channel-vip
     */
    removeChannelVIP: async (
      params: RemoveChannelVIPParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/channels/vips?${s}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  polls = {
    /**
     * Gets a list of polls that the broadcaster created.
     *
     * Polls are available for 90 days after they’re created.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:read:polls** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/polls`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the specified broadcaster’s list of polls.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/polls?broadcaster_id=141981764&id=ed961efd-8a3f-4cf5-a9d0-e616c590cd2a' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "ed961efd-8a3f-4cf5-a9d0-e616c590cd2a",
     *       "broadcaster_id": "55696719",
     *       "broadcaster_name": "TwitchDev",
     *       "broadcaster_login": "twitchdev",
     *       "title": "Heads or Tails?",
     *       "choices": [
     *         {
     *           "id": "4c123012-1351-4f33-84b7-43856e7a0f47",
     *           "title": "Heads",
     *           "votes": 0,
     *           "channel_points_votes": 0,
     *           "bits_votes": 0
     *         },
     *         {
     *           "id": "279087e3-54a7-467e-bcd0-c1393fcea4f0",
     *           "title": "Tails",
     *           "votes": 0,
     *           "channel_points_votes": 0,
     *           "bits_votes": 0
     *         }
     *       ],
     *       "bits_voting_enabled": false,
     *       "bits_per_vote": 0,
     *       "channel_points_voting_enabled": false,
     *       "channel_points_per_vote": 0,
     *       "status": "ACTIVE",
     *       "duration": 1800,
     *       "started_at": "2021-03-19T06:08:33.871278372Z"
     *     }
     *   ],
     *   "pagination": {}
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the broadcaster’s polls.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _broadcaster\_id_ must match the user ID in the access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token is missing the **channel:read:polls** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header must match the client ID specified in the access token.
     *
     * ### 404 Not Found
     *
     * * None of the IDs in the _id_ query parameters were found.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-polls
     */
    getPolls: async (
      params: GetPollsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetPollsResponse> => {
      const s = getSearchParams(params, ["id"]);
      const url = `https://api.twitch.tv/helix/polls?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Creates a poll that viewers in the broadcaster’s channel can vote on.
     *
     * The poll begins as soon as it’s created. You may run only one poll at a time.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:manage:polls** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/polls`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Creates a poll for the specified broadcaster.
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/polls' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "broadcaster_id":"141981764",
     *   "title":"Heads or Tails?",
     *   "choices":[{
     *     "title":"Heads"
     *   },
     *   {
     *     "title":"Tails"
     *   }],
     *   "channel_points_voting_enabled":true,
     *   "channel_points_per_vote":100,
     *   "duration":1800
     * }'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "ed961efd-8a3f-4cf5-a9d0-e616c590cd2a",
     *       "broadcaster_id": "141981764",
     *       "broadcaster_name": "TwitchDev",
     *       "broadcaster_login": "twitchdev",
     *       "title": "Heads or Tails?",
     *       "choices": [
     *         {
     *           "id": "4c123012-1351-4f33-84b7-43856e7a0f47",
     *           "title": "Heads",
     *           "votes": 0,
     *           "channel_points_votes": 0,
     *           "bits_votes": 0
     *         },
     *         {
     *           "id": "279087e3-54a7-467e-bcd0-c1393fcea4f0",
     *           "title": "Tails",
     *           "votes": 0,
     *           "channel_points_votes": 0,
     *           "bits_votes": 0
     *         }
     *       ],
     *       "bits_voting_enabled": false,
     *       "bits_per_vote": 0,
     *       "channel_points_voting_enabled": true,
     *       "channel_points_per_vote": 100,
     *       "status": "ACTIVE",
     *       "duration": 1800,
     *       "started_at": "2021-03-19T06:08:33.871278372Z"
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully created the poll.
     *
     * ### 400 Bad Request
     *
     * * The `broadcaster_id` field is required.
     * * The `title` field is required.
     * * The `choices` field is required.
     * * The `duration` field is required.
     * * The value in `duration` is outside the allowed range of values.
     * * The value in `channel_points_per_vote` is outside the allowed range of values.
     * * The value in `bits_per_vote` is outside the allowed range of values.
     * * The poll's `title` is too long.
     * * The choice's `title` is too long.
     * * The number of choices in the poll may not be less than 2 or greater that 5.
     * * The broadcaster already has a poll that's running; you may not create another poll until the current poll completes.
     *
     * ### 401 Unauthorized
     *
     * * The ID in `broadcaster_id` must match the user ID in the access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token is missing the **channel:manage:polls** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#create-poll
     */
    createPoll: async (
      body: CreatePollBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<CreatePollResponse> => {
      const url = 'https://api.twitch.tv/helix/polls';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Ends an active poll. You have the option to end it or end it and archive it.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:manage:polls** scope.
     *
     * ## URL
     *
     * `PATCH https://api.twitch.tv/helix/polls`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Ends the specific poll, but allows the results to be visible for viewers.
     *
     * ```
     * curl -X PATCH 'https://api.twitch.tv/helix/polls' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "broadcaster_id":"141981764",
     *   "id":"ed961efd-8a3f-4cf5-a9d0-e616c590cd2a",
     *   "status":"TERMINATED"
     * }'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "ed961efd-8a3f-4cf5-a9d0-e616c590cd2a",
     *       "broadcaster_id": "141981764",
     *       "broadcaster_name": "TwitchDev",
     *       "broadcaster_login": "twitchdev",
     *       "title": "Heads or Tails?",
     *       "choices": [
     *         {
     *           "id": "4c123012-1351-4f33-84b7-43856e7a0f47",
     *           "title": "Heads",
     *           "votes": 0,
     *           "channel_points_votes": 0,
     *           "bits_votes": 0
     *         },
     *         {
     *           "id": "279087e3-54a7-467e-bcd0-c1393fcea4f0",
     *           "title": "Tails",
     *           "votes": 0,
     *           "channel_points_votes": 0,
     *           "bits_votes": 0
     *         }
     *       ],
     *       "bits_voting_enabled": false,
     *       "bits_per_vote": 0,
     *       "channel_points_voting_enabled": true,
     *       "channel_points_per_vote": 100,
     *       "status": "TERMINATED",
     *       "duration": 1800,
     *       "started_at": "2021-03-19T06:08:33.871278372Z",
     *       "ended_at": "2021-03-19T06:11:26.746889614Z"
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully ended the poll.
     *
     * ### 400 Bad Request
     *
     * * The `broadcaster_id` field is required.
     * * The `id` field is required.
     * * The `status` field is required.
     * * The value in the `status` field is not valid.
     * * The poll must be active to terminate or archive it.
     *
     * ### 401 Unauthorized
     *
     * * The ID in `broadcaster_id` must match the user ID in the user access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:manage:polls** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header must match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#end-poll
     */
    endPoll: async (
      body: EndPollBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<EndPollResponse> => {
      const url = 'https://api.twitch.tv/helix/polls';
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
  };
  predictions = {
    /**
     * Gets a list of Channel Points Predictions that the broadcaster created.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:read:predictions** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/predictions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the specified broadcaster’s list of predictions.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/predictions?broadcaster_id=55696719&id=d6676d5c-c86e-44d2-bfc4-100fb48f0656' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "d6676d5c-c86e-44d2-bfc4-100fb48f0656",
     *       "broadcaster_id": "55696719",
     *       "broadcaster_name": "TwitchDev",
     *       "broadcaster_login": "twitchdev",
     *       "title": "Will there be any leaks today?",
     *       "winning_outcome_id": null,
     *       "outcomes": [
     *         {
     *           "id": "021e9234-5893-49b4-982e-cfe9a0aaddd9",
     *           "title": "Yes",
     *           "users": 0,
     *           "channel_points": 0,
     *           "top_predictors": null,
     *           "color": "BLUE"
     *         },
     *         {
     *           "id": "ded84c26-13cb-4b48-8cb5-5bae3ec3a66e",
     *           "title": "No",
     *           "users": 0,
     *           "channel_points": 0,
     *           "top_predictors": null,
     *           "color": "PINK"
     *         }
     *       ],
     *       "prediction_window": 600,
     *       "status": "ACTIVE",
     *       "created_at": "2021-04-28T16:03:06.320848689Z",
     *       "ended_at": null,
     *       "locked_at": null
     *     }
     *   ],
     *   "pagination": {}
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of predictions.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _broadcaster\_id_ must match the user ID in the access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:read:predictions** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-predictions
     */
    getPredictions: async (
      params: GetPredictionsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetPredictionsResponse> => {
      const s = getSearchParams(params, ["id"]);
      const url = `https://api.twitch.tv/helix/predictions?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Creates a Channel Points Prediction.
     *
     * With a Channel Points Prediction, the broadcaster poses a question and viewers try to predict the outcome. The prediction runs as soon as it’s created. The broadcaster may run only one prediction at a time.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:manage:predictions** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/predictions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Creates a Channel Points Prediction for the specified broadcaster.
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/predictions' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "broadcaster_id": "141981764",
     *   "title": "Any leeks in the stream?",
     *   "outcomes": [
     *     {
     *       "title": "Yes, give it time."
     *     },
     *     {
     *       "title": "Definitely not."
     *     }
     *   ],
     *   "prediction_window": 120
     * }'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "bc637af0-7766-4525-9308-4112f4cbf178",
     *       "broadcaster_id": "141981764",
     *       "broadcaster_name": "TwitchDev",
     *       "broadcaster_login": "twitchdev",
     *       "title": "Any leeks in the stream?",
     *       "winning_outcome_id": null,
     *       "outcomes": [
     *         {
     *           "id": "73085848-a94d-4040-9d21-2cb7a89374b7",
     *           "title": "Yes, give it time.",
     *           "users": 0,
     *           "channel_points": 0,
     *           "top_predictors": null,
     *           "color": "BLUE"
     *         },
     *         {
     *           "id": "906b70ba-1f12-47ea-9e95-e5f93d20e9cc",
     *           "title": "Definitely not.",
     *           "users": 0,
     *           "channel_points": 0,
     *           "top_predictors": null,
     *           "color": "PINK"
     *         }
     *       ],
     *       "prediction_window": 120,
     *       "status": "ACTIVE",
     *       "created_at": "2021-04-28T17:11:22.595914172Z",
     *       "ended_at": null,
     *       "locked_at": null
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully created the Channel Points Prediction.
     *
     * ### 400 Bad Request
     *
     * * The `broadcaster_id` field is required.
     * * The `title` field is required.
     * * The `outcomes` field is required.
     * * The `prediction_window` field is required.
     * * The value in `prediction_window` is outside the allowed range of values.
     * * The prediction's `title` is too long.
     * * The outcome's `title` is too long.
     * * There must be 2 outcomes in the prediction.
     * * The broadcaster already has a prediction that's running; you may not create another prediction until the current prediction is resolved or canceled.
     *
     * ### 401 Unauthorized
     *
     * * The ID in `broadcaster_id` must match the user ID in the access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:manage:predictions** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 429 Too Many Requests
     *
     * @see https://dev.twitch.tv/docs/api/reference#create-prediction
     */
    createPrediction: async (
      body: CreatePredictionBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<CreatePredictionResponse> => {
      const url = 'https://api.twitch.tv/helix/predictions';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Locks, resolves, or cancels a Channel Points Prediction.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:manage:predictions** scope.
     *
     * ## URL
     *
     * `PATCH https://api.twitch.tv/helix/predictions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Resolves the specified Channel Points Prediction.
     *
     * ```
     * curl -X PATCH 'https://api.twitch.tv/helix/predictions' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Content-Type: application/json' \
     * -d  '{
     *   "broadcaster_id": "141981764",
     *   "id": "bc637af0-7766-4525-9308-4112f4cbf178",
     *   "status": "RESOLVED",
     *   "winning_outcome_id": "73085848-a94d-4040-9d21-2cb7a89374b7"
     * }'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "bc637af0-7766-4525-9308-4112f4cbf178",
     *       "broadcaster_id": "141981764",
     *       "broadcaster_name": "TwitchDev",
     *       "broadcaster_login": "twitchdev",
     *       "title": "Will we win all the games?",
     *       "winning_outcome_id": "73085848-a94d-4040-9d21-2cb7a89374b7",
     *       "outcomes": [
     *         {
     *           "id": "73085848-a94d-4040-9d21-2cb7a89374b7",
     *           "title": "yes",
     *           "users": 0,
     *           "channel_points": 0,
     *           "top_predictors": null,
     *           "color": "BLUE"
     *         },
     *         {
     *           "id": "86010b2e-9764-4136-9359-fd1c9c5a8033",
     *           "title": "no",
     *           "users": 0,
     *           "channel_points": 0,
     *           "top_predictors": null,
     *           "color": "PINK"
     *         }
     *       ],
     *       "prediction_window": 120,
     *       "status": "RESOLVED",
     *       "created_at": "2021-04-28T21:48:19.480371331Z",
     *       "ended_at": "2021-04-28T21:54:24.026833954Z",
     *       "locked_at": "2021-04-28T21:48:34.636685705Z"
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully updated the prediction.
     *
     * ### 400 Bad Request
     *
     * * The `broadcaster_id` field is required.
     * * The `id` field is required.
     * * The `status` field is required.
     * * The `winning_outcome_id` field is required if `status` is RESOLVED.
     * * The value in the `status` field is not valid.
     * * To update the prediction's status to RESOLVED or CANCELED, its current status must be ACTIVE or LOCKED.
     * * To update the prediction's status to LOCKED, its current status must be ACTIVE.
     *
     * ### 401 Unauthorized
     *
     * * The ID in `broadcaster_id` must match the user ID in the OAuth token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:manage:predictions** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 404 Not Found
     *
     * * The prediction in the `id` field was not found.
     * * The outcome in the `winning_outcome_id` field was not found.
     *
     * @see https://dev.twitch.tv/docs/api/reference#end-prediction
     */
    endPrediction: async (
      body: EndPredictionBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<EndPredictionResponse> => {
      const url = 'https://api.twitch.tv/helix/predictions';
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
  };
  raids = {
    /**
     * Raid another channel by sending the broadcaster’s viewers to the targeted channel.
     *
     * When you call the API from a chat bot or extension, the Twitch UX pops up a window at the top of the chat room that identifies the number of viewers in the raid. The raid occurs when the broadcaster clicks **Raid Now** or after the 90-second countdown expires.
     *
     * To determine whether the raid successfully occurred, you must subscribe to the [Channel Raid](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelraid) event. For more information, see [Get notified when a raid begins](https://dev.twitch.tv/docs/api/raids#get-notified-when-a-raid-begins).
     *
     * To cancel a pending raid, use the [Cancel a raid](https://dev.twitch.tv/docs/api/reference#cancel-a-raid) endpoint.
     *
     * **Rate Limit**: The limit is 10 requests within a 10-minute window.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:manage:raids** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/raids`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/raids?from_broadcaster_id=12345678&to_broadcaster_id=87654321' \
     * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "created_at": "2022-02-18T07:20:50.52Z",
     *       "is_mature": false
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully requested to start a raid. To determine whether the raid successfully occurred (that is, the broadcaster clicked **Raid Now** or the countdown expired), you must subscribe to the [Channel Raid](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelraid) event.
     *
     * ### 400 Bad Request
     *
     * * The raiding broadcaster is blocked from the targeted channel.
     * * The targeted channel doesn't accept raids from this broadcaster.
     * * There are too many viewers in the raiding party.
     * * The IDs in _from\_broadcaster\_id_ and _to\_broadcaster\_id_ cannot be the same ID.
     * * The ID in the _from\_broadcaster\_id_ query parameter is not valid.
     * * The ID in the _to\_broadcaster\_id_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _from\_broadcaster\_id_ must match the user ID found in the request’s OAuth token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:manage:raids** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 404 Not Found
     *
     * * The targeted channel was not found.
     *
     * ### 409 Conflict
     *
     * * The broadcaster is already in the process of raiding another channel.
     *
     * ### 429 Too Many Requests
     *
     * * The broadcaster exceeded the number of raid requests that they may make. The limit is 10 requests within a 10-minute window.
     *
     * @see https://dev.twitch.tv/docs/api/reference#start-a-raid
     */
    startRaid: async (
      params: StartRaidParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<StartRaidResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/raids?${s}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Cancel a pending raid.
     *
     * You can cancel a raid at any point up until the broadcaster clicks **Raid Now** in the Twitch UX or the 90-second countdown expires.
     *
     * **Rate Limit**: The limit is 10 requests within a 10-minute window.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:manage:raids** scope.
     *
     * ## URL
     *
     * `DELETE https://api.twitch.tv/helix/raids`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X DELETE 'https://api.twitch.tv/helix/raids?broadcaster_id=12345678' \
     * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * The pending raid was successfully canceled.
     *
     * ### 400 Bad Request
     *
     * * The ID in the _broadcaster\_id_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _broadcaster\_id_ must match the user ID found in the request’s OAuth token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:manage:raids** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 404 Not Found
     *
     * * The broadcaster doesn't have a pending raid to cancel.
     *
     * ### 429 Too Many Requests
     *
     * * The broadcaster exceeded the number of raid requests that they may make. The limit is 10 requests within a 10-minute window.
     *
     * @see https://dev.twitch.tv/docs/api/reference#cancel-a-raid
     */
    cancelRaid: async (
      params: CancelRaidParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/raids?${s}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  schedule = {
    /**
     * Gets the broadcaster’s streaming schedule. You can get the entire schedule or specific segments of the schedule. [Learn More](https://help.twitch.tv/s/article/channel-page-setup#Schedule)
     *
     * ## Authorization
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/schedule`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the specified broadcaster’s streaming schedule.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/schedule?broadcaster_id=141981764' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": {
     *     "segments": [
     *       {
     *         "id": "eyJzZWdtZW50SUQiOiJlNGFjYzcyNC0zNzFmLTQwMmMtODFjYS0yM2FkYTc5NzU5ZDQiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjoyNn0=",
     *         "start_time": "2021-07-01T18:00:00Z",
     *         "end_time": "2021-07-01T19:00:00Z",
     *         "title": "TwitchDev Monthly Update // July 1, 2021",
     *         "canceled_until": null,
     *         "category": {
     *             "id": "509670",
     *             "name": "Science & Technology"
     *         },
     *         "is_recurring": false
     *       },
     *       ...
     *     ],
     *     "broadcaster_id": "141981764",
     *     "broadcaster_name": "TwitchDev",
     *     "broadcaster_login": "twitchdev",
     *     "vacation": null
     *   },
     *   "pagination": {}
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the broadcaster’s streaming schedule.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The ID in the _broadcaster\_id_ query parameter is not valid.
     * * The ID in the _id_ query parameter is not valid.
     * * The format of the date and time in the _start\_time_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify a valid app access token or user access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the access token.
     *
     * ### 403 Forbidden
     *
     * * Only partners and affiliates may add non-recurring broadcast segments.
     *
     * ### 404 Not Found
     *
     * * The broadcaster has not created a streaming schedule.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-channel-stream-schedule
     */
    getChannelStreamSchedule: async (
      params: GetChannelStreamScheduleParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetChannelStreamScheduleResponse> => {
      const s = getSearchParams(params, ["id"]);
      const url = `https://api.twitch.tv/helix/schedule?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets the broadcaster’s streaming schedule as an [iCalendar](https://datatracker.ietf.org/doc/html/rfc5545).
     *
     * ## Authorization
     *
     * The Client-Id and Authorization headers are not required.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/schedule/icalendar`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the specified broadcaster’s streaming schedule as an iCalendar.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/schedule/icalendar?broadcaster_id=141981764'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * BEGIN:VCALENDAR
     * PRODID:-//twitch.tv//StreamSchedule//1.0
     * VERSION:2.0
     * CALSCALE:GREGORIAN
     * REFRESH-INTERVAL;VALUE=DURATION:PT1H
     * NAME:TwitchDev
     * BEGIN:VEVENT
     * UID:e4acc724-371f-402c-81ca-23ada79759d4
     * DTSTAMP:20210323T040131Z
     * DTSTART;TZID=/America/New_York:20210701T140000
     * DTEND;TZID=/America/New_York:20210701T150000
     * SUMMARY:TwitchDev Monthly Update // July 1, 2021
     * DESCRIPTION:Science & Technology.
     * CATEGORIES:Science & Technology
     * END:VEVENT
     * END:VCALENDAR%
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the broadcaster’s schedule as an iCalendar.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The ID in the _broadcaster\_id_ query parameter is not valid.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-channel-icalendar
     */
    getChanneliCalendar: async (
      params: GetChanneliCalendarParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/schedule/icalendar?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Updates the broadcaster’s schedule settings, such as scheduling a vacation.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:manage:schedule** scope.
     *
     * ## URL
     *
     * `PATCH https://api.twitch.tv/helix/schedule/settings`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Schedules the broadcaster’s vacation.
     *
     * ```
     * curl -X PATCH 'https://api.twitch.tv/helix/schedule/settings?broadcaster_id=141981764&is_vacation_enabled=true&vacation_start_time=2021-05-16T00:00:00Z&vacation_end_time=2021-05-23T00:00:00Z&timezone=America/New_York' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully updated the broadcaster’s schedule settings.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The ID in the _broadcaster\_id_ query parameter is not valid.
     * * The format of the string in _vacation\_start\_time_ is not valid.
     * * The format of the string in _vacation\_end\_time_ is not valid.
     * * The date in _vacation\_end\_time_ must be later than the date in _vacation\_start\_time_.
     *
     * ### 401 Unauthorized
     *
     * * The ID in the _broadcaster\_id_ query parameter must match the user ID in the user access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:manage:schedule** scope.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the client ID in the access token.
     *
     * ### 404 Not Found
     *
     * * The broadcaster's schedule was not found.
     *
     * @see https://dev.twitch.tv/docs/api/reference#update-channel-stream-schedule
     */
    updateChannelStreamSchedule: async (
      params: UpdateChannelStreamScheduleParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/schedule/settings?${s}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Adds a single or recurring broadcast to the broadcaster’s streaming schedule. For information about scheduling broadcasts, see [Stream Schedule](https://help.twitch.tv/s/article/channel-page-setup#Schedule).
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:manage:schedule** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/schedule/segment`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Adds a non-recurring broadcast to the broadcaster’s streaming schedule.
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/schedule/segment?broadcaster_id=141981764' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "start_time": "2021-07-01T18:00:00Z",
     *   "timezone": "America/New_York",
     *   "is_recurring": false,
     *   "duration": "60",
     *   "category_id": "509670",
     *   "title": "TwitchDev Monthly Update // July 1, 2021"
     * }'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": {
     *     "segments": [
     *       {
     *         "id": "eyJzZWdtZW50SUQiOiJlNGFjYzcyNC0zNzFmLTQwMmMtODFjYS0yM2FkYTc5NzU5ZDQiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjoyNn0=",
     *         "start_time": "2021-07-01T18:00:00Z",
     *         "end_time": "2021-07-01T19:00:00Z",
     *         "title": "TwitchDev Monthly Update // July 1, 2021",
     *         "canceled_until": null,
     *         "category": {
     *             "id": "509670",
     *             "name": "Science & Technology"
     *         },
     *         "is_recurring": false
     *       }
     *     ],
     *     "broadcaster_id": "141981764",
     *     "broadcaster_name": "TwitchDev",
     *     "broadcaster_login": "twitchdev",
     *     "vacation": null
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 Ok
     *
     * Successfully added the broadcast segment.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The ID in the _broadcaster\_id_ query parameter is not valid.
     * * The format of the date and time in the `start_time` field is not valid.
     * * The value in the `timezone` field is not valid.
     * * The value in the `duration` field is not valid.
     * * The ID in the `category_id` field is not valid.
     * * The string in the `title` field is too long.
     *
     * ### 401 Unauthorized
     *
     * * The ID in the _broadcaster\_id_ query parameter must match the user ID in the user access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:manage:schedule** scope.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the client ID in the access token.
     *
     * ### 403 Forbidden
     *
     * * Only partners and affiliates may add non-recurring broadcast segments.
     *
     * @see https://dev.twitch.tv/docs/api/reference#create-channel-stream-schedule-segment
     */
    createChannelStreamScheduleSegment: async (
      params: CreateChannelStreamScheduleSegmentParams,
      body: CreateChannelStreamScheduleSegmentBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<CreateChannelStreamScheduleSegmentResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/schedule/segment?${s}`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Updates a scheduled broadcast segment.
     *
     * For recurring segments, updating a segment’s title, category, duration, and timezone, changes all segments in the recurring schedule, not just the specified segment.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:manage:schedule** scope.
     *
     * ## URL
     *
     * `PATCH https://api.twitch.tv/helix/schedule/segment`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Updates the duration of a non-recurring broadcast segment.
     *
     * ```
     * curl -X PATCH 'https://api.twitch.tv/helix/schedule/segment?broadcaster_id=141981764&id=eyJzZWdtZW50SUQiOiJlNGFjYzcyNC0zNzFmLTQwMmMtODFjYS0yM2FkYTc5NzU5ZDQiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjoyNn0=' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     * -H 'Content-Type: application/json' \
     * -d '{
     *   "duration": "120"
     * }'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": {
     *     "segments": [
     *       {
     *         "id": "eyJzZWdtZW50SUQiOiJlNGFjYzcyNC0zNzFmLTQwMmMtODFjYS0yM2FkYTc5NzU5ZDQiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjoyNn0=",
     *         "start_time": "2021-07-01T18:00:00Z",
     *         "end_time": "2021-07-01T20:00:00Z",
     *         "title": "TwitchDev Monthly Update // July 1, 2021",
     *         "canceled_until": null,
     *         "category": {
     *             "id": "509670",
     *             "name": "Science & Technology"
     *         },
     *         "is_recurring": false
     *       }
     *     ],
     *     "broadcaster_id": "141981764",
     *     "broadcaster_name": "TwitchDev",
     *     "broadcaster_login": "twitchdev",
     *     "vacation": null
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully updated the broadcast segment.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The ID in the _broadcaster\_id_ query parameter is not valid.
     * * The _id_ query parameter is required.
     * * The ID in the _id_ query parameter is not valid.
     * * The format of the date and time in the `start_time` field is not valid.
     * * The value in the `timezone` field is not valid.
     * * The value in the `duration` field is not valid.
     * * The ID in the `category_id` field is not valid.
     * * The string in the `title` field is too long.
     *
     * ### 401 Unauthorized
     *
     * * The ID in the _broadcaster\_id_ query parameter must match the user ID in the user access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:manage:schedule** scope.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the client ID in the access token.
     *
     * ### 404 Not Found
     *
     * * The specified broadcast segment was not found.
     *
     * @see https://dev.twitch.tv/docs/api/reference#update-channel-stream-schedule-segment
     */
    updateChannelStreamScheduleSegment: async (
      params: UpdateChannelStreamScheduleSegmentParams,
      body: UpdateChannelStreamScheduleSegmentBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<UpdateChannelStreamScheduleSegmentResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/schedule/segment?${s}`;
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Removes a broadcast segment from the broadcaster’s streaming schedule.
     *
     * **NOTE**: For recurring segments, removing a segment removes all segments in the recurring schedule.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **channel:manage:schedule** scope.
     *
     * ## URL
     *
     * `DELETE https://api.twitch.tv/helix/schedule/segment`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Removes the segment from the broadcaster’s streaming schedule.
     *
     * ```
     * curl -X DELETE 'https://api.twitch.tv/helix/schedule/segment?broadcaster_id=141981764&id=eyJzZWdtZW50SUQiOiI4Y2EwN2E2NC0xYTZkLTRjYWItYWE5Ni0xNjIyYzNjYWUzZDkiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjoyMX0=' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully removed the broadcast segment.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The ID in the _broadcaster\_id_ query parameter is not valid.
     * * The _id_ query parameter is required.
     * * The ID in the _id_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The ID in the _broadcaster\_id_ query parameter must match the user ID in the user access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:manage:schedule** scope.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the client ID in the OAuth token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#delete-channel-stream-schedule-segment
     */
    deleteChannelStreamScheduleSegment: async (
      params: DeleteChannelStreamScheduleSegmentParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/schedule/segment?${s}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  search = {
    /**
     * Gets the games or categories that match the specified query.
     *
     * To match, the category’s name must contain all parts of the query string. For example, if the query string is 42, the response includes any category name that contains 42 in the title. If the query string is a phrase like _love computer_, the response includes any category name that contains the words love and computer anywhere in the name. The comparison is case insensitive.
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/search/categories`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the list of games and categories that contain _fort_ in the name.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/search/categories?query=fort' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "33214",
     *       "name": "Fortnite",
     *       "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/33214-52x72.jpg"
     *     },
     *     ...
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiIjpudWxsLCJhIjp7IkN"
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of category names that matched the specified query string.
     *
     * ### 400 Bad Request
     *
     * * The _query_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain an app access token or user access token.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#search-categories
     */
    searchCategories: async (
      params: SearchCategoriesParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<SearchCategoriesResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/search/categories?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets the channels that match the specified query and have streamed content within the past 6 months.
     *
     * The fields that the API uses for comparison depends on the value that the _live\_only_ query parameter is set to. If _live\_only_ is **false**, the API matches on the broadcaster’s login name. However, if _live\_only_ is **true**, the API matches on the broadcaster’s name and category name.
     *
     * To match, the beginning of the broadcaster’s name or category must match the query string. The comparison is case insensitive. If the query string is angel\_of\_death, it matches all names that begin with angel\_of\_death. However, if the query string is a phrase like _angel of death_, it matches to names starting with angelofdeath or names starting with angel\_of\_death.
     *
     * By default, the results include both live and offline channels. To get only live channels set the _live\_only_ query parameter to **true**.
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET helix/search/channels`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the list of live and offline channels where the broadcaster’s name contains _loserfruit_.:
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/search/channels?query=loserfruit' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_language": "en",
     *       "broadcaster_login": "loserfruit",
     *       "display_name": "Loserfruit",
     *       "game_id": "498000",
     *       "game_name": "House Flipper",
     *       "id": "41245072",
     *       "is_live": false,
     *       "tags_ids": [],
     *       "thumbnail_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/fd17325a-7dc2-46c6-8617-e90ec259501c-profile_image-300x300.png",
     *       "title": "loserfruit",
     *       "started_at": ""
     *     },
     *     ...
     *   ],
     *   "pagination": {
     *     "cursor": "Mg=="
     *   }
     * }
     *
     * ```
     *
     * ### Example Request
     *
     * Gets the list of live channels where the broadcaster’s name or category name contains _a\_seagull_.:
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/search/channels?query=a_seagull&live_only=true' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_language": "en",
     *       "broadcaster_login": "a_seagull",
     *       "display_name": "A_Seagull",
     *       "game_id": "506442",
     *       "game_name": "DOOM Eternal",
     *       "id": "19070311",
     *       "is_live": true,
     *       "tags_ids": [
     *         "6ea6bca4-4712-4ab9-a906-e3336a9d8039"
     *       ],
     *       "thumbnail_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/a_seagull-profile_image-4d2d235688c7dc66-300x300.png",
     *       "title": "a_seagull",
     *       "started_at": "2020-03-18T17:56:00Z"
     *     }
     *   ],
     *   "pagination": {}
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of category names that matched the specified query string.
     *
     * ### 400 Bad Request
     *
     * * The _query_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain an app access token or user access token.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#search-channels
     */
    searchChannels: async (
      params: SearchChannelsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<SearchChannelsResponse> => {
      const s = getSearchParams(params, []);
      const url = `helix/search/channels?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  music = {
    /**
     * Gets the Soundtrack track that the broadcaster is playing.
     *
     * ## Authorization
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/soundtrack/current_track`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/soundtrack/current_track?broadcaster_id=1234' \
     * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "track": {
     *         "artists": [
     *           {
     *             "id": "B07S7JG3TK",
     *             "name": "Enoth",
     *             "creator_channel_id": "39051113"
     *           }
     *         ],
     *         "id": "B08D6QFS38",
     *         "isrc": "CCXXXYYNNNNN",
     *         "duration": 153,
     *         "title": "Please stay",
     *         "album": {
     *           "id": "B08D6PMKYL",
     *           "name": "Summer 2020",
     *           "image_url": "https://m.media-amazon.com/images/I/51zs1JZY8tL.jpg"
     *         }
     *       },
     *       "source": {
     *         "id": "B08HCW84SF",
     *         "content_type": "PLAYLIST",
     *         "title": "Beats To Stream To",
     *         "image_url": "https://m.media-amazon.com/images/I/419WuvMXzEL.jpg",
     *         "soundtrack_url": "https://soundtrack.twitch.tv/playlist?playlistID=B08HCW84SF",
     *         "spotify_url": "https://open.spotify.com/playlist/1LOP14236oTUscowY3NvYN"
     *       }
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the track that the broadcaster is playing.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token or user access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the client ID in the access token.
     *
     * ### 404 Not Found
     *
     * * The broadcaster is not playing a track.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-soundtrack-current-track
     */
    getSoundtrackCurrentTrack: async (
      params: GetSoundtrackCurrentTrackParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetSoundtrackCurrentTrackResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/soundtrack/current_track?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets the Soundtrack playlist’s tracks.
     *
     * ## Authorization
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/soundtrack/playlist`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/soundtrack/playlist?id=B0912YMKSL' \
     * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "artists": [
     *         {
     *           "id": "B002F8OLPK",
     *           "name": "BJ The Chicago Kid",
     *           "creator_channel_id": ""
     *         }
     *       ],
     *       "id": "B09J7FZ92D",
     *       "isrc": "QM24S2106597",
     *       "duration": 210,
     *       "title": "Smooth [Explicit]",
     *       "album": {
     *         "id": "B09J7B37VS",
     *         "name": "Smooth [Explicit]",
     *         "image_url": "https://m.media-amazon.com/images/I/316SDaD-XQL.jpg"
     *       }
     *     },
     *     {
     *       "artists": [
     *         {
     *           "id": "B071ZL7NDT",
     *           "name": "23 Unofficial",
     *           "creator_channel_id": "647990463"
     *         },
     *         {
     *           "id": "B073PHDDSK",
     *           "name": "KALLITECHNIS",
     *           "creator_channel_id": ""
     *         }
     *       ],
     *       "id": "B09C8344GZ",
     *       "isrc": "QM24S2105530",
     *       "duration": 154,
     *       "title": "OUTTA MY WAY",
     *       "album": {
     *         "id": "B09C794J2L",
     *         "name": "OUTTA MY WAY",
     *         "image_url": "https://m.media-amazon.com/images/I/515HYAEtpeL.jpg"
     *       }
     *     }
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6MjB9fQ"
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the playlist.
     *
     * ### 400 Bad Request
     *
     * * The _id_ query parameter is required.
     * * The ID in the _id_ query parameter is not a valid playlist ASIN.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token or user access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the client ID in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-soundtrack-playlist
     */
    getSoundtrackPlaylist: async (
      params: GetSoundtrackPlaylistParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetSoundtrackPlaylistResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/soundtrack/playlist?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets a list of Soundtrack playlists.
     *
     * The response contains information about the playlists, such as their titles and descriptions. To get a playlist’s tracks, use [Get Soundtrack Playlist](https://dev.twitch.tv/docs/api/reference#get-soundtrack-playlist) endpoint.
     *
     * ## Authorization
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/soundtrack/playlists`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets all playlists.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/soundtrack/playlists' \
     * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "title": "Label Spotlight: Radio Juicy",
     *       "id": "B08P3N4ZPD",
     *       "image_url": "https://m.media-amazon.com/images/I/517kGzeaRhL.jpg",
     *       "description": "Journey through boom-bap, lo-fi, trap and ambient sounds, courtesy of esteemed label Radio Juicy."
     *     },
     *     {
     *       "title": "Fall Days",
     *       "id": "B09LVX24K7",
     *       "image_url": "https://m.media-amazon.com/images/I/41w3M-1KfXL.jpg",
     *       "description": "Turn a new leaf with these chill pop & indie tunes."
     *     },
     *     {
     *       "title": "Release Spotlight: JVNA",
     *       "id": "B09M7H78YL",
     *       "image_url": "https://m.media-amazon.com/images/I/419V2D2OlML.jpg",
     *       "description": "Twitch streamer, singer-songwriter and producer JVNA presents her debut album \"Hope in Chaos\"."
     *     },
     *     {
     *       "title": "Among Us",
     *       "id": "B08ZDWR371",
     *       "image_url": "https://m.media-amazon.com/images/I/414O3CYQguL.jpg",
     *       "description": "Traverse space, do tasks, and eject the Impostors in this official Among Us playlist!"
     *     }
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6MjB9fQ"
     *   }
     * }
     *
     * ```
     *
     * Gets a single playlist.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/soundtrack/playlists?id=B0912YMKSL' \
     * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
     * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "title": "Night Shift",
     *       "id": "B0912YMKSL",
     *       "image_url": "https://m.media-amazon.com/images/I/41UoIaB4VaL.jpg",
     *       "description": "R&B to ride out to."
     *     }
     *   ],
     *   "pagination": {}
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of playlists.
     *
     * ### 400 Bad Request
     *
     * * The ID in the _id_ query parameter is not a valid playlist ASIN.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token or user access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the client ID in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-soundtrack-playlists
     */
    getSoundtrackPlaylists: async (
      params: GetSoundtrackPlaylistsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetSoundtrackPlaylistsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/soundtrack/playlists?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  streams = {
    /**
     * Gets the channel’s stream key.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **channel:read:stream\_key** scope.
     *
     * ## URL
     *
     * `https://api.twitch.tv/helix/streams/key undefined`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/streams/key' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "stream_key": "live_44322889_a34ub37c8ajv98a0"
     *     },
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the stream’s key.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ field is required.
     * * The ID in the _broadcaster\_id_ field is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _broadcaster\_id_ must match the user ID in the access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:read:stream\_key** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header must match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-stream-key
     */
    getStreamKey: async (
      params: GetStreamKeyParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetStreamKeyResponse> => {
      const s = getSearchParams(params, []);
      const url = `undefined?${s}`;
      const response = await fetch(url, {
        method: 'https://api.twitch.tv/helix/streams/key',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets a list of all broadcasters that are streaming. The list is in descending order by the number of viewers watching the stream. Because viewers come and go during a stream, it’s possible to find duplicate or missing streams in the list as you page through the results.
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/streams`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets information about the 20 most active streams.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/streams' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "41375541868",
     *       "user_id": "459331509",
     *       "user_login": "auronplay",
     *       "user_name": "auronplay",
     *       "game_id": "494131",
     *       "game_name": "Little Nightmares",
     *       "type": "live",
     *       "title": "hablamos y le damos a Little Nightmares 1",
     *       "viewer_count": 78365,
     *       "started_at": "2021-03-10T15:04:21Z",
     *       "language": "es",
     *       "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_auronplay-{width}x{height}.jpg",
     *       "tag_ids": [
     *         "d4bb9c58-2141-4881-bcdc-3fe0505457d1"
     *       ],
     *       "is_mature": false
     *     },
     *     ...
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8zT0RNMk5TNDBORFF4TlRjMU1UY3hOU3dpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqb3hOVGs0TkM0MU56RXhNekExTVRZNU1ESXNJbVFpT21aaGJITmxMQ0owSWpwMGNuVmxmUT09In19"
     *   }
     * }
     *
     * ```
     *
     * ### Example Request
     *
     * Gets streams for the specified logins. If the user is not live, the response doesn’t include them.
     *
     * ```
     * curl -X GET
     * 'https://api.twitch.tv/helix/streams?user_login=afro&user_login=cohhcarnage&user_login=lana_lux' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "40952121085",
     *       "user_id": "101051819",
     *       "user_login": "afro",
     *       "user_name": "Afro",
     *       "game_id": "32982",
     *       "game_name": "Grand Theft Auto V",
     *       "type": "live",
     *       "title": "Jacob: Digital Den Laptops & Routers | NoPixel | !MAINGEAR !FCF",
     *       "viewer_count": 1490,
     *       "started_at": "2021-03-10T03:18:11Z",
     *       "language": "en",
     *       "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_afro-{width}x{height}.jpg",
     *       "tag_ids": [
     *         "6ea6bca4-4712-4ab9-a906-e3336a9d8039"
     *       ],
     *       "is_mature": false
     *     },
     *     ...
     *   ],
     *   "pagination": {}
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of streams.
     *
     * ### 400 Bad Request
     *
     * * The value in the _type_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token or user access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-streams
     */
    getStreams: async (
      params: GetStreamsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetStreamsResponse> => {
      const s = getSearchParams(params, ["user_id","user_login","game_id","language"]);
      const url = `https://api.twitch.tv/helix/streams?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets a list of live streams of broadcasters that the specified user follows.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **user:read:follows** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/streams/followed`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the streams that the broadcaster follows.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/streams/followed?user_id=141981764' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "42170724654",
     *       "user_id": "132954738",
     *       "user_login": "aws",
     *       "user_name": "AWS",
     *       "game_id": "417752",
     *       "game_name": "Talk Shows & Podcasts",
     *       "type": "live",
     *       "title": "AWS Howdy Partner! Y'all welcome ExtraHop to the show!",
     *       "viewer_count": 20,
     *       "started_at": "2021-03-31T20:57:26Z",
     *       "language": "en",
     *       "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_aws-{width}x{height}.jpg",
     *       "tag_ids": [
     *         "6ea6bca4-4712-4ab9-a906-e3336a9d8039"
     *       ]
     *     },
     *     ...
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8zT0RNMk5TNDBORFF4TlRjMU1UY3hOU3dpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqb3hOVGs0TkM0MU56RXhNekExTVRZNU1ESXNJbVFpT21aaGJITmxMQ0owSWpwMGNuVmxmUT09In19"
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of tags.
     *
     * ### 400 Bad Request
     *
     * * The _user\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _user\_id_ must match the user ID found in the access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **user:read:follows** scope.
     * * The OAuth token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-followed-streams
     */
    getFollowedStreams: async (
      params: GetFollowedStreamsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetFollowedStreamsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/streams/followed?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Adds a marker to a live stream. A marker is an arbitrary point in a live stream that the broadcaster or editor wants to mark, so they can return to that spot later to create video highlights (see Video Producer, Highlights in the Twitch UX).
     *
     * You may not add markers:
     *
     * * If the stream is not live
     * * If the stream has not enabled video on demand (VOD)
     * * If the stream is a premiere (a live, first-viewing event that combines uploaded videos with live chat)
     * * If the stream is a rerun of a past broadcast, including past premieres.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **channel:manage:broadcast** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/streams/markers`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Creates a marker at the current location in user 123’s stream.
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/streams/markers' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Content-Type: application/json' \
     * -d '{"user_id":"123", "description":"hello, this is a marker!"}'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *      {
     *         "id": 123,
     *         "created_at": "2018-08-20T20:10:03Z",
     *         "description": "hello, this is a marker!",
     *         "position_seconds": 244
     *      }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully created the marker.
     *
     * ### 400 Bad Request
     *
     * * The `user_id` field is required.
     * * The length of the string in the `description` field is too long.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **user:manage:broadcast** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * The user in the access token is not authorized to create video markers for the user in the `user_id` field. The user in the access token must own the video or they must be one of the broadcaster's editors.
     *
     * ### 404 Not Found
     *
     * * The user in the `user_id` field is not streaming live.
     * * The ID in the user\_id field is not valid.
     * * The user hasn't enabled video on demand (VOD).
     *
     * @see https://dev.twitch.tv/docs/api/reference#create-stream-marker
     */
    createStreamMarker: async (
      body: CreateStreamMarkerBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<CreateStreamMarkerResponse> => {
      const url = 'https://api.twitch.tv/helix/streams/markers';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
    /**
     * Gets a list of markers from the user’s most recent stream or from the specified VOD/video. A marker is an arbitrary point in a live stream that the broadcaster or editor marked, so they can return to that spot later to create video highlights (see Video Producer, Highlights in the Twitch UX).
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **user:read:broadcast** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/streams/markers`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the first 5 markers in the most recent stream of user 123.
     *
     * ```
     * curl -X GET
     * 'https://api.twitch.tv/helix/streams/markers?user_id=123&first=5' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "user_id": "123",
     *       "user_name": "TwitchName",
     *       "user_login": "twitchname",
     *       "videos": [
     *         {
     *           "video_id": "456",
     *           "markers": [
     *             {
     *               "id": "106b8d6243a4f883d25ad75e6cdffdc4",
     *               "created_at": "2018-08-20T20:10:03Z",
     *               "description": "hello, this is a marker!",
     *               "position_seconds": 244,
     *               "URL": "https://twitch.tv/twitchname/manager/highlighter/456?t=0h4m06s"
     *             },
     *             ...
     *           ]
     *         }
     *       ]
     *     }
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiIjpudWxsLCJhIjoiMjk1MjA0Mzk3OjI1Mzpib29rbWFyazoxMDZiOGQ1Y"
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of markers.
     *
     * ### 400 Bad Request
     *
     * * The request must specify either the _user\_id_ or _video\_id_ query parameter, but not both.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **user:read:broadcast** or **user:manage:broadcast** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * The user in the access token is not authorized to get the video's markers. The user in the access token must own the video or be one of the broadcaster's editors.
     *
     * ### 404 Not Found
     *
     * * The user specified in the _user\_id_ query parameter doesn't have videos.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-stream-markers
     */
    getStreamMarkers: async (
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetStreamMarkersResponse> => {
      const url = 'https://api.twitch.tv/helix/streams/markers';
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  subscriptions = {
    /**
     * Gets a list of users that subscribe to the specified broadcaster.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **channel:read:subscriptions** scope.
     *
     * A Twitch extensions may use an app access token if the broadcaster has granted the **channel:read:subscriptions** scope from within the Twitch Extensions manager.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/subscriptions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/subscriptions?broadcaster_id=141981764' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_id": "141981764",
     *       "broadcaster_login": "twitchdev",
     *       "broadcaster_name": "TwitchDev",
     *       "gifter_id": "12826",
     *       "gifter_login": "twitch",
     *       "gifter_name": "Twitch",
     *       "is_gift": true,
     *       "tier": "1000",
     *       "plan_name": "Channel Subscription (twitchdev)",
     *       "user_id": "527115020",
     *       "user_name": "twitchgaming",
     *       "user_login": "twitchgaming"
     *     },
     *     ...
     *   ],
     *   "pagination": {
     *     "cursor": "xxxx"
     *   },
     *   "total": 13,
     *   "points": 13
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully retrieved the broadcaster’s list of subscribers.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _broadcaster\_id_ must match the user ID found in the request’s OAuth token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:read:subscriptions** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-broadcaster-subscriptions
     */
    getBroadcasterSubscriptions: async (
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetBroadcasterSubscriptionsResponse> => {
      const url = 'https://api.twitch.tv/helix/subscriptions';
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Checks whether the user subscribes to the broadcaster’s channel.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **user:read:subscriptions** scope.
     *
     * A Twitch extensions may use an app access token if the broadcaster has granted the **user:read:subscriptions** scope from within the Twitch Extensions manager.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/subscriptions/user`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Checks whether the user subscribes to the broadcaster’s channel.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=149747285&user_id=141981764' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_id": "149747285",
     *       "broadcaster_name": "TwitchPresents",
     *       "broadcaster_login": "twitchpresents",
     *       "is_gift": false,
     *       "tier": "1000"
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * The user subscribes to the broadcaster.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     * * The _user\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _user\_id_ must match the user ID found in the request’s OAuth token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **user:read:subscriptions** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 404 Not Found
     *
     * * The user in _user\_id_ does not subscribe to the broadcaster in _broadcaster\_id_.
     *
     * @see https://dev.twitch.tv/docs/api/reference#check-user-subscription
     */
    checkUserSubscription: async (
      params: CheckUserSubscriptionParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<CheckUserSubscriptionResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/subscriptions/user?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  tags = {
    /**
     * Gets a list of all stream tags that Twitch defines. The broadcaster may apply any of these to their channel except automatic tags.
     *
     * For an online list of the possible tags, see [List of All Tags](https://www.twitch.tv/directory/all/tags).
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/tags/streams`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the first page of stream tags that Twitch defines.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/tags/streams' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ```
     * # Twitch CLI example that gets the first page of stream tags.
     * twitch api get /tags/streams
     *
     * # Twitch CLI example that gets the specified stream tags.
     * twitch api get /tags/streams -q tag_id=39490173-ed5f-4271-96a8-26ab546ee1e9 -q tag_id=233f4789-1ad0-403c-aaf9-7d37a22264e7
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "tag_id": "621fb5bf-5498-4d8f-b4ac-db4d40d401bf",
     *       "is_auto": false,
     *       "localization_names": {
     *         "bg-bg": "Изчистване на 1 кредит",
     *         "cs-cz": "1 čistý kredit",
     *         "da-dk": "1 credit klaret",
     *         "de-de": "Mit 1 Leben abschließen",
     *         "el-gr": "1 μόνο πίστωση",
     *         "en-us": "1 Credit Clear",
     *         ...
     *       },
     *       "localization_descriptions": {
     *         "bg-bg": "За потоци с акцент върху завършване на аркадна игра с монети, в която не се използва продължаване",
     *         "cs-cz": "Pro vysílání s důrazem na plnění mincových arkádových her bez použití pokračování.",
     *         "da-dk": "Til streams med vægt på at gennemføre et arkadespil uden at bruge continues",
     *         "de-de": "Für Streams mit dem Ziel, ein Coin-op-Arcade-Game mit nur einem Leben abzuschließen.",
     *         "el-gr": "Για μεταδόσεις με έμφαση στην ολοκλήρωση παλαιού τύπου ηλεκτρονικών παιχνιδιών που λειτουργούν με κέρμα, χωρίς να χρησιμοποιούν συνέχειες",
     *         "en-us": "For streams with an emphasis on completing a coin-op arcade game without using any continues",
     *         ...
     *       }
     *     },
     *     ...
     *   ],
     *   "pagination": {
     *     "cursor": "eyJiI..."
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of tags.
     *
     * ### 400 Bad Request
     *
     * * The _tag\_id_ query parameter is empty (for example, `&tag_id=`).
     * * The list of tag IDs is too long.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token or user access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-all-stream-tags
     */
    getAllStreamTags: async (
      params: GetAllStreamTagsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetAllStreamTagsResponse> => {
      const s = getSearchParams(params, ["tag_id"]);
      const url = `https://api.twitch.tv/helix/tags/streams?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets the list of stream tags that the broadcaster or Twitch added to their channel.
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/streams/tags`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the TwitchGaming channel’s tags.
     *
     * ```
     * curl -X GET
     * 'https://api.twitch.tv/helix/streams/tags?broadcaster_id=527115020' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ```
     * # Twitch CLI example that gets the TwitchGaming channel's tags.
     * twitch api get /streams/tags -q broadcaster_id=527115020
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "tag_id": "6ea6bca4-4712-4ab9-a906-e3336a9d8039",
     *       "is_auto": true,
     *       "localization_names": {
     *         "bg-bg": "английски",
     *         "cs-cz": "Angličtina",
     *         "da-dk": "Engelsk",
     *         "de-de": "Englisch",
     *         "el-gr": "Αγγλικά",
     *         "en-us": "English",
     *         ...
     *       },
     *       "localization_descriptions": {
     *         "bg-bg": "За потоци с използване на английски",
     *         "cs-cz": "Pro vysílání obsahující angličtinu.",
     *         "da-dk": "Til streams, hvori der indgår engelsk",
     *         "de-de": "Für Streams auf Englisch.",
     *         "el-gr": "Για μεταδόσεις που περιλαμβάνουν τη χρήση Αγγλικών",
     *         "en-us": "For streams featuring the use of English",
     *         ...
     *       }
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of tags.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ field is required.
     * * The ID in the _broadcaster\_id_ field is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must specify an app access token or user access token.
     * * The access token is not valid.
     * * The ID in the Client-Id header must match the Client ID in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-stream-tags
     */
    getStreamTags: async (
      params: GetStreamTagsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetStreamTagsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/streams/tags?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Applies one or more tags to the specified channel, overwriting existing tags.
     *
     * **NOTE**: You may not specify automatic tags; the call fails if you specify automatic tags. Automatic tags are tags that Twitch applies to the channel. For a list of automatic tags, see [List of All Tags](https://www.twitch.tv/directory/all/tags). To get the list of possible tags programmatically, see [Get All Stream Tags](https://dev.twitch.tv/docs/api/reference#get-all-stream-tags).
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **channel:manage:broadcast** scope.
     *
     * ## URL
     *
     * `PUT https://api.twitch.tv/helix/streams/tags`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Applies two stream tags to channel 257788195.
     *
     * ```
     * curl -X PUT 'https://api.twitch.tv/helix/streams/tags?broadcaster_id=257788195' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H 'Content-Type: application/json' \
     * -d '{"tag_ids":["621fb5bf-5498-4d8f-b4ac-db4d40d401bf","52d7e4cc-633d-46f5-818c-bb59102d9549"]}'
     *
     * ```
     *
     * ```
     * # Twitch CLI example that adds two stream tags to the channel.
     * twitch api put /streams/tags -q broadcaster_id=1234567 -b '{"tag_ids":["621fb5bf-5498-4d8f-b4ac-db4d40d401bf", "52d7e4cc-633d-46f5-818c-bb59102d9549"]}'
     *
     * # Twitch CLI example that removes all stream tags from the channel.
     * twitch api put /streams/tags -q broadcaster_id=1234567 -b '{"tag_ids":[]}'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully replaced the stream’s tags.
     *
     * ### 400 Bad Request
     *
     * * The tag ID <value> is not valid.
     * * The list of tag IDs is too long.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _broadcaster\_id_ must match the user ID in the access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:manage:broadcast** scope.
     * * The access token is not valid.
     * * The client ID specified in the Client-Id header must match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * You may not add automatic tags.
     *
     * @see https://dev.twitch.tv/docs/api/reference#replace-stream-tags
     */
    replaceStreamTags: async (
      params: ReplaceStreamTagsParams,
      body: ReplaceStreamTagsBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/streams/tags?${s}`;
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
  };
  teams = {
    /**
     * Gets the list of Twitch teams that the broadcaster is a member of.
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/teams/channel`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets a list of Twitch Teams that the specified broadcaster is a member of.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/teams/channel?broadcaster_id=96909659' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "broadcaster_id": "96909659",
     *       "broadcaster_name": "CSharpFritz",
     *       "broadcaster_login": "csharpfritz",
     *       "background_image_url": null,
     *       "banner": null,
     *       "created_at": "2019-02-11T12:09:22Z",
     *       "updated_at": "2020-11-18T15:56:41Z",
     *       "info": "<p>An outgoing and enthusiastic group of friendly channels that write code, teach about technology, and promote the technical community.</p>",
     *       "thumbnail_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/team-livecoders-team_logo_image-bf1d9a87ca81432687de60e24ad9593d-600x600.png",
     *       "team_name": "livecoders",
     *       "team_display_name": "Live Coders",
     *       "id": "6358"
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of teams.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header must contain an app access token or user access token.
     * * The access token is not valid.
     * * The ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 404 Not Found
     *
     * * The broadcaster was not found.
     * * The broadcaster is not a member of a team.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-channel-teams
     */
    getChannelTeams: async (
      params: GetChannelTeamsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetChannelTeamsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/teams/channel?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets information about the specified Twitch team. [Read More](https://help.twitch.tv/s/article/twitch-teams)
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/teams`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets information about the specified team.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/teams?id=6358' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "users": [
     *         {
     *           "user_id": "278217731",
     *           "user_name": "mastermndio",
     *           "user_login": "mastermndio"
     *         },
     *         {
     *           "user_id": "41284990",
     *           "user_name": "jenninexus",
     *           "user_login": "jenninexus"
     *         },
     *         ...
     *       ],
     *       "background_image_url": null,
     *       "banner": null,
     *       "created_at": "2019-02-11T12:09:22Z",
     *       "updated_at": "2020-11-18T15:56:41Z",
     *       "info": "<p>An outgoing and enthusiastic group of friendly channels that write code, teach about technology, and promote the technical community.</p>",
     *       "thumbnail_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/team-livecoders-team_logo_image-bf1d9a87ca81432687de60e24ad9593d-600x600.png",
     *       "team_name": "livecoders",
     *       "team_display_name": "Live Coders",
     *       "id": "6358"
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the team’s information.
     *
     * ### 400 Bad Request
     *
     * * The _name_ or _id_ query parameter is required.
     * * Specify either the _name_ or _id_ query parameter but not both.
     * * The ID in the _id_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header must contain an app access token or user access token.
     * * The access token is not valid.
     * * The ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 404 Not Found
     *
     * * The specified team was not found.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-teams
     */
    getTeams: async (
      params: GetTeamsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetTeamsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/teams?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  users = {
    /**
     * Gets information about one or more users.
     *
     * You may look up users using their user ID, login name, or both but the sum total of the number of users you may look up is 100\. For example, you may specify 50 IDs and 50 names or 100 IDs or names, but you cannot specify 100 IDs and 100 names.
     *
     * If you don’t specify IDs or login names, the request returns information about the user in the access token if you specify a user access token.
     *
     * To include the user’s verified email address in the response, you must use a user access token that includes the **user:read:email** scope.
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/users`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets information about the specified user.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/users?id=141981764' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "141981764",
     *       "login": "twitchdev",
     *       "display_name": "TwitchDev",
     *       "type": "",
     *       "broadcaster_type": "partner",
     *       "description": "Supporting third-party developers building Twitch integrations from chatbots to game integrations.",
     *       "profile_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/8a6381c7-d0c0-4576-b179-38bd5ce1d6af-profile_image-300x300.png",
     *       "offline_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/3f13ab61-ec78-4fe6-8481-8682cb3b0ac2-channel_offline_image-1920x1080.png",
     *       "view_count": 5980557,
     *       "email": "not-real@email.com",
     *       "created_at": "2016-12-14T20:32:28Z"
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the specified users’ information.
     *
     * ### 400 Bad Request
     *
     * * The _id_ or _login_ query parameter is required unless the request uses a user access token.
     * * The request exceeded the maximum allowed number of _id_ and/or _login_ query parameters.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain an app access token or user access token.
     * * The access token is not valid.
     * * The ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-users
     */
    getUsers: async (
      params: GetUsersParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetUsersResponse> => {
      const s = getSearchParams(params, ["id","login"]);
      const url = `https://api.twitch.tv/helix/users?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Updates the specified user’s information. The user ID in the OAuth token identifies the user whose information you want to update.
     *
     * To include the user’s verified email address in the response, the user access token must also include the **user:read:email** scope.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **user:edit** scope.
     *
     * ## URL
     *
     * `PUT https://api.twitch.tv/helix/users`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Updates the description of the specified user.
     *
     * ```
     * curl  -X PUT 'https://api.twitch.tv/helix/users?description=BaldAngel' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data":[{
     *     "id": "44322889",
     *     "login": "dallas",
     *     "display_name": "dallas",
     *     "type": "staff",
     *     "broadcaster_type": "affiliate",
     *     "description": "BaldAngel",
     *     "profile_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/4d1f36cbf1f0072d-profile_image-300x300.png",
     *     "offline_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/dallas-channel_offline_image-2e82c1df2a464df7-1920x1080.jpeg",
     *     "view_count": 6995,
     *     "email": "not-real@email.com",
     *     "created_at": "2013-06-03T19:12:02.580593Z"
     *   }]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully updated the specified user’s information.
     *
     * ### 400 Bad Request
     *
     * * The string in the _description_ query parameter is too long.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **user:edit** scope.
     * * The access token is not valid.
     * * The ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#update-user
     */
    updateUser: async (
      params: UpdateUserParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<UpdateUserResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/users?${s}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets information about users that are following other users. For example, you can use this endpoint to answer questions like “who is qotrok following,” “who is following qotrok,” or “is user X following user Y.”
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/users/follows`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the first 20 IDs of users who are following the specified user.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/users/follows?to_id=23161357' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *    "total": 12345,
     *    "data":
     *    [
     *       {
     *          "from_id": "171003792",
     *          "from_login": "iiisutha067iii",
     *          "from_name": "IIIsutha067III",
     *          "to_id": "23161357",
     *          "to_name": "LIRIK",
     *          "followed_at": "2017-08-22T22:55:24Z"
     *       },
     *       {
     *          "from_id": "113627897",
     *          "from_login": "birdman616",
     *          "from_name": "Birdman616",
     *          "to_id": "23161357",
     *          "to_name": "LIRIK",
     *          "followed_at": "2017-08-22T22:55:04Z"
     *       },
     *       ...
     *    ],
     *    "pagination":{
     *      "cursor": "eyJiIjpudWxsLCJhIjoiMTUwMzQ0MTc3NjQyNDQyMjAwMCJ9"
     *    }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the follows information.
     *
     * ### 400 Bad Request
     *
     * * The _from\_id_ query parameter, _to\_id_ query parameter, or both parameters are required.
     * * The ID in the _from\_id_ query parameter is not valid
     * * The ID in the _to\_id_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain an app access token or user access token.
     * * The access token is not valid.
     * * The ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-users-follows
     */
    getUsersFollows: async (
      params: GetUsersFollowsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetUsersFollowsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/users/follows?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets the list of users that the broadcaster has blocked. [Read More](https://help.twitch.tv/s/article/how-to-manage-harassment-in-chat?language=en%5FUS#BlockWhispersandMessagesfromStrangers)
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **user:read:blocked\_users** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/users/blocks`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the specified broadcaster’s list of blocked users.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/users/blocks?broadcaster_id=141981764' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "user_id": "135093069",
     *       "user_login": "bluelava",
     *       "display_name": "BlueLava"
     *     },
     *     {
     *       "user_id": "27419011",
     *       "user_login": "travistyoj",
     *       "display_name": "TravistyOJ"
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the broadcaster’s list of blocked users.
     *
     * ### 400 Bad Request
     *
     * * The _broadcaster\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The ID in _broadcaster\_id_ must match the user ID found in the request’s access token.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **user:read:blocked\_users** scope.
     * * The access token is not valid.
     * * The ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-user-block-list
     */
    getUserBlockList: async (
      params: GetUserBlockListParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetUserBlockListResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/users/blocks?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Blocks the specified user from interacting with or having contact with the broadcaster. The user ID in the OAuth token identifies the broadcaster who is blocking the user.
     *
     * To learn more about blocking users, see [Block Other Users on Twitch](https://help.twitch.tv/s/article/how-to-manage-harassment-in-chat?language=en%5FUS#BlockWhispersandMessagesfromStrangers).
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **user:manage:blocked\_users** scope.
     *
     * ## URL
     *
     * `PUT https://api.twitch.tv/helix/users/blocks`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Blocks the specified user.
     *
     * ```
     * curl -X PUT 'https://api.twitch.tv/helix/users/blocks?target_user_id=198704263' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully blocked the user.
     *
     * ### 400 Bad Request
     *
     * * The _target\_user\_id_ query parameter is required.
     * * The ID in _target\_user\_id_ cannot be the same as the user ID in the access token.
     * * The value in _source\_context_ is not valid.
     * * The value in _reason_ is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **user:manage:blocked\_users** scope.
     * * The access token is not valid.
     * * The ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#block-user
     */
    blockUser: async (
      params: BlockUserParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/users/blocks?${s}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Removes the user from the broadcaster’s list of blocked users. The user ID in the OAuth token identifies the broadcaster who’s removing the block.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **user:manage:blocked\_users** scope.
     *
     * ## URL
     *
     * `DELETE https://api.twitch.tv/helix/users/blocks`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Unblocks the specified user.
     *
     * ```
     * curl -X DELETE 'https://api.twitch.tv/helix/users/blocks?target_user_id=198704263' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully removed the block.
     *
     * ### 400 Bad Request
     *
     * * The _target\_user\_id_ query parameter is required.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **user:read:blocked\_users** scope.
     * * The access token is not valid.
     * * The ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#unblock-user
     */
    unblockUser: async (
      params: UnblockUserParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/users/blocks?${s}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets a list of all extensions (both active and inactive) that the broadcaster has installed. The user ID in the access token identifies the broadcaster.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **user:read:broadcast** scope.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/users/extensions/list`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the extensions that the user has installed.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/users/extensions/list' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "wi08ebtatdc7oj83wtl9uxwz807l8b",
     *       "version": "1.1.8",
     *       "name": "Streamlabs Leaderboard",
     *       "can_activate": true,
     *       "type": [
     *         "panel"
     *       ]
     *     },
     *     {
     *       "id": "d4uvtfdr04uq6raoenvj7m86gdk16v",
     *       "version": "2.0.2",
     *       "name": "Prime Subscription and Loot Reminder",
     *       "can_activate": true,
     *       "type": [
     *         "overlay"
     *       ]
     *     },
     *     {
     *       "id": "rh6jq1q334hqc2rr1qlzqbvwlfl3x0",
     *        "version": "1.1.0",
     *       "name": "TopClip",
     *       "can_activate": true,
     *       "type": [
     *         "mobile",
     *         "panel"
     *       ]
     *     },
     *     {
     *       "id": "zfh2irvx2jb4s60f02jq0ajm8vwgka",
     *       "version": "1.0.19",
     *       "name": "Streamlabs",
     *       "can_activate": true,
     *       "type": [
     *         "mobile",
     *         "overlay"
     *       ]
     *     },
     *     {
     *       "id": "lqnf3zxk0rv0g7gq92mtmnirjz2cjj",
     *       "version": "0.0.1",
     *       "name": "Dev Experience Test",
     *       "can_activate": true,
     *       "type": [
     *         "component",
     *         "mobile",
     *         "panel",
     *         "overlay"
     *       ]
     *     }
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the user’s installed extensions.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **user:read:broadcast** scope.
     * * The access token is not valid.
     * * The ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-user-extensions
     */
    getUserExtensions: async (
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetUserExtensionsResponse> => {
      const url = 'https://api.twitch.tv/helix/users/extensions/list';
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Gets the active extensions that the broadcaster has installed for each configuration.
     *
     * NOTE: To include extensions that you have under development, you must specify a user access token that includes the **user:read:broadcast** or **user:edit:broadcast** scope.
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/users/extensions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets the user’s active extensions. The API gets the user from the access token.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/users/extensions' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": {
     *     "panel": {
     *       "1": {
     *         "active": true,
     *         "id": "rh6jq1q334hqc2rr1qlzqbvwlfl3x0",
     *         "version": "1.1.0",
     *         "name": "TopClip"
     *       },
     *       "2": {
     *         "active": true,
     *         "id": "wi08ebtatdc7oj83wtl9uxwz807l8b",
     *         "version": "1.1.8",
     *         "name": "Streamlabs Leaderboard"
     *       },
     *       "3": {
     *         "active": true,
     *         "id": "naty2zwfp7vecaivuve8ef1hohh6bo",
     *         "version": "1.0.9",
     *         "name": "Streamlabs Stream Schedule & Countdown"
     *       }
     *     },
     *     "overlay": {
     *       "1": {
     *         "active": true,
     *         "id": "zfh2irvx2jb4s60f02jq0ajm8vwgka",
     *         "version": "1.0.19",
     *         "name": "Streamlabs"
     *       }
     *     },
     *     "component": {
     *       "1": {
     *         "active": true,
     *         "id": "lqnf3zxk0rv0g7gq92mtmnirjz2cjj",
     *         "version": "0.0.1",
     *         "name": "Dev Experience Test",
     *         "x": 0,
     *         "y": 0
     *       },
     *       "2": {
     *         "active": false
     *       }
     *     }
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the user’s active extensions.
     *
     * ### 400 Bad Request
     *
     * * The _user\_id_ query parameter is required if you specify an app access token.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain an app access token or user access token.
     * * The access token is not valid.
     * * The ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-user-active-extensions
     */
    getUserActiveExtensions: async (
      params: GetUserActiveExtensionsParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetUserActiveExtensionsResponse> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/users/extensions?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Updates an installed extension’s information. You can update the extension’s activation state, ID, and version number. The user ID in the access token identifies the broadcaster whose extensions you’re updating.
     *
     * NOTE: If you try to activate an extension under multiple extension types, the last write wins (and there is no guarantee of write order).
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **user:edit:broadcast** scope.
     *
     * ## URL
     *
     * `PUT https://api.twitch.tv/helix/users/extensions`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Updates the the user’s installed extensions.
     *
     * ```
     * curl -X PUT 'https://api.twitch.tv/helix/users/extensions' \
     * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
     * -H "Content-Type: application/json" \
     * -d '{
     *   "data": {
     *     "panel": {
     *       "1": {
     *         "active": true,
     *         "id": "rh6jq1q334hqc2rr1qlzqbvwlfl3x0",
     *         "version": "1.1.0"
     *       },
     *       "2": {
     *         "active": true,
     *         "id": "wi08ebtatdc7oj83wtl9uxwz807l8b",
     *         "version": "1.1.8"
     *       },
     *       "3": {
     *         "active": true,
     *         "id": "naty2zwfp7vecaivuve8ef1hohh6bo",
     *         "version": "1.0.9"
     *       }
     *     },
     *     "overlay": {
     *       "1": {
     *         "active": true,
     *         "id": "zfh2irvx2jb4s60f02jq0ajm8vwgka",
     *         "version": "1.0.19"
     *       }
     *     },
     *     "component": {
     *       "1": {
     *         "active": true,
     *         "id": "lqnf3zxk0rv0g7gq92mtmnirjz2cjj",
     *         "version": "0.0.1",
     *         "x": 0,
     *         "y": 0
     *       },
     *       "2": {
     *         "active": false
     *       }
     *     }
     *   }
     * }'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": {
     *     "panel": {
     *       "1": {
     *         "active": true,
     *         "id": "rh6jq1q334hqc2rr1qlzqbvwlfl3x0",
     *         "version": "1.1.0",
     *         "name": "TopClip"
     *       },
     *       "2": {
     *         "active": true,
     *         "id": "wi08ebtatdc7oj83wtl9uxwz807l8b",
     *         "version": "1.1.8",
     *         "name": "Streamlabs Leaderboard"
     *       },
     *       "3": {
     *         "active": true,
     *         "id": "naty2zwfp7vecaivuve8ef1hohh6bo",
     *         "version": "1.0.9",
     *         "name": "Streamlabs Stream Schedule & Countdown"
     *       }
     *     },
     *     "overlay": {
     *       "1": {
     *         "active": true,
     *         "id": "zfh2irvx2jb4s60f02jq0ajm8vwgka",
     *         "version": "1.0.19",
     *         "name": "Streamlabs"
     *       }
     *     },
     *     "component": {
     *       "1": {
     *         "active": true,
     *         "id": "lqnf3zxk0rv0g7gq92mtmnirjz2cjj",
     *         "version": "0.0.1",
     *         "name": "Dev Experience Test",
     *         "x": 0,
     *         "y": 0
     *       },
     *       "2": {
     *         "active": false
     *       }
     *     }
     *   }
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully updated the active extensions.
     *
     * ### 400 Bad Request
     *
     * * The JSON payload is malformed.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **user:edit:broadcast** scope.
     * * The access token is not valid.
     * * The ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 404 Not Found
     *
     * * An extension with the specified `id` and `version` values was not found.
     *
     * @see https://dev.twitch.tv/docs/api/reference#update-user-extensions
     */
    updateUserExtensions: async (
      body: UpdateUserExtensionsBody,
      accessToken = '',
      clientId = '',
    ): ApiResponse<UpdateUserExtensionsResponse> => {
      const url = 'https://api.twitch.tv/helix/users/extensions';
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          ...this.getAuthHeaders(accessToken, clientId),
          'Content-Type': 'application/json',
        },
      });
      return getApiResponse(response);
    },
  };
  videos = {
    /**
     * Gets information about one or more published videos. You may get videos by ID, by user, or by game/category.
     *
     * You may apply several filters to get a subset of the videos. The filters are applied as an AND operation to each video. For example, if _language_ is set to ‘de’ and _game\_id_ is set to 21779, the response includes only videos that show playing League of Legends by users that stream in German. The filters apply only if you get videos by user ID or game ID.
     *
     * ## Authentication
     *
     * Requires an app access token or user access token.
     *
     * ## URL
     *
     * `GET https://api.twitch.tv/helix/videos`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Gets information about the specified video.
     *
     * ```
     * curl -X GET 'https://api.twitch.tv/helix/videos?id=335921245' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     {
     *       "id": "335921245",
     *       "stream_id": null,
     *       "user_id": "141981764",
     *       "user_login": "twitchdev",
     *       "user_name": "TwitchDev",
     *       "title": "Twitch Developers 101",
     *       "description": "Welcome to Twitch development! Here is a quick overview of our products and information to help you get started.",
     *       "created_at": "2018-11-14T21:30:18Z",
     *       "published_at": "2018-11-14T22:04:30Z",
     *       "url": "https://www.twitch.tv/videos/335921245",
     *       "thumbnail_url": "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/twitchdev/335921245/ce0f3a7f-57a3-4152-bc06-0c6610189fb3/thumb/index-0000000000-%{width}x%{height}.jpg",
     *       "viewable": "public",
     *       "view_count": 1863062,
     *       "language": "en",
     *       "type": "upload",
     *       "duration": "3m21s",
     *       "muted_segments": [
     *         {
     *           "duration": 30,
     *           "offset": 120
     *         }
     *       ]
     *     }
     *   ],
     *   "pagination": {}
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully retrieved the list of videos.
     *
     * ### 400 Bad Request
     *
     * * The request must specify either the _id_ or _user\_id_ or _game\_id_ query parameter.
     * * The _id_, _user\_id_, and _game\_id_ query parameters are mutually exclusive; you must specify only one of them.
     * * The value in the _id_ query parameter is not valid.
     * * The ID in the _game\_id_ query parameter is not valid.
     * * The value in the _type_ query parameter is not valid.
     * * The value in the _period_ query parameter is not valid.
     * * The value in the _sort_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The Authorization header is required and must contain an app access token or user access token.
     * * The access token is not valid.
     * * The ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 404 Not Found
     *
     * * The ID in the _game\_id_ query parameter was not found.
     * * The ID in the _id_ query parameter was not found. Returned only if all the IDs were not found; otherwise, the ID is ignored.
     *
     * @see https://dev.twitch.tv/docs/api/reference#get-videos
     */
    getVideos: async (
      params: GetVideosParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<GetVideosResponse> => {
      const s = getSearchParams(params, ["id"]);
      const url = `https://api.twitch.tv/helix/videos?${s}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
    /**
     * Deletes one or more videos. You may delete past broadcasts, highlights, or uploads.
     *
     * ## Authentication
     *
     * Requires a user access token that includes the **channel:manage:videos** scope.
     *
     * ## URL
     *
     * `DELETE https://api.twitch.tv/helix/videos`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Deletes the two specified videos.
     *
     * ```
     * curl -X DELETE 'https://api.twitch.tv/helix/videos?id=1234&id=9876' \
     * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
     * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
     *
     * ```
     *
     * ### Example Response
     *
     * ```
     * {
     *   "data": [
     *     "1234",
     *     "9876"
     *   ]
     * }
     *
     * ```
     *
     * ## Response codes
     *
     * ### 200 OK
     *
     * Successfully deleted the list of videos.
     *
     * ### 400 Bad Request
     *
     * * The _id_ query parameter is required.
     * * The request exceeded the number of allowed _id_ query parameters.
     *
     * ### 401 Unauthorized
     *
     * * The caller is not authorized to delete the specified video.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **channel:manage:videos** scope.
     * * The access token is not valid.
     * * The ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * @see https://dev.twitch.tv/docs/api/reference#delete-videos
     */
    deleteVideos: async (
      params: DeleteVideosParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<DeleteVideosResponse> => {
      const s = getSearchParams(params, ["id"]);
      const url = `https://api.twitch.tv/helix/videos?${s}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };
  whispers = {
    /**
     * Sends a whisper message to the specified user.
     *
     * NOTE: The user sending the whisper must have a verified phone number (see the **Phone Number** setting in your [Security and Privacy](https://www.twitch.tv/settings/security) settings).
     *
     * NOTE: The API may silently drop whispers that it suspects of violating Twitch policies. (The API does not indicate that it dropped the whisper; it returns a 204 status code as if it succeeded.)
     *
     * **Rate Limits**: You may whisper to a maximum of 40 unique recipients per day. Within the per day limit, you may whisper a maximum of 3 whispers per second and a maximum of 100 whispers per minute.
     *
     * ## Authorization
     *
     * Requires a user access token that includes the **user:manage:whispers** scope.
     *
     * ## URL
     *
     * `POST https://api.twitch.tv/helix/whispers`
     *
     * ## Examples
     *
     * ### Example Request
     *
     * Send the user a whisper message.
     *
     * ```
     * curl -X POST 'https://api.twitch.tv/helix/whispers?from_user_id=123&to_user_id=456' \
     * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
     * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t' \
     * -H 'Content-Type: application/json' \
     * -d '{"message":"hello"}'
     *
     * ```
     *
     * ## Response codes
     *
     * ### 204 No Content
     *
     * Successfully sent the whisper message or the message was silently dropped.
     *
     * ### 400 Bad Request
     *
     * * The ID in the _from\_user\_id_ and _to\_user\_id_ query parameters must be different.
     * * The `message` field must not contain an empty string.
     * * The user that you're sending the whisper to doesn't allow whisper messages (see the **Block Whispers from Strangers** setting in your [Security and Privacy](https://www.twitch.tv/settings/security) settings).
     * * Whisper messages may not be sent to suspended users.
     * * The ID in the _from\_user\_id_ query parameter is not valid.
     * * The ID in the _to\_user\_id_ query parameter is not valid.
     *
     * ### 401 Unauthorized
     *
     * * The user in the _from\_user\_id_ query parameter must have a verified phone number.
     * * The Authorization header is required and must contain a user access token.
     * * The user access token must include the **user:manage:whispers** scope.
     * * The access token is not valid.
     * * This ID in _from\_user\_id_ must match the user ID in the user access token.
     * * The client ID specified in the Client-Id header does not match the client ID specified in the access token.
     *
     * ### 403 Forbidden
     *
     * * Suspended users may not send whisper messages.
     * * The account that's sending the message doesn't allow sending whispers.
     *
     * ### 404 Not Found
     *
     * * The ID in _to\_user\_id_ was not found.
     *
     * ### 429 Too Many Requests
     *
     * * The sending user exceeded the number of whisper requests that they may make. See Rate Limits for this endpoint above.
     *
     * @see https://dev.twitch.tv/docs/api/reference#send-whisper
     */
    sendWhisper: async (
      params: SendWhisperParams,
      accessToken = '',
      clientId = '',
    ): ApiResponse<void> => {
      const s = getSearchParams(params, []);
      const url = `https://api.twitch.tv/helix/whispers?${s}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getAuthHeaders(accessToken, clientId),
      });
      return getApiResponse(response);
    },
  };

}
