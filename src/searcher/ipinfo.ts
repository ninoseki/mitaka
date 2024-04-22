import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class IPinfo extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "asn"];

  public constructor() {
    super();
    this.baseURL = "https://ipinfo.io";
    this.name = "IPinfo";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/${query}`));
  }

  public searchByASN(query: string) {
    return ok(buildURL(this.baseURL, `/${query}`));
  }
}
