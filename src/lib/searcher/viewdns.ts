import { Searcher } from "./searcher";

export class ViewDNS implements Searcher {

  public endpoint: string;
  public name;
  public supportedTypes: string[] = ["ip", "domain", "email"];

  constructor() {
    this.endpoint = "https://viewdns.info";
    this.name = "ViewDNS";
  }

  public searchByIP(query) {
    return `${this.endpoint}/reverseip/?t=1&host=${query}`;
  }

  public searchByDomain(query) {
    return `${this.endpoint}/iphistory/?domain=${query}`;
  }

  public searchByEmail(query) {
    return `${this.endpoint}/reversewhois/?q=${query}`;
  }
}
