import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class OTX extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = [
    "ip",
    "domain",
    "url",
    "hash",
    "cve",
  ];

  public constructor() {
    super();
    this.baseURL = "https://otx.alienvault.com";
    this.name = "OTX";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/indicator/ip/${query}`));
  }

  public searchByURL(query: string) {
    return ok(buildURL(this.baseURL, `/indicator/url/${query}`));
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/indicator/domain/${query}`));
  }

  public searchByHash(query: string) {
    return ok(buildURL(this.baseURL, `/indicator/file/${query}`));
  }

  public searchByCVE(query: string) {
    return ok(buildURL(this.baseURL, `/indicator/cve/${query}`));
  }
}
