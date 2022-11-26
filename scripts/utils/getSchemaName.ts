const endpointNamesMap: Record<string, string> = {
  'Start a raid': 'StartRaid',
  'Cancel a raid': 'CancelRaid',
};
export const getSchemaNamePrefix = (endpointName: string) =>
  endpointNamesMap[endpointName] || endpointName.replaceAll(' ', '');

export const getBodySchemaName = (endpointName: string) =>
  getSchemaNamePrefix(endpointName) + 'Body';

export const getParamsSchemaName = (endpointName: string) =>
  getSchemaNamePrefix(endpointName) + 'Params';

export const getResponseSchemaName = (endpointName: string) =>
  getSchemaNamePrefix(endpointName) + 'Response';
