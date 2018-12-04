import { SearchableType, Searcher } from "./searcher";

export class WebAnalyzer implements Searcher {

  endpoint: string;
  name;
  supportedTypes: SearchableType[] = ["domain"];

  constructor() {
    this.endpoint = "https://wa-com.com";
    this.name = "WebAnalyzer";
  }

  searchByDomain(query) {
    return `${this.endpoint}/${query}`;
  }
}
