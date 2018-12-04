import { SearchableType, Searcher } from "./searcher";

export class OTX implements Searcher {

  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  constructor() {
    this.endpoint = "https://otx.alienvault.com";
    this.name = "OTX";
  }

  searchByIP(query) {
    return `${this.endpoint}/indicator/ip/${query}`;
  }
  searchByDomain(query) {
    return `${this.endpoint}/indicator/domain/${query}`;
  }

  searchByHash(query) {
    return `${this.endpoint}/indicator/file/${query}`;
  }
}
