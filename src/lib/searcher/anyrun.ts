import { Searcher, SearchableType } from "../types";

export class AnyRun implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    this.baseURL = "https://app.any.run";
    this.name = "AnyRun";
  }

  public searchByHash(query: string): string {
    return this.baseURL + `/submissions/#filehash:${query}`;
  }
}
