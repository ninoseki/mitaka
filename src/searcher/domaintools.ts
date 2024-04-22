import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class DomainTools extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    super();

    this.baseURL = "https://whois.domaintools.com";
    this.name = "DomainTools";
  }

  public searchByIP(query: string) {
    return this.search(query);
  }

  public searchByDomain(query: string) {
    return this.search(query);
  }

  private search(query: string) {
    return ok(buildURL(this.baseURL, `/${query}`));
  }
}
