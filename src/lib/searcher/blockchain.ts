import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class BlockChain implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["btc"];

  public constructor() {
    this.endpoint = "https://www.blockchain.com";
    this.name = "Blockchain.com";
  }

  public searchByBTC(query: string): string {
    return buildURL(this.endpoint, `/btc/address/${query}`);
  }
}
