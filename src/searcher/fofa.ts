import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { base64fy, buildURL } from "~/utils";

import { Base } from "./base";

export class FOFA extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    super();
    this.baseURL = "https://fofa.so";
    this.name = "FOFA";
  }

  public searchByIP(query: string) {
    return this.search(`ip="${query}"`);
  }

  public searchByDomain(query: string) {
    return this.search(`domain="${query}"`);
  }

  private search(query: string) {
    return ok(buildURL(this.baseURL, "/result", { qbase64: base64fy(query) }));
  }
}
