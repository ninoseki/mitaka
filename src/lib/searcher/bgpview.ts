import { SearchableType, Searcher } from "./searcher";

export class BGPView implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip"];

  constructor() {
    this.endpoint = "https://bgpview.io";
    this.name = "BGPView";
  }

  public searchByIP(query) {
    return `${this.endpoint}/ip/${query}`;
  }
}
