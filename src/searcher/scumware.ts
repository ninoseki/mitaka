import { err, ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class Scumware extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "ip", "hash"];

  public constructor() {
    super();
    this.baseURL = "https://www.scumware.org";
    this.name = "Scumware";
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/report/${query}`));
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/report/${query}`));
  }

  public searchByHash(query: string) {
    if (query.length !== 32) {
      return err("Scumware supports only MD5 hashes");
    }

    return ok(buildURL(this.baseURL, `/report/${query}`));
  }
}
