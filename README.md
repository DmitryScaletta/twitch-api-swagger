# twitch-api-swagger

Unofficial Swagger UI for Twitch API

- [Classic Swagger UI](https://twitch-api-swagger.surge.sh) ([mirror](https://dmitryscaletta.github.io/twitch-api-swagger/))
- [Scalar UI](https://twitch-api-swagger.surge.sh/scalar/) ([mirror](https://dmitryscaletta.github.io/twitch-api-swagger/scalar/))

All endpoints are generated automatically from the [twitch docs](https://dev.twitch.tv/docs/api/reference) page.

## Features

- Swagger UI for all Twitch API endpoints
- Schemas for _Request Query Parameters_, _Request Body_, _Response Body_
- Some additional schemas like _Clip_, _ChatBadge_, _Prediction_, _Game_, _Channel_, _Video_ etc.
- Response codes and examples
- Generated types for TypeScript: [ts-twitch-api](https://github.com/DmitryScaletta/ts-twitch-api)

See also: [twitch-gql-queries](https://github.com/DmitryScaletta/twitch-gql-queries)

## Code Generation

### TypeScript

Generate typescript interfaces:

```bash
npx openapi-typescript https://twitch-api-swagger.surge.sh/openapi.json -o src/twitch-api.generated.ts
```

Or see [ts-twitch-api](https://github.com/DmitryScaletta/ts-twitch-api) package with all typescript interfaces and simple `TwitchApi` class for all endpoints.
