import { SearchableType, Searcher } from "./searcher";

export class OTX implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  constructor() {
    this.endpoint = "https://otx.alienvault.com";
    this.name = "OTX";
  }

  public searchByIP(query) {
    return `${this.endpoint}/indicator/ip/${query}`;
  }
  public searchByDomain(query) {
    return `${this.endpoint}/indicator/domain/${query}`;
  }

  public searchByHash(query) {
    return `${this.endpoint}/indicator/file/${query}`;
  }
}
