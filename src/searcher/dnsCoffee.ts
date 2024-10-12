import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class DNSCoffee extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  public constructor() {
    super();
    this.baseURL = "https://dns.coffee";
    this.name = "DNS Coffee";
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/domains/${query}`));
  }
}
