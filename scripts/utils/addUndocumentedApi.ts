import type { OpenApi, PathItemObject, SchemaObject } from '../types';
import responseCodes from './badges.json' assert { type: 'json' };

const addUndocumentedApi = (openApi: OpenApi) => {
  for (const [path, pathItem] of Object.entries(responseCodes.paths)) {
    openApi.paths[path] = pathItem as unknown as PathItemObject;
  }

  for (const [schemaName, schema] of Object.entries(
    responseCodes.components.schemas,
  )) {
    openApi.components.schemas[schemaName] = schema as unknown as SchemaObject;
  }
};

export default addUndocumentedApi;
