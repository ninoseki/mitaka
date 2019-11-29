import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class WeLeakInfo implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["email"];

  public constructor() {
    this.baseURL = "https://weleakinfo.com";
    this.name = "WeLeakInfo";
  }

  public searchByEmail(query: string): string {
    return buildURL(this.baseURL, "/search", { type: "email", query: query });
  }
}
