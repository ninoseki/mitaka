import type { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/utils";

export class Triage implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash", "url"];

  public constructor() {
    this.baseURL = "https://tria.ge";
    this.name = "Triage";
  }

  public searchByHash(query: string): string {
    return buildURL(this.baseURL, "/s", { q: query });
  }

  public searchByURL(query: string): string {
    return buildURL(this.baseURL, "/s", { q: `url:${query}` });
  }
}
