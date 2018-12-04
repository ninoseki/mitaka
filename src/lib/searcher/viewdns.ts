import { SearchableType, Searcher } from "./searcher";

export class ViewDNS implements Searcher {

  endpoint: string;
  name;
  supportedTypes: SearchableType[] = ["ip", "domain", "email"];

  constructor() {
    this.endpoint = "https://viewdns.info";
    this.name = "ViewDNS";
  }

  searchByIP(query) {
    return `${this.endpoint}/reverseip/?t=1&host=${query}`;
  }

  searchByDomain(query) {
    return `${this.endpoint}/iphistory/?domain=${query}`;
  }

  searchByEmail(query) {
    return `${this.endpoint}/reversewhois/?q=${query}`;
  }
}
