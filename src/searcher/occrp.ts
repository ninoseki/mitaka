import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class OCCRP extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["email"];

  public constructor() {
    super();
    this.baseURL = "https://data.occrp.org";
    this.name = "OCCPR";
  }

  public searchByEmail(query: string) {
    return ok(
      buildURL(this.baseURL, "/search", {
        facet: "email",
        "filter:emails": query,
      }),
    );
  }
}
