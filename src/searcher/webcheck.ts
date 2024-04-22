import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class WebCheck extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  public constructor() {
    super();
    this.baseURL = "https://web-check.xyz";
    this.name = "WebCheck";
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/results/${query}`));
  }
}
