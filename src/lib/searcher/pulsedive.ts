import { base64fy } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class Pulsedive implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "url", "hash"];

  public constructor() {
    this.endpoint = "https://pulsedive.com";
    this.name = "Pulsedive";
  }

  public searchByIP(query: string) {
    return this.search(query);
  }
  public searchByDomain(query: string) {
    return this.search(query);
  }
  public searchByURL(query: string) {
    return this.search(query);
  }
  public searchByHash(query: string) {
    return this.search(query);
  }

  private search(query: string) {
    return `${this.endpoint}/indicator/?ioc=${base64fy(query)}`;
  }
}
