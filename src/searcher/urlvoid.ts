import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class URLVoid extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  public constructor() {
    super();
    this.baseURL = "https://www.urlvoid.com";
    this.name = "URLVoid";
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/scan/${query}`));
  }
}
