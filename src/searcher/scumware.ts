import type { SearchableType, Searcher } from "~/types";
import { buildURL } from "~/utils";

export class Scumware implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "ip", "hash"];

  public constructor() {
    this.baseURL = "https://www.scumware.org";
    this.name = "Scumware";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/report/${query}`);
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/report/${query}`);
  }

  public searchByHash(query: string): string {
    if (query.length !== 32) {
      throw new Error("Scumware supports only MD5 hashes");
    }

    return buildURL(this.baseURL, `/report/${query}`);
  }
}
