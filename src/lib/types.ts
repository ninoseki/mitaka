export type SearchableType =
  | "text"
  | "ip"
  | "domain"
  | "url"
  | "asn"
  | "email"
  | "hash"
  | "cve"
  | "btc"
  | "xmr"
  | "gaTrackID"
  | "gaPubID";

export interface Searcher {
  endpoint: string;
  name: string;
  supportedTypes: SearchableType[];
  searchByASN?(query: string): string;
  searchByBTC?(query: string): string;
  searchByCVE?(query: string): string;
  searchByDomain?(query: string): string;
  searchByEmail?(query: string): string;
  searchByGAPubID?(quqery: string): string;
  searchByGATrackID?(query: string): string;
  searchByHash?(query: string): string;
  searchByIP?(query: string): string;
  searchByText?(query: string): string;
  searchByURL?(query: string): string;
  searchByXMR?(query: string): string;
}

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

export interface SelectorSlot {
  type: SearchableType;
  func: () => string | null;
}

export interface ScannerSlot {
  type: ScannableType;
  func: () => string | null;
}

export interface AnalyzerEntry {
  analyzer: Scanner | Searcher;
  type: SearchableType | ScannableType;
  query: string;
}

export interface SearcherState {
  name: string;
  supportedTypes: string[];
  isEnabled: boolean;
}

export interface ApiKeys {
  urlscanApiKey: string | undefined;
  virusTotalApiKey: string | undefined;
}
