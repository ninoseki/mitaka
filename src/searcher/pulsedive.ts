import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { base64fy } from "~/utils";

import { Base } from "./base";

export class Pulsedive extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "url", "hash"];

  public constructor() {
    super();
    this.baseURL = "https://pulsedive.com";
    this.name = "Pulsedive";
  }

  public searchByIP(query: string) {
    return this.search(query);
  }
  public searchByDomain(query: string) {
    return this.search(query);
  }
  public searchByURL(query: string) {
    return this.search(query);
  }
  public searchByHash(query: string) {
    return this.search(query);
  }

  private search(query: string) {
    return ok(`${this.baseURL}/indicator/?ioc=${base64fy(query)}`);
  }
}
