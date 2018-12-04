import { SearchableType, Searcher } from "./searcher";

export class Sploitus implements Searcher {

  endpoint: string;
  name;
  supportedTypes: SearchableType[] = ["cve"];

  constructor() {
    this.endpoint = "https://sploitus.com";
    this.name = "Sploitus";
  }

  searchByCVE(query) {
    return `${this.endpoint}/?query=${query}`;
  }
}
