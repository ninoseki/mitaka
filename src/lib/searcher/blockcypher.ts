import { Searcher } from "./searcher";

export class BlockCypher implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: string[] = ["btc"];

  constructor() {
    this.endpoint = "https://live.blockcypher.com";
    this.name = "BlockCypher";
  }

  public searchByBTC(query) {
    return `${this.endpoint}/btc/address/${query}/`;
  }
}
