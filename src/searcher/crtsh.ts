import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class Crtsh extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  public constructor() {
    super();
    this.baseURL = "https://crt.sh";
    this.name = "crt.sh";
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, "/", { q: query }));
  }
}
