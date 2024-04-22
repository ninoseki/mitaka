import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class URLhaus extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    super();
    this.baseURL = "https://urlhaus.abuse.ch";
    this.name = "URLhaus";
  }

  public searchByIP(query: string) {
    return this.searchByHost(query);
  }

  public searchByDomain(query: string) {
    return this.searchByHost(query);
  }

  private searchByHost(host: string) {
    return ok(buildURL(this.baseURL, `/host/${host}/`));
  }
}
