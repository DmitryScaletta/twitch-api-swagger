# twitch-api-swagger

https://twitch-api-swagger.surge.sh

Unofficial Swagger UI (OpenAPI 3) for Twitch API.

All endpoints are generated automatically from the [twitch docs](https://dev.twitch.tv/docs/api/reference) page.

__Features:__

* Swagger UI for all Twitch API endpoints
* Schemas for _Request Query Parameters_, _Request Body_, _Response Body_
* Some additional schemas like _Clip_, _ChatBadge_, _Prediction_, _Game_, _Channel_, _Video_ etc.
* Response codes and examples
* Generated types for TypeScript: [twitch-api-ts](https://github.com/DmitryScaletta/twitch-api-ts)

## Code Generation

### TypeScript

Generate typescript interfaces:

```bash
npx openapi-typescript https://twitch-api-swagger.surge.sh/openapi.json -o src/twitch-api.generated.ts
```

Or see [twitch-api-ts](https://github.com/DmitryScaletta/twitch-api-ts) package with all typescript interfaces and simple `TwitchApi` class for all endpoints.
