import { Searcher } from "./searcher";

export class ThreatCrowd implements Searcher {

  public endpoint: string;
  public name;
  public supportedTypes: string[] = ["ip", "domain"];

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
}
