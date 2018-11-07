export { ScannableType, Scanner } from "./scanner";
export { Urlscan } from "./urlscan";
export { VirusTotal } from "./virustotal";

export { Scanners } from "./scanners";

export interface ApiKeys {
  urlscanApiKey: string | undefined;
  virusTotalApiKey: string | undefined;
}
