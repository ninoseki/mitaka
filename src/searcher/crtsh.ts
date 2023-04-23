import type { SearchableType, Searcher } from "~/types";
import { buildURL } from "~/utils";

export class Crtsh implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  public constructor() {
    this.baseURL = "https://crt.sh";
    this.name = "crt.sh";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, "/", { q: query });
  }
}
