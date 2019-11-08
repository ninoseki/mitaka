import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class GodaddyWhois implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  public constructor() {
    this.endpoint = "https://www.godaddy.com";
    this.name = "GoDaddy WHOIS";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, "/whois/results.aspx", { domain: `${query}` });
  }
}
