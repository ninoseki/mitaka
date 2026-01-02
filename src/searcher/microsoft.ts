import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class Microsoft extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["cve"];

  public constructor() {
    super();
    this.baseURL = "https://msrc.microsoft.com";
    this.name = "Microsoft";
  }

  public searchByCVE(query: string) {
    return ok(buildURL(this.baseURL, `/update-guide/vulnerability/${query}`));
  }
}
