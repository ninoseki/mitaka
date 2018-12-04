import { SearchableType, Searcher } from "./searcher";

export class BlockCypher implements Searcher {

  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["btc"];

  constructor() {
    this.endpoint = "https://live.blockcypher.com";
    this.name = "BlockCypher";
  }

  searchByBTC(query) {
    return `${this.endpoint}/btc/address/${query}/`;
  }
}
