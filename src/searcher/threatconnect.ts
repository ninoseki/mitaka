import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class ThreatConnect extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "email"];

  public constructor() {
    super();
    this.baseURL = "https://app.threatconnect.com";
    this.name = "ThreatConnect";
  }

  public searchByIP(query: string) {
    return this.searchByType("address", query);
  }

  public searchByDomain(query: string) {
    return this.searchByType("host", query);
  }

  public searchByEmail(query: string) {
    return this.searchByType("emailaddress", query);
  }

  private searchByType(type: string, query: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {};
    params[type] = query;

    return ok(
      buildURL(this.baseURL, `/auth/indicators/details/${type}.xhtml`, params),
    );
  }
}
