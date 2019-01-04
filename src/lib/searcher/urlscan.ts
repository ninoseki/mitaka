import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class Urlscan implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "url"];

  constructor() {
    this.endpoint = "https://urlscan.io";
    this.name = "Urlscan";
  }

  public searchByIP(query: string) {
    return this.search(encodeURIComponent(query));
  }

  public searchByDomain(query: string) {
    return this.search(encodeURIComponent(query));
  }

  public searchByURL(query: string) {
    return this.search(encodeURIComponent(`"${query}"`));
  }

  private search(query: string) {
    return buildURL(this.endpoint, `/search/#${query}`);
  }
}
