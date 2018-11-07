export type SearchableType = "text" | "ip" | "domain" | "url" | "email" | "hash" | "cve" | "btc" | "xmr" | "gaTrackID" | "gaPubID";

export interface Searcher {
  endpoint: string;
  name: string;
  supportedTypes: SearchableType[];
  searchByText?(query: string);
  searchByIP?(query: string);
  searchByDomain?(query: string);
  searchByURL?(query: string);
  searchByEmail?(query: string);
  searchByHash?(query: string);
  searchByCVE?(query: string);
  searchByBTC?(query: string);
  searchbyXMR?(query: string);
  searchByGATrackID?(query: string);
  searchByGAPubID?(quqery: string);
}
