import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class Crtsh implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  public constructor() {
    this.endpoint = "https://crt.sh";
    this.name = "crt.sh";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, "/", { q: query });
  }
}
