export const lowerFirstLetter = (text: string): string =>
  text.charAt(0).toLowerCase() + text.slice(1);

const endpointNamesMap: Record<string, string> = {
  'Start a raid': 'StartRaid',
  'Cancel a raid': 'CancelRaid',
};
export const getInterfaceNamePrefix = (endpointName: string) =>
  endpointNamesMap[endpointName] || endpointName.replaceAll(' ', '');

export const getBodyInterfaceName = (endpointName: string) =>
  getInterfaceNamePrefix(endpointName) + 'Body';

export const getParamsInterfaceName = (endpointName: string) =>
  getInterfaceNamePrefix(endpointName) + 'Params';

export const getResponseInterfaceName = (endpointName: string) =>
  getInterfaceNamePrefix(endpointName) + 'Response';

export const getMethodName = (endpointName: string) =>
  lowerFirstLetter(getInterfaceNamePrefix(endpointName));

// only for query parameters
export const moreThanOneValues: Record<string, string[]> = {
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
  'get-games': ['id', 'name'],
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
