export const OPEN_API_TITLE = 'Twitch API Swagger UI (Unofficial)';
export const OPEN_API_DESCRIPTION = `
Unofficial Swagger UI for Twitch API.

All endpoints are generated automatically from the [twitch docs](https://dev.twitch.tv/docs/api/reference) page.

__Features:__

* Swagger UI for all Twitch API endpoints
* Schemas for _Request Query Parameters_, _Request Body_, _Response Body_
* Some additional schemas like _Clip_, _ChatBadge_, _Prediction_, _Game_, _Channel_, _Video_ etc.
* Response codes and examples
* Generated types for TypeScript: [twitch-api-ts](https://github.com/DmitryScaletta/twitch-api-ts)

__Repository:__ [github.com/DmitryScaletta/twitch-api-swagger](https://github.com/DmitryScaletta/twitch-api-swagger)
`.trim();

export const HTML_DESCRIPTION =
  'Unofficial Swagger UI for Twitch API. All endpoints are generated automatically from the twitch docs page. Features: Swagger UI for all Twitch API endpoints; Schemas for Request Query Parameters, Request Body, Response Body; Some additional schemas like Clip, ChatBadge, Prediction, Game, Channel, Video etc.; Response codes and examples; Generated types for TypeScript';

export const PARAMS_MORE_THAN_ONE_VALUES: Record<string, string[]> = {
  'get-extension-transactions': ['id'],
  'get-channel-information': ['broadcaster_id'],
  'get-custom-reward': ['id'],
  'get-custom-reward-redemption': ['id'],
  'update-redemption-status': ['id'],
  'get-emote-sets': ['emote_set_id'],
  'get-user-chat-color': ['user_id'],
  'get-clips': ['id'],
  'get-code-status': ['code'],
  'get-drops-entitlements': ['id'],
  'redeem-code': ['code'],
  'get-games': ['id', 'name', 'igdb_id'],
  'get-banned-users': ['user_id'],
  'get-moderators': ['user_id'],
  'get-vips': ['user_id'],
  'get-polls': ['id'],
  'get-predictions': ['id'],
  'get-channel-stream-schedule': ['id'],
  'get-streams': ['user_id', 'user_login', 'game_id', 'language'],
  'get-broadcaster-subscriptions': ['user_id'],
  'get-all-stream-tags': ['tag_id'],
  'get-users': ['id', 'login'],
  'get-videos': ['id'],
  'delete-videos': ['id'],
};

