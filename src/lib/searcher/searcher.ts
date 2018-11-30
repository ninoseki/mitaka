export type SearchableType = "text" | "ip" | "domain" | "url" | "asn" | "email" | "hash" | "cve" | "btc" | "xmr" | "gaTrackID" | "gaPubID";

export interface Searcher {
  endpoint: string;
  name: string;
  supportedTypes: SearchableType[];
  searchByASN(query: string);
  searchByBTC?(query: string);
  searchByCVE?(query: string);
  searchByDomain?(query: string);
  searchByEmail?(query: string);
  searchByGAPubID?(quqery: string);
  searchByGATrackID?(query: string);
  searchByHash?(query: string);
  searchByIP?(query: string);
  searchByText?(query: string);
  searchByURL?(query: string);
  searchbyXMR?(query: string);
}
