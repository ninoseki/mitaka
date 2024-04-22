import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class ThreatMiner extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  public constructor() {
    super();
    this.baseURL = "https://www.threatminer.org";
    this.name = "ThreatMiner";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, "/host.php", { q: query }));
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, "/domain.php", { q: query }));
  }

  public searchByHash(query: string) {
    return ok(buildURL(this.baseURL, "/sample.php", { q: query }));
  }
}
