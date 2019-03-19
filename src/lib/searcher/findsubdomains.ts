import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class FindSubDomains implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  constructor() {
    this.endpoint = "https://findsubdomains.com";
    this.name = "FindSubDomains";
  }

  public searchByDomain(query: string) {
    return buildURL(this.endpoint, `/subdomains-of/${query}`);
  }
}
