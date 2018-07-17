export interface Searcher {
  endpoint: string;
  name: string;
  supportedTypes: string[];
  searchByText?(query: string);
  searchByIP?(query: string);
  searchByDomain?(query: string);
  searchByURL?(query: string);
  searchByHash?(query: string);
}
