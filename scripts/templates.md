# templates

## main

```ts
import type {
%IMPORTS%
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

%CONTENT%
}
```

## method-comment

```md
%DESCRIPTION%

## %AUTH_TYPE%

%AUTH%

## URL

`%METHOD% %URL%`

## Examples

%EXAMPLES%

## Response codes

%RESPONSE_CODES%

@see %DOCS_URL%
```

## method-signature-no-params-no-body

```ts
%METHOD_NAME%: async (
  accessToken = '',
  clientId = '',
): ApiResponse<%RESPONSE_TYPE%> => {
  const url = '%URL%';
  const response = await fetch(url, {
    method: '%METHOD%',
    headers: this.getAuthHeaders(accessToken, clientId),
  });
  return getApiResponse(response);
},
```

## method-signature-no-params-body

```ts
%METHOD_NAME%: async (
  body: %BODY_TYPE%,
  accessToken = '',
  clientId = '',
): ApiResponse<%RESPONSE_TYPE%> => {
  const url = '%URL%';
  const response = await fetch(url, {
    method: '%METHOD%',
    body: JSON.stringify(body),
    headers: {
      ...this.getAuthHeaders(accessToken, clientId),
      'Content-Type': 'application/json',
    },
  });
  return getApiResponse(response);
},
```

## method-signature-params-no-body

```ts
%METHOD_NAME%: async (
  params: %PARAMS_TYPE%,
  accessToken = '',
  clientId = '',
): ApiResponse<%RESPONSE_TYPE%> => {
  const s = getSearchParams(params, %POSSIBLE_ARRAYS%);
  const url = `%URL%?${s}`;
  const response = await fetch(url, {
    method: '%METHOD%',
    headers: this.getAuthHeaders(accessToken, clientId),
  });
  return getApiResponse(response);
},
```

## method-signature-params-body

```ts
%METHOD_NAME%: async (
  params: %PARAMS_TYPE%,
  body: %BODY_TYPE%,
  accessToken = '',
  clientId = '',
): ApiResponse<%RESPONSE_TYPE%> => {
  const s = getSearchParams(params, %POSSIBLE_ARRAYS%);
  const url = `%URL%?${s}`;
  const response = await fetch(url, {
    method: '%METHOD%',
    body: JSON.stringify(body),
    headers: {
      ...this.getAuthHeaders(accessToken, clientId),
      'Content-Type': 'application/json',
    },
  });
  return getApiResponse(response);
},
```
