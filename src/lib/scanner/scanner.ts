export type ScannableType = "ip" | "domain" | "url";

export interface Scanner {
  endpoint: string;
  name: string;
  supportedTypes: ScannableType[];
  scanByIP?(query: string);
  scanByDomain?(query: string);
  scanByURL?(query: string);
  setApiKey(apiKey: string | undefined);
}
