import type { OpenApi, ParameterObject, SchemaObject } from '../types';
import parseEventSubSubscriptionTypes from './parseEventSubSubscriptionTypes.js';

const addEventSubSubscriptionTypes = (
  openApi: OpenApi,
  eventSubSubscriptionTypesHtml: string,
) => {
  const types = parseEventSubSubscriptionTypes(eventSubSubscriptionTypesHtml);

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
