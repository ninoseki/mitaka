import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class ViewDNS extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "email"];

  public constructor() {
    super();
    this.baseURL = "https://viewdns.info";
    this.name = "ViewDNS";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, "/reverseip/", { t: 1, host: query }));
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, "/iphistory/", { domain: query }));
  }

  public searchByEmail(query: string) {
    return ok(buildURL(this.baseURL, "/reversewhois/", { q: query }));
  }
}
