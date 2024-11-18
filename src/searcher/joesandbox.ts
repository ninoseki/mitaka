import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class JoeSandbox extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    super();
    this.baseURL = "https://www.joesandbox.com";
    this.name = "JoeSandbox";
  }

  public searchByHash(query: string) {
    return ok(buildURL(this.baseURL, `/analysis/search`, { q: query }));
  }
}
