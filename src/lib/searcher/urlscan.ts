import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class Urlscan implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "url"];

  public constructor() {
    this.endpoint = "https://urlscan.io";
    this.name = "Urlscan";
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, `/ip/${query}`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, `/domain/${query}`);
  }

  public searchByURL(query: string): string {
    return this.search(encodeURIComponent(`"${query}"`));
  }

  private search(query: string): string {
    return buildURL(this.endpoint, `/search/#${query}`);
  }
}
