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
