import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class BitcoinWhosWho implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["btc"];

  public constructor() {
    this.endpoint = "https://bitcoinwhoswho.com";
    this.name = "BitcoinWhosWho";
  }

  public searchByBTC(query: string): string {
    return buildURL(this.endpoint, `/address/${query}`);
  }
}
