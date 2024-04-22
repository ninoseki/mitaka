import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class ONYPHE extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip"];

  public constructor() {
    super();
    this.baseURL = "https://www.onyphe.io";
    this.name = "ONYPHE";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/summary/ip/${query}`));
  }
}
