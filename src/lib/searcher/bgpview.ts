import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class BGPView implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "asn"];

  public constructor() {
    this.endpoint = "https://bgpview.io";
    this.name = "BGPView";
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, `/ip/${query}`);
  }

  public searchByASN(query: string): string {
    const matches = query.match(/\d+$/);
    if (matches !== null && matches[0]) {
      return buildURL(this.endpoint, `/asn/${matches[0]}`);
    }
    return "";
  }
}
