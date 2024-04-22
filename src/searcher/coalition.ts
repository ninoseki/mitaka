import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class Coalition extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["cve"];

  public constructor() {
    super();
    this.baseURL = "https://ess.coalitioninc.com";
    this.name = "Coalition";
  }

  public searchByCVE(query: string) {
    return ok(buildURL(this.baseURL, "/cve/", { id: query }));
  }
}
