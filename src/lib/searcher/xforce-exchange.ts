import { Searcher } from "./searcher";

export class XForceExchange implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: string[] = ["ip", "domain", "hash"];

  constructor() {
    this.endpoint = "https://exchange.xforce.ibmcloud.com";
    this.name = "X-Force-Exchange";
  }

  public searchByIP(query) {
    return `${this.endpoint}/ip/${query}`;
  }

  public searchByDomain(query) {
    return `${this.endpoint}/url/${query}`;
  }

  public searchByHash(query) {
    return `${this.endpoint}/malware/${query}`;
  }
}
