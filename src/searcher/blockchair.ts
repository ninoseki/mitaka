import type { SearchableType } from "~/schemas";
import type { Searcher } from "~/types";
import { buildURL } from "~/utils";

export class Blockchair implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["btc", "eth"];

  public constructor() {
    this.baseURL = "https://blockchair.com";
    this.name = "Blockchair";
  }

  public searchByBTC(query: string): string {
    return buildURL(this.baseURL, `/bitcoin/address/${query}`);
  }

  public searchByETH(query: string): string {
    return buildURL(this.baseURL, `/ethereum/address/${query}`);
  }
}
