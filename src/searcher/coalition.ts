import type { SearchableType, Searcher } from "~/types";
import { buildURL } from "~/utils";

export class Coalition implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["cve"];

  public constructor() {
    this.baseURL = "https://ess.coalitioninc.com";
    this.name = "Coalition";
  }

  public searchByCVE(query: string): string {
    return buildURL(this.baseURL, "/cve/", { id: query });
  }
}
