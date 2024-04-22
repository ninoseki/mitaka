import { sha256 } from "js-sha256";
import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";

import { Base } from "./base";

export class Maltiverse extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "url", "hash"];

  public constructor() {
    super();
    this.baseURL = "https://www.maltiverse.com";
    this.name = "Maltiverse";
  }

  public searchByIP(query: string) {
    return ok(`${this.baseURL}/ip/${query}`);
  }

  public searchByDomain(query: string) {
    return ok(`${this.baseURL}/hostname/${query}`);
  }

  public searchByURL(query: string) {
    const hash = sha256(query);
    return ok(`${this.baseURL}/url/${hash}`);
  }

  public searchByHash(query: string) {
    return ok(`${this.baseURL}/search;query=${query}`);
  }
}
