import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class Scumware implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "ip", "hash"];

  public constructor() {
    this.endpoint = "https://www.scumware.org";
    this.name = "scumware.org";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, `/report/${query}`);
  }
}
