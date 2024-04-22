import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class ThreatCrowd extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "email"];

  public constructor() {
    super();
    this.baseURL = "https://www.threatcrowd.org";
    this.name = "ThreatCrowd";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, "/ip.php", { ip: query }));
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, "/domain.php", { domain: query }));
  }

  public searchByEmail(query: string) {
    return ok(buildURL(this.baseURL, "/email.php", { email: query }));
  }
}
