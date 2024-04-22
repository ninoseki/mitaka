import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class VxCube extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  public constructor() {
    super();
    this.baseURL = "http://vxcube.com";
    this.name = "VxCube";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/tools/ip/${query}/whois`));
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/tools/domain/${query}/whois`));
  }

  public searchByHash(query: string) {
    return ok(buildURL(this.baseURL, `/result/${query}`));
  }
}
