import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class Vulmon implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["cve"];

  public constructor() {
    this.baseURL = "https://vulmon.com";
    this.name = "Vulmon";
  }

  public searchByCVE(query: string): string {
    return buildURL(this.baseURL, "/vulnerabilitydetails", { qid: query });
  }
}
