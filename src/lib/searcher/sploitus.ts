import { SearchableType, Searcher } from "./searcher";

export class Sploitus implements Searcher {

  public endpoint: string;
  public name;
  public supportedTypes: SearchableType[] = ["cve"];

  constructor() {
    this.endpoint = "https://sploitus.com";
    this.name = "Sploitus";
  }

  public searchByCVE(query) {
    return `${this.endpoint}/?query=${query}`;
  }
}
