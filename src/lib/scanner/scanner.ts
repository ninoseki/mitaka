export type ScannableType = "ip" | "domain" | "url";

export interface Scanner {
  endpoint: string;
  name: string;
  supportedTypes: ScannableType[];
  scanByIP?(query: string): Promise<string>;
  scanByDomain?(query: string): Promise<string>;
  scanByURL?(query: string): Promise<string>;
  setApiKey(apiKey: string | undefined): void;
}
