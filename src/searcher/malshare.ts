import type { SearchableType, Searcher } from "~/types";
import { buildURL } from "~/utils";

export class Malshare implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    this.baseURL = "https://www.malshare.com";
    this.name = "MalShare";
  }

  public searchByHash(query: string): string {
    return buildURL(this.baseURL, "/sample.php", {
      action: "detail",
      hash: query,
    });
  }
}
