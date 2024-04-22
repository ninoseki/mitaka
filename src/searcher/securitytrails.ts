import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class SecurityTrails extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    super();
    this.baseURL = "https://securitytrails.com";
    this.name = "SecurityTrails";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/list/ip/${query}`));
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/domain/${query}`));
  }
}
