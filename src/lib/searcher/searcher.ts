export interface Searcher {
  endpoint: string;
  name: string;
  supportedTypes: string[];
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
