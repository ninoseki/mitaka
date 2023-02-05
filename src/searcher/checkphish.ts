import type { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/utils";

export class Checkphish implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    this.baseURL = "https://checkphish.ai";
    this.name = "Checkphish";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/ip/${query}`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/domain/${query}`);
  }
}
