import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class OCCRP implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["email"];

  public constructor() {
    this.baseURL = "https://data.occrp.org";
    this.name = "OCCPR";
  }

  public searchByEmail(query: string): string {
    return buildURL(this.baseURL, "/search", {
      facet: "email",
      "filter:emails": query,
    });
  }
}
