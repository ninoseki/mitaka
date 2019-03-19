import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class DomainWatch implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "email"];

  constructor() {
    this.endpoint = "https://domainwat.ch";
    this.name = "DomainWatch";
  }

  public searchByDomain(query: string) {
    return buildURL(this.endpoint, `/whois/${query}`);
  }

  public searchByEmail(query: string) {
    return buildURL(this.endpoint, "/search", { query });
  }
}
