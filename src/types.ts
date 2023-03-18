export type SearchableType =
  | "asn"
  | "btc"
  | "cve"
  | "domain"
  | "email"
  | "eth"
  | "gaPubID"
  | "gaTrackID"
  | "hash"
  | "ip"
  | "url";

export interface Searcher {
  baseURL: string;
  name: string;
  supportedTypes: SearchableType[];

  searchByASN?(query: string): string;
  searchByBTC?(query: string): string;
  searchByCVE?(query: string): string;
  searchByDomain?(query: string): string;
  searchByEmail?(query: string): string;
  searchByETH?(query: string): string;
  searchByGAPubID?(quqery: string): string;
  searchByGATrackID?(query: string): string;
  searchByHash?(query: string): string;
  searchByIP?(query: string): string;
  searchByURL?(query: string): string;
  searchByXMR?(query: string): string;
}

export type ScannableType = "ip" | "domain" | "url";

export interface Scanner {
  baseURL: string;
  name: string;
  supportedTypes: ScannableType[];
  scanByIP?(query: string): Promise<string>;
  scanByDomain?(query: string): Promise<string>;
  scanByURL?(query: string): Promise<string> | string;
  setAPIKey(apiKey: string | undefined): void;
}

export interface SearchFuncWrapper {
  type: SearchableType;
  func: () => string | null;
}

export interface ScanFuncWrapper {
  type: ScannableType;
  func: () => string | null;
}

export interface SelectorSlot {
  analyzer: Scanner | Searcher;
  type: SearchableType | ScannableType;
  query: string;
}

export interface Message {
  link: string | null;
  text: string;
}

export interface SearcherMap {
  [name: string]: (searcher: Searcher, query: string) => string | undefined;
}

export interface ScannerMap {
  [name: string]: (
    scanner: Scanner,
    query: string
  ) => Promise<string | undefined>;
}

export type CommandAction = "scan" | "search";

export interface Command {
  action: CommandAction;
  query: string;
  type: SearchableType;
  name: string;
}

export const MD5_LENGTH = 32;
export const SHA1_LENGTH = 40;
export const SHA256_LENGTH = 64;

export interface SelectorOptions {
  enableIDN: boolean;
  strictTLD: boolean;
  enableRefang: boolean;
  enableDebugLog: boolean;
  disabledSearcherNames: string[];
}

export interface Options extends SelectorOptions {
  preferHrefValue: boolean;
  hybridAnalysisAPIKey?: string;
  urlscanAPIKey?: string;
  virusTotalAPIKey?: string;
}
