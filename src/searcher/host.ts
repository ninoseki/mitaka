import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class Host extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  public constructor() {
    super();
    this.baseURL = "https://host.io";
    this.name = "host.io";
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/${query}`));
  }
}
