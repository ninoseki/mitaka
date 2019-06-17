import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";
import { extractASNumber } from "../utility";

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
    const number: string = extractASNumber(query);
    return buildURL(this.endpoint, `/asn/${number}`);
  }
}
