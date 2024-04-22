import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class DomainBigData extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "ip", "email"];

  public constructor() {
    super();
    this.baseURL = "https://domainbigdata.com";
    this.name = "DomainBigData";
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/${query}`));
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/${query}`));
  }

  public searchByEmail(query: string) {
    return ok(buildURL(this.baseURL, `/email/${query}`));
  }
}
