import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class BitcoinAbuse implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["btc"];

  public constructor() {
    this.endpoint = "https://www.bitcoinabuse.com";
    this.name = "BitcoinAbuse";
  }

  public searchByBTC(query: string): string {
    return buildURL(this.endpoint, `/reports/${query}`);
  }
}
