import type { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/utils";

export class SecurityTrails implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    this.baseURL = "https://securitytrails.com";
    this.name = "SecurityTrails";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/list/ip/${query}`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/domain/${query}`);
  }
}
