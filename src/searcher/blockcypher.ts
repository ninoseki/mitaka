import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class BlockCypher extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["btc"];

  public constructor() {
    super();
    this.baseURL = "https://live.blockcypher.com";
    this.name = "BlockCypher";
  }

  public searchByBTC(query: string) {
    return ok(buildURL(this.baseURL, `/btc/address/${query}/`));
  }
}
