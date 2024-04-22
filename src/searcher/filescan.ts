import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class FileScan extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    super();
    this.baseURL = "https://www.filescan.io";
    this.name = "FileScan.IO";
  }

  public searchByHash(query: string) {
    return ok(buildURL(this.baseURL, "/search-result", { query }));
  }
}
