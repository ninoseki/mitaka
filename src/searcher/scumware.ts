import { err, ok, Result } from "neverthrow";

import type { SearchableType } from "~/schemas";
import type { Searcher } from "~/types";
import { buildURL } from "~/utils";

export class Scumware implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "ip", "hash"];

  public constructor() {
    this.baseURL = "https://www.scumware.org";
    this.name = "Scumware";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/report/${query}`);
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/report/${query}`);
  }

  public searchByHash(query: string): Result<string, string> {
    if (query.length !== 32) {
      return err("Scumware supports only MD5 hashes");
    }

    return ok(buildURL(this.baseURL, `/report/${query}`));
  }
}
