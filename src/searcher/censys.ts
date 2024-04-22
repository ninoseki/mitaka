import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL, extractASNumber } from "~/utils";

import { Base } from "./base";

export class Censys extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "asn", "domain", "email"];

  public constructor() {
    super();
    this.baseURL = "https://search.censys.io";
    this.name = "Censys";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/hosts/${query}`));
  }

  public searchByASN(query: string) {
    const asn = extractASNumber(query);
    return ok(
      buildURL(this.baseURL, "/search", {
        q: `autonomous_system.asn:${asn}`,
        resource: "hosts",
      }),
    );
  }

  public searchByDomain(query: string) {
    return ok(
      buildURL(this.baseURL, "/search", {
        q: `parsed.names:${query}`,
        resource: "certificates",
      }),
    );
  }

  public searchByEmail(query: string) {
    return ok(
      buildURL(this.baseURL, "/search", {
        q: `parsed.subject.email_address:${query}`,
        resource: "certificates",
      }),
    );
  }
}
