import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class ONYPHE implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip"];

  public constructor() {
    this.baseURL = "https://www.onyphe.io";
    this.name = "ONYPHE";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/ip/${query}`);
  }
}
