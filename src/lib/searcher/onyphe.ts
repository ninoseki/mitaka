import { SearchableType, Searcher } from "./searcher";

export class ONYPHE implements Searcher {

  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["ip"];

  constructor() {
    this.endpoint = "https://www.onyphe.io";
    this.name = "ONYPHE";
  }

  searchByIP(query) {
    return `${this.endpoint}/ip/${query}`;
  }
}
