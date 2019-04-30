import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class DomainTools implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    this.endpoint = "https://whois.domaintools.com";
    this.name = "DomainTools";
  }

  public searchByIP(query: string): string {
    return this.search(query);
  }

  public searchByDomain(query: string): string {
    return this.search(query);
  }

  private search(query: string): string {
    return buildURL(this.endpoint, `/${query}`);
  }
}
