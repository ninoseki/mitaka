import { SearchableType, Searcher } from "./searcher";

export class ThreatMiner implements Searcher {

  public endpoint: string;
  public name;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  constructor() {
    this.endpoint = "https://www.threatminer.org";
    this.name = "ThreatMiner";
  }

  public searchByIP(query) {
    return `${this.endpoint}/host.php?q=${query}`;
  }

  public searchByDomain(query) {
    return `${this.endpoint}/domain.php?q=${query}`;
  }

  public searchByHash(query) {
    return `${this.endpoint}/sample.php?q=${query}`;
  }
}
