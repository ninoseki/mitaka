import { SearchableType, Searcher } from "./searcher";

export class ThreatCrowd implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "email"];

  constructor() {
    this.endpoint = "https://www.threatcrowd.org";
    this.name = "ThreatCrowd";
  }

  public searchByIP(query) {
    return `${this.endpoint}/ip.php?ip=${query}`;
  }

  public searchByDomain(query) {
    return `${this.endpoint}/domain.php?domain=${query}`;
  }

  public searchByEmail(query) {
    return `${this.endpoint}/email.php?email=${query}`;
  }
}
