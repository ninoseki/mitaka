import { Result, ResultAsync } from "neverthrow";

import type { OptionsType, SearchableType } from "~/schemas";

export const SEARCHABLE_TYPES: SearchableType[] = [
  "asn",
  "btc",
  "cve",
  "domain",
  "email",
  "eth",
  "gaPubID",
  "gaTrackID",
  "hash",
  "ip",
  "url",
];

export const SCANNABLE_TYPES: ScannableType[] = ["domain", "ip", "url"];

export interface Searcher {
  baseURL: string;
  name: string;
  supportedTypes: SearchableType[];

  searchByASN(query: string): Result<string, string>;
  searchByBTC(query: string): Result<string, string>;
  searchByCVE(query: string): Result<string, string>;
  searchByDomain(query: string): Result<string, string>;
  searchByEmail(query: string): Result<string, string>;
  searchByETH(query: string): Result<string, string>;
  searchByGAPubID(quqery: string): Result<string, string>;
  searchByGATrackID(query: string): Result<string, string>;
  searchByHash(query: string): Result<string, string>;
  searchByIP(query: string, type?: string): Result<string, string>;
  searchByURL(query: string): Result<string, string>;
  searchByXMR(query: string): Result<string, string>;
}

export type ScannableType = "ip" | "domain" | "url";

export interface Scanner {
  baseURL: string;
  name: string;
  supportedTypes: ScannableType[];
  apiKey?: string;
  apiKeyRequired: boolean;
  setAPIKey(apiKey?: string): void;
  scanByIP(query: string): ResultAsync<string, string>;
  scanByDomain(query: string): ResultAsync<string, string>;
  scanByURL(query: string): ResultAsync<string, string>;
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
  text: string;
  options: OptionsType;
}

export interface SearcherMap {
  [name: string]: (searcher: Searcher, query: string) => Result<string, string>;
}

export interface ScannerMap {
  [name: string]: (
    scanner: Scanner,
    query: string,
  ) => ResultAsync<string, string>;
}

export const MD5_LENGTH = 32;
export const SHA1_LENGTH = 40;
export const SHA256_LENGTH = 64;