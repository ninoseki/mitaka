import { SearchableType, Searcher } from "./searcher";

export class WebAnalyzer implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  constructor() {
    this.endpoint = "https://wa-com.com";
    this.name = "WebAnalyzer";
  }

  public searchByDomain(query) {
    return `${this.endpoint}/${query}`;
  }
}
