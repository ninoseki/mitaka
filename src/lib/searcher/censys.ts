import { SearchableType, Searcher } from "./searcher";

export class Censys implements Searcher {

  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["text"];

  constructor() {
    this.endpoint = "https://censys.io";
    this.name = "Censys";
  }

  searchByText(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/ipv4?q=${encoded}`;
  }
}
