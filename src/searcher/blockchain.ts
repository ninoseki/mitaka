import { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/urlBuilder";

export class BlockChain implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["btc"];

  public constructor() {
    this.baseURL = "https://www.blockchain.com";
    this.name = "Blockchain.com";
  }

  public searchByBTC(query: string): string {
    return buildURL(this.baseURL, `/btc/address/${query}`);
  }
}
