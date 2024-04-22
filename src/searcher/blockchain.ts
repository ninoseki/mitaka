import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class BlockChain extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["btc"];

  public constructor() {
    super();
    this.baseURL = "https://www.blockchain.com";
    this.name = "Blockchain.com";
  }

  public searchByBTC(query: string) {
    return ok(buildURL(this.baseURL, `/btc/address/${query}`));
  }
}
