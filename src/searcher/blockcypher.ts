import { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/url_builder";

export class BlockCypher implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["btc"];

  public constructor() {
    this.baseURL = "https://live.blockcypher.com";
    this.name = "BlockCypher";
  }

  public searchByBTC(query: string): string {
    return buildURL(this.baseURL, `/btc/address/${query}/`);
  }
}