// prettier-ignore
export const RESPONSE_BODY_SCHEMA_NAMES: Record<string, [path: string, name: string][]> = {
  'get-extension-analytics':                [['data[0]', 'ExtensionAnalytics']],
  'get-game-analytics':                     [['data[0]', 'GameAnalytics']],
  'get-bits-leaderboard':                   [['data[0]', 'BitsLeaderboard']],
  'get-cheermotes':                         [['data[0]', 'Cheermote']],
  'get-extension-transactions':             [['data[0]', 'ExtensionTransaction']],
  'get-channel-information':                [['data[0]', 'ChannelInformation']],
  'get-channel-editors':                    [['data[0]', 'ChannelEditor']],
  'create-custom-rewards':                  [['data[0]', 'CustomReward']],
  'get-custom-reward':                      [['data[0]', 'CustomReward']],
  'update-custom-reward':                   [['data[0]', 'CustomReward']],
  'get-custom-reward-redemption':           [['data[0]', 'CustomRewardRedemption']],
  'update-redemption-status':               [['data[0]', 'CustomRewardRedemption']],
  'get-charity-campaign':                   [['data[0]', 'CharityCampaign']],
  'get-charity-campaign-donations':         [['data[0]', 'CharityCampaignDonation']],
  'get-chatters':                           [['data[0]', 'Chatter']],
  'get-channel-emotes':                     [['data[0]', 'ChannelEmote']],
  'get-global-emotes':                      [['data[0]', 'GlobalEmote']],
  'get-emote-sets':                         [['data[0]', 'Emote']],
  'get-channel-chat-badges':                [['data[0]', 'ChatBadge']],
  'get-global-chat-badges':                 [['data[0]', 'ChatBadge']],
  'get-chat-settings':                      [['data[0]', 'ChatSettings']],
  'update-chat-settings':                   [['data[0]', 'ChatSettingsUpdated']],
  'get-user-chat-color':                    [['data[0]', 'UserChatColor']],
  'get-clips':                              [['data[0]', 'Clip']],
  'get-code-status':                        [['data[0]', 'CodeStatus']],
  'get-drops-entitlements':                 [['data[0]', 'DropsEntitlement']],
  'update-drops-entitlements':              [['data[0]', 'DropsEntitlementUpdated']],
  'get-extension-configuration-segment':    [['data[0]', 'ExtensionConfigurationSegment']],
  'get-extension-live-channels':            [['data[0]', 'ExtensionLiveChannel']],
  'get-extension-secrets':                  [['data[0]', 'ExtensionSecret']],
  'create-extension-secret':                [['data[0]', 'ExtensionSecret']],
  'get-extensions':                         [['data[0]', 'Extension']],
  'get-released-extensions':                [['data[0]', 'Extension']],
  'get-extension-bits-products':            [['data[0]', 'ExtensionBitsProduct']],
  'update-extension-bits-product':          [['data[0]', 'ExtensionBitsProduct']],
  'create-eventsub-subscription':           [['data[0]', 'EventSubSubscription']],
  'get-eventsub-subscriptions':             [['data[0]', 'EventSubSubscription']],
  'get-top-games':                          [['data[0]', 'Game']],
  'get-games':                              [['data[0]', 'Game']],
  'get-creator-goals':                      [['data[0]', 'CreatorGoal']],
  'get-hype-train-events':                  [['data[0]', 'HypeTrainEvent']],
  'check-automod-status':                   [['data[0]', 'AutoModStatus']],
  'get-automod-settings':                   [['data[0]', 'AutoModSettings']],
  'update-automod-settings':                [['data[0]', 'AutoModSettings']],
  'get-banned-users':                       [['data[0]', 'BannedUser']],
  'get-blocked-terms':                      [['data[0]', 'BlockedTerm']],
  'add-blocked-term':                       [['data[0]', 'BlockedTerm']],
  'get-moderators':                         [['data[0]', 'UserModerator']],
  'get-vips':                               [['data[0]', 'UserVip']],
  'get-polls':                              [['data[0]', 'Poll']],
  'create-poll':                            [['data[0]', 'Poll']],
  'end-poll':                               [['data[0]', 'Poll']],
  'get-predictions':                        [['data[0]', 'Prediction'], ['data[0].outcomes', 'PredictionOutcome']],
  'create-prediction':                      [['data[0]', 'Prediction'], ['data[0].outcomes', 'PredictionOutcome']],
  'end-prediction':                         [['data[0]', 'Prediction'], ['data[0].outcomes', 'PredictionOutcome']],
  'get-channel-stream-schedule':            [['data.segments', 'ChannelStreamScheduleSegment']],
  'create-channel-stream-schedule-segment': [['data.segments', 'ChannelStreamScheduleSegment']],
  'update-channel-stream-schedule-segment': [['data.segments', 'ChannelStreamScheduleSegment']],
  'search-categories':                      [['data[0]', 'Category']],
  'search-channels':                        [['data[0]', 'Channel']],
  'get-soundtrack-current-track':           [['data[0]', 'SoundtrackCurrentTrack']],
  'get-soundtrack-playlist':                [['data[0]', 'SoundtrackTrack']],
  'get-soundtrack-playlists':               [['data[0]', 'SoundtrackPlaylist']],
  'get-streams':                            [['data[0]', 'Stream']],
  'get-followed-streams':                   [['data[0]', 'Stream']],
  'create-stream-marker':                   [['data[0]', 'StreamMarkerCreated']],
  'get-stream-markers':                     [['data[0]', 'StreamMarkers']],
  'get-broadcaster-subscriptions':          [['data[0]', 'BroadcasterSubscription']],
  'check-user-subscription':                [['data[0]', 'UserSubscription']],
  'get-all-stream-tags':                    [['data[0]', 'StreamTag']],
  'get-stream-tags':                        [['data[0]', 'StreamTag']],
  'get-channel-teams':                      [['data[0]', 'ChannelTeam']],
  'get-teams':                              [['data[0]', 'Team']],
  'get-users':                              [['data[0]', 'User']],
  'update-user':                            [['data[0]', 'User']],
  'get-users-follows':                      [['data[0]', 'UsersFollow']],
  'get-user-block-list':                    [['data[0]', 'UserBlockList']],
  'get-user-extensions':                    [['data[0]', 'UserExtension']],
  'get-videos':                             [['data[0]', 'Video']],
};
