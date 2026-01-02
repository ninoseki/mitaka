import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class MITRE extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["cve"];

  public constructor() {
    super();
    this.baseURL = "https://cve.org";
    this.name = "MITRE";
  }

  public searchByCVE(query: string) {
    return ok(buildURL(this.baseURL, `/CVERecord?id=${query}`));
  }
}
