import { SearchableType, Searcher } from "./searcher";

export class FortiGuard implements Searcher {

  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["ip", "url", "cve"];

  constructor() {
    this.endpoint = "https://fortiguard.com";
    this.name = "FortiGuard";
  }

  searchByIP(query) {
    return `${this.endpoint}/search?q=${query}&engine=8`;
  }

  searchByURL(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/webfilter?q=${encoded}`;

  }

  searchByCVE(query) {
    return `${this.endpoint}/search?q=${query}&engine=3`;
  }
}
