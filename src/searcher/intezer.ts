import type { SearchableType, Searcher } from "~/types";
import { buildURL } from "~/utils";

export class Intezer implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    this.baseURL = "https://analyze.intezer.com";
    this.name = "Intezer";
  }

  public searchByHash(query: string): string {
    return buildURL(this.baseURL, `/#/files/${query}`);
  }
}
