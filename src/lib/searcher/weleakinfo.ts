import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class WeLeakInfo implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["email"];

  public constructor() {
    this.endpoint = "https://weleakinfo.com";
    this.name = "WeLeakInfo";
  }

  public searchByEmail(query: string): string {
    return buildURL(this.endpoint, "/search", { type: "email", query: query });
  }
}
