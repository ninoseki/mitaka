import type { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/utils";

export class BitcoinWhosWho implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["btc"];

  public constructor() {
    this.baseURL = "https://bitcoinwhoswho.com";
    this.name = "BitcoinWhosWho";
  }

  public searchByBTC(query: string): string {
    return buildURL(this.baseURL, `/address/${query}`);
  }
}
