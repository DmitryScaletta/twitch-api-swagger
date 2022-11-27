import type { Descriptions } from '../types';

const fmt = (title: string) => `__${title}:__`;

const getDescriptionText = (descriptions: Descriptions): string => {
  let result = [...descriptions.main];

  if (descriptions.authentication.length > 0) {
    result.push(fmt('Authentication'));
    result.push(...descriptions.authentication);
  }

  if (descriptions.authorization.length > 0) {
    result.push(fmt('Authorization'));
    result.push(...descriptions.authorization);
  }

  if (descriptions.queryParameters.length > 0) {
    result.push(fmt('Request Query Parameters'));
    result.push(...descriptions.queryParameters);
  }

  if (descriptions.requestBody.length > 0) {
    result.push(fmt('Request Body'));
    result.push(...descriptions.requestBody);
  }

  if (descriptions.responseBody.length > 0) {
    result.push(fmt('Response Body'));
    result.push(...descriptions.responseBody);
  }

  return result.join('\n\n');
};

export default getDescriptionText;
