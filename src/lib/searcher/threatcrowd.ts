import { SearchableType, Searcher } from "./searcher";

export class ThreatCrowd implements Searcher {

  endpoint: string;
  name;
  supportedTypes: SearchableType[] = ["ip", "domain", "email"];

  constructor() {
    this.endpoint = "https://www.threatcrowd.org";
    this.name = "ThreatCrowd";
  }

  searchByIP(query) {
    return `${this.endpoint}/ip.php?ip=${query}`;
  }

  searchByDomain(query) {
    return `${this.endpoint}/domain.php?domain=${query}`;
  }

  searchByEmail(query) {
    return `${this.endpoint}/email.php?email=${query}`;
  }
}
