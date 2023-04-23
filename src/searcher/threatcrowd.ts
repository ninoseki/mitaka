import type { SearchableType, Searcher } from "~/types";
import { buildURL } from "~/utils";

export class ThreatCrowd implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "email"];

  public constructor() {
    this.baseURL = "https://www.threatcrowd.org";
    this.name = "ThreatCrowd";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, "/ip.php", { ip: query });
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, "/domain.php", { domain: query });
  }

  public searchByEmail(query: string): string {
    return buildURL(this.baseURL, "/email.php", { email: query });
  }
}
