import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class Blockchair extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["btc", "eth"];

  public constructor() {
    super();
    this.baseURL = "https://blockchair.com";
    this.name = "Blockchair";
  }

  public searchByBTC(query: string) {
    return ok(buildURL(this.baseURL, `/bitcoin/address/${query}`));
  }

  public searchByETH(query: string) {
    return ok(buildURL(this.baseURL, `/ethereum/address/${query}`));
  }
}
