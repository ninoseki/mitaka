import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class Hashdd implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  public constructor() {
    this.endpoint = "https://hashdd.com";
    this.name = "Hashdd";
  }

  public searchByIP(query: string): string {
    return this.search(query);
  }

  public searchByDomain(query: string): string {
    return this.search(query);
  }

  public searchByHash(query: string): string {
    return this.search(query);
  }

  private search(query: string): string {
    return buildURL(this.endpoint, `/i/${query}`);
  }
}
