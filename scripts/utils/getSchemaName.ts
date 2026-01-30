const capitalizeWord = (word: string) => word[0]!.toUpperCase() + word.slice(1);

export const getSchemaNamePrefix = (endpointName: string) =>
  endpointName.split(' ').filter(Boolean).map(capitalizeWord).join('');

export const getBodySchemaName = (endpointName: string) =>
  getSchemaNamePrefix(endpointName) + 'Body';

export const getParamsSchemaName = (endpointName: string) =>
  getSchemaNamePrefix(endpointName) + 'Params';

export const getResponseSchemaName = (endpointName: string) =>
  getSchemaNamePrefix(endpointName) + 'Response';
