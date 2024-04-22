import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class Malshare extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    super();
    this.baseURL = "https://www.malshare.com";
    this.name = "MalShare";
  }

  public searchByHash(query: string) {
    return ok(
      buildURL(this.baseURL, "/sample.php", {
        action: "detail",
        hash: query,
      }),
    );
  }
}
