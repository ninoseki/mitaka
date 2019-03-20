import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class Sploitus implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["cve"];

  public constructor() {
    this.endpoint = "https://sploitus.com";
    this.name = "Sploitus";
  }

  public searchByCVE(query: string): string {
    return buildURL(this.endpoint, "/", { query });
  }
}
