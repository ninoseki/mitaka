import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL, extractASNumber } from "~/utils";

import { Base } from "./base";

export class BGPView extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "asn"];

  public constructor() {
    super();
    this.baseURL = "https://bgpview.io";
    this.name = "BGPView";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/ip/${query}`));
  }

  public searchByASN(query: string) {
    const number: string = extractASNumber(query);
    return ok(buildURL(this.baseURL, `/asn/${number}`));
  }
}
