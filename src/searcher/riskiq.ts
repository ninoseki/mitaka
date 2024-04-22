import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class RiskIQ extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = [
    "ip",
    "domain",
    "email",
    "gaTrackID",
  ];

  public constructor() {
    super();
    this.baseURL = "https://community.riskiq.com";
    this.name = "RiskIQ";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/search/${query}`));
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/search/${query}`));
  }

  public searchByEmail(query: string) {
    return ok(buildURL(this.baseURL, `/search/whois/email/${query}`));
  }

  public searchByGATrackID(query: string) {
    return ok(
      buildURL(this.baseURL, `/search/trackers/${query.toLowerCase()}`),
    );
  }
}
