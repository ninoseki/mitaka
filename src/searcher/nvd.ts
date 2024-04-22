import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class NVD extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["cve"];

  public constructor() {
    super();
    this.baseURL = "https://nvd.nist.gov";
    this.name = "NVD";
  }

  public searchByCVE(query: string) {
    return ok(buildURL(this.baseURL, `/vuln/detail/${query}`));
  }
}
