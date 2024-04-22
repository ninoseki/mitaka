import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL, extractASNumber } from "~/utils";

import { Base } from "./base";

export class Spyse extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = [
    "ip",
    "domain",
    "asn",
    "cve",
    "email",
  ];

  public constructor() {
    super();
    this.baseURL = "https://spyse.com";
    this.name = "Spyse";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/target/ip/${query}`));
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/target/domain/${query}`));
  }

  public searchByASN(query: string) {
    const asn = extractASNumber(query);
    return ok(buildURL(this.baseURL, `/target/as/${asn}`));
  }

  public searchByCVE(query: string) {
    return ok(buildURL(this.baseURL, `/target/cve/${query}`));
  }

  public searchByEmail(query: string) {
    return ok(
      buildURL(this.baseURL, "/search", {
        target: "domain",
        search_params: `[{"whois_registrant_email":{"operator":"eq","value":"${query}"}}]`,
      }),
    );
  }
}
