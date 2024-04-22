import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class BitcoinAbuse extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["btc"];

  public constructor() {
    super();
    this.baseURL = "https://www.bitcoinabuse.com";
    this.name = "BitcoinAbuse";
  }

  public searchByBTC(query: string) {
    return ok(buildURL(this.baseURL, `/reports/${query}`));
  }
}
