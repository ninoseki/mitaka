import { SearchableType, Searcher } from "./searcher";

export class BGPView implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "asn"];

  constructor() {
    this.endpoint = "https://bgpview.io";
    this.name = "BGPView";
  }

  public searchByIP(query) {
    return `${this.endpoint}/ip/${query}`;
  }

  public searchByASN(query) {
    const matches = query.match(/\d+$/);
    if (matches !== null && matches[0]) {
      return `${this.endpoint}/asn/${matches[0]}`;
    }
  }
}
