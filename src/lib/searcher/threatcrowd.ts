import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class ThreatCrowd implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "email"];

  public constructor() {
    this.endpoint = "https://www.threatcrowd.org";
    this.name = "ThreatCrowd";
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, "/ip.php", { ip: query });
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, "/domain.php", { domain: query });
  }

  public searchByEmail(query: string): string {
    return buildURL(this.endpoint, "/email.php", { email: query });
  }
}
