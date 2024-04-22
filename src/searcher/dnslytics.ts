import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class DNSlytics extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    super();
    this.baseURL = "https://dnslytics.com";
    this.name = "DNSlytics";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/ip/${query}`));
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/domain/${query}`));
  }
}
