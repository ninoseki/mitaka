import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL, extractASNumber } from "~/utils";

import { Base } from "./base";

export class HurricaneElectric extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "asn"];

  public constructor() {
    super();
    this.baseURL = "https://bgp.he.net";
    this.name = "HurricaneElectric";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/ip/${query}`));
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/dns/${query}`));
  }

  public searchByASN(query: string) {
    const asn = extractASNumber(query);
    return ok(buildURL(this.baseURL, `/AS${asn}`));
  }
}
