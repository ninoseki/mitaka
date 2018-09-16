import { Searcher } from "./searcher";

export class FortiGuard implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: string[] = ["ip", "url", "cve"];

  constructor() {
    this.endpoint = "https://fortiguard.com";
    this.name = "FortiGuard";
  }

  public searchByIP(query) {
    return `${this.endpoint}/search?q=${query}&engine=8`;
  }

  public searchByURL(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/webfilter?q=${encoded}`;

  }

  public searchByCVE(query) {
    return `${this.endpoint}/search?q=${query}&engine=3`;
  }
}
