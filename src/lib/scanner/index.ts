export { Scanner } from "./scanner";
export { UrlscanScanner } from "./urlscan";
export { VirusTotalScanner } from "./virustotal";

export interface ApiKeys {
  urlscanApiKey: string | undefined;
  virusTotalApiKey: string | undefined;
}
