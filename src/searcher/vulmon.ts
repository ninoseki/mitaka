import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class Vulmon extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["cve"];

  public constructor() {
    super();
    this.baseURL = "https://vulmon.com";
    this.name = "Vulmon";
  }

  public searchByCVE(query: string) {
    return ok(buildURL(this.baseURL, "/vulnerabilitydetails", { qid: query }));
  }
}
