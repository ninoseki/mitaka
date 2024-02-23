import type { SearchableType } from "~/schemas";
import type { Searcher } from "~/types";
import { buildURL } from "~/utils";

export class FileScan implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    this.baseURL = "https://www.filescan.io";
    this.name = "FileScan.IO";
  }

  public searchByHash(query: string): string {
    return this.search(query);
  }

  private search(query: string): string {
    return buildURL(this.baseURL, "/search-result", { query });
  }
}
