export type Parameter = {
  name: string;
  type: string;
  possibleValues: string[];
  required: boolean | null;
  depth: number;
  description: string;
  children: Parameter[];
};

export type Interface = {
  description: string[];
  parameters: Parameter[];
};

export type ApiEndpoint = {
  id: string;
  name: string;
  resource: string;
  description: string;
  descriptionFull: string[];
  url: string;
  method: string;
  authentication: string[];
  authorization: string[];
  requestBody: Interface;
  requestQueryParams: Interface;
  responseBody: Interface;
  responseCodes: [code: string, description: string][];
  examples: string;
};

export type Templates = Record<string, string>;
