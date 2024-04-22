import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class Triage extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash", "url"];

  public constructor() {
    super();
    this.baseURL = "https://tria.ge";
    this.name = "Triage";
  }

  public searchByHash(query: string) {
    return ok(buildURL(this.baseURL, "/s", { q: query }));
  }

  public searchByURL(query: string) {
    return ok(buildURL(this.baseURL, "/s", { q: `url:${query}` }));
  }
}
