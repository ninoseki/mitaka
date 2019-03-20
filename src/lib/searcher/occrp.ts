import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class OCCRP implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["email"];

  public constructor() {
    this.endpoint = "https://data.occrp.org";
    this.name = "OCCPR";
  }

  public searchByEmail(query: string): string {
    return buildURL(this.endpoint, "/search", {
      facet: "email",
      "filter:emails": query,
    });
  }
}
