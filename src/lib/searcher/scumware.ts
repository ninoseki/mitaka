import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class Scumware implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "ip", "hash"];

  public constructor() {
    this.endpoint = "https://www.scumware.org";
    this.name = "Scumware";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, `/report/${query}`);
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, `/report/${query}`);
  }

  public searchByHash(query: string): string {
    if (query.length !== 32) {
      throw new Error("Scumware supports only MD5 hashes");
    }

    return buildURL(this.endpoint, `/report/${query}`);
  }
}
