import { SearchableType, Searcher } from "./searcher";

export class Shodan implements Searcher {

  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["text"];

  constructor() {
    this.endpoint = `https://www.shodan.io`;
    this.name = "Shodan";
  }

  searchByText(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/search?query=${encoded}`;
  }
}
