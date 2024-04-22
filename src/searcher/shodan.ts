import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class Shodan extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "asn"];

  public constructor() {
    super();
    this.baseURL = `https://www.shodan.io`;
    this.name = "Shodan";
  }

  public searchByASN(query: string) {
    return ok(buildURL(this.baseURL, "/search", { query: `asn:${query}` }));
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/host/${query}`));
  }

  public searchByDomain(query: string) {
    return ok(
      buildURL(this.baseURL, "/search", { query: `hostname:${query}` }),
    );
  }
}
