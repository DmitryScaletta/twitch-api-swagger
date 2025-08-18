export type Descriptions = {
  main: string[];
  authentication: string[];
  authorization: string[];
  queryParameters: string[];
  requestBody: string[];
  responseBody: string[];
};

export type ApiReference = {
  id: string;
  tag: string;
  summary: string;
};

// TODO: use https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/json-schema
// Open API types

export type ExternalDocumentationObject = {
  description?: string;
  url: string;
};

export type FieldSchema = {
  name: string;
  type: string;
  required: boolean | null;
  description: string;
  depth: number;
  enumValues: (string | number)[] | null;
  enumDefault: string | number | null;
  children: FieldSchema[];
};

export type ParameterObject = {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;

  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: SchemaObject | ReferenceObject;
  example?: any;
  examples?: Record<string, ExampleObject | ReferenceObject>;

  // content?: any;

  // matrix?: any;
  // label?: any;
  // form?: 'primitive' | 'array' | 'object';
  // simple?: any;
  // spaceDelimited?: any;
  // pipeDelimited?: any;
  // deepObject?: any;
};

export type ExampleObject = {
  summary?: string;
  description?: string;
  value?: any;
  externalValue?: string;
};

export type MediaTypeObject = {
  schema?: SchemaObject | ReferenceObject;
  example?: any;
  examples?: Record<string, ExampleObject | ReferenceObject>;
  // encoding?: Record<string, EncodingObject>;
};

export type RequestBodyObject = {
  description?: string;
  content: Record<string, MediaTypeObject>;
  required?: boolean;
};

export type ResponseObject = {
  description?: string;
  // headers?: Record<string, HeaderObject | ReferenceObject>;
  content?: Record<string, MediaTypeObject>;
  // links?: Record<string, LinkObject | ReferenceObject>;
};

export type ResponsesObject = Record<string, ResponseObject | ReferenceObject>;

export type ReferenceObject = {
  $ref: `#/components/schemas/${string}`;
};

export type ServerObject = {
  url: string;
  description?: string;
  // variables?: Record<string, ServerVariableObject>;
};

export type SecurityRequirementObject = Record<string, string[]>;

export type OperationObject = {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
  operationId?: string;
  parameters?: (ParameterObject | ReferenceObject)[];
  requestBody?: RequestBodyObject | ReferenceObject;
  responses?: ResponsesObject;
  // callbacks?: Record<string, CallbackObject | ReferenceObject>;
  deprecated?: boolean;
  security?: SecurityRequirementObject[];
  servers?: ServerObject[];
};

export type Method =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch'
  | 'trace';

export type PathItemObject = Record<Method, OperationObject>;

// https://swagger.io/specification/#schema-object
export type SchemaObject = {
  $ref?: `#/components/schemas/${string}`;

  title?: string;
  // multipleOf?: any;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: number;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: number;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  enum?: any[];

  type?: string;
  allOf?: SchemaObject[];
  oneOf?: SchemaObject[];
  anyOf?: SchemaObject[];
  not?: SchemaObject[];
  items?: SchemaObject;
  properties?: Record<string, SchemaObject>;
  additionalProperties?: SchemaObject;
  description?: string;
  format?: string;
  default?: any;

  nullable?: boolean;
  // discriminator?: DiscriminatorObject;
  readOnly?: boolean;
  writeOnly?: boolean;
  // xml?: XMLObject;
  // externalDocs?: ExternalDocumentationObject;
  example?: any;
  deprecated?: boolean;
};

export type OpenApi = {
  openapi: string;
  info: {
    title: string;
    description: string;
    version: string;
  };
  servers: ServerObject[];
  security: [];
  tags: { name: string; description?: string }[];
  paths: Record<string, PathItemObject>;
  components: {
    schemas: Record<string, SchemaObject>;
    securitySchemes: Record<string, any>;
  };
};
