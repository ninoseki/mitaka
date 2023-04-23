import type { SearchableType, Searcher } from "~/types";
import { buildURL } from "~/utils";

export class VulncodeDB implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["cve"];

  public constructor() {
    this.baseURL = "https://www.vulncode-db.com";
    this.name = "VulncodeDB";
  }

  public searchByCVE(query: string): string {
    return buildURL(this.baseURL, `/${query}`);
  }
}
