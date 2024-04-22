import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class GreyNoise extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "asn", "cve"];

  public constructor() {
    super();
    this.baseURL = "https://viz.greynoise.io";
    this.name = "GreyNoise";
  }

  public searchByIP(query: string) {
    return this.search(`ip:${query}`);
  }

  public searchByDomain(query: string) {
    return this.search(`metadata.rdns:${query}`);
  }

  public searchByASN(query: string) {
    return this.search(`metadata.asn:${query}`);
  }

  public searchByCVE(query: string) {
    return this.search(`cve:${query}`);
  }

  private search(gnql: string) {
    return ok(buildURL(this.baseURL, "/query", { gnql: gnql }));
  }
}
