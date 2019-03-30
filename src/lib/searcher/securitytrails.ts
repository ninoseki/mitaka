import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class SecurityTrails implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "email"];

  public constructor() {
    this.endpoint = "https://securitytrails.com";
    this.name = "SecurityTrails";
  }

  public searchByText(query: string): string {
    return buildURL(
      this.endpoint,
      `/list/keyword/${encodeURIComponent(query)}`
    );
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, `/list/ip/${query}`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, `/domain/${query}`);
  }

  public searchByEmail(query: string): string {
    return buildURL(this.endpoint, `/list/by-email/${query}`);
  }
}
