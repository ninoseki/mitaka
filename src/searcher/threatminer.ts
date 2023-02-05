import type { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/utils";

export class ThreatMiner implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  public constructor() {
    this.baseURL = "https://www.threatminer.org";
    this.name = "ThreatMiner";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, "/host.php", { q: query });
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, "/domain.php", { q: query });
  }

  public searchByHash(query: string): string {
    return buildURL(this.baseURL, "/sample.php", { q: query });
  }
}
