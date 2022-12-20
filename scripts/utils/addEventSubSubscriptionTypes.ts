import type { OpenApi, ParameterObject, SchemaObject } from '../types';

const addEventSubSubscriptionTypes = (openApi: OpenApi, types: string[]) => {
  for (const schemaName of [
    'EventSubSubscription',
    'CreateEventSubSubscriptionBody',
  ]) {
    openApi.components.schemas[schemaName]!.properties!['type']!.enum = types;
  }
  const typeParam = (
    openApi.paths['/eventsub/subscriptions']!.get
      .parameters as ParameterObject[]
  ).find((p) => p.name === 'type');
  (typeParam!.schema as SchemaObject).enum = types;
};

export default addEventSubSubscriptionTypes;
