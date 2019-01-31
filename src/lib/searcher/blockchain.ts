import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class BlockChain implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["btc"];

  constructor() {
    this.endpoint = "https://www.blockchain.com";
    this.name = "Blockchain.com";
  }

  public searchByBTC(query: string) {
    return buildURL(this.endpoint, `/btc/address/${query}`);
  }
}
