import type { SearchableType, Searcher } from "~/types";
import { buildURL } from "~/utils";

export class WebCheck implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  public constructor() {
    this.baseURL = "https://web-check.xyz";
    this.name = "WebCheck";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/results/${query}`);
  }
}
