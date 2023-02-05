import type { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/utils";

export class BitcoinAbuse implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["btc"];

  public constructor() {
    this.baseURL = "https://www.bitcoinabuse.com";
    this.name = "BitcoinAbuse";
  }

  public searchByBTC(query: string): string {
    return buildURL(this.baseURL, `/reports/${query}`);
  }
}
