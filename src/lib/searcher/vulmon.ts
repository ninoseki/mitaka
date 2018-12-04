import { SearchableType, Searcher } from "./searcher";

export class Vulmon implements Searcher {

  endpoint: string;
  name;
  supportedTypes: SearchableType[] = ["cve"];

  constructor() {
    this.endpoint = "https://vulmon.com";
    this.name = "Vulmon";
  }

  searchByCVE(query) {
    return `${this.endpoint}/vulnerabilitydetails?qid=${query}`;
  }
}
