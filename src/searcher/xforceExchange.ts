import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class XForceExchange extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  public constructor() {
    super();
    this.baseURL = "https://exchange.xforce.ibmcloud.com";
    this.name = "X-Force-Exchange";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/ip/${query}`));
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/url/${query}`));
  }

  public searchByHash(query: string) {
    return ok(buildURL(this.baseURL, `/malware/${query}`));
  }
}
