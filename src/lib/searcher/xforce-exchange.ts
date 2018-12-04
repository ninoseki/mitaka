import { SearchableType, Searcher } from "./searcher";

export class XForceExchange implements Searcher {

  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  constructor() {
    this.endpoint = "https://exchange.xforce.ibmcloud.com";
    this.name = "X-Force-Exchange";
  }

  searchByIP(query) {
    return `${this.endpoint}/ip/${query}`;
  }

  searchByDomain(query) {
    return `${this.endpoint}/url/${query}`;
  }

  searchByHash(query) {
    return `${this.endpoint}/malware/${query}`;
  }
}
