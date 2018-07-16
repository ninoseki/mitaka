export interface Scanner {
  endpoint: string;
  name: string;
  supportedTypes: string[];
  scanByIP?(query: string);
  scanByDomain?(query: string);
  scanByURL?(query: string);
  setApiKey(apiKey: string | undefined);
}
