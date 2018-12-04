import { SearchableType, Searcher } from "./searcher";

export class BGPView implements Searcher {

  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["ip", "asn"];

  constructor() {
    this.endpoint = "https://bgpview.io";
    this.name = "BGPView";
  }

  searchByIP(query) {
    return `${this.endpoint}/ip/${query}`;
  }

  searchByASN(query) {
    const matches = query.match(/\d+$/);
    if (matches !== null && matches[0]) {
      return `${this.endpoint}/asn/${matches[0]}`;
    }
  }
}
