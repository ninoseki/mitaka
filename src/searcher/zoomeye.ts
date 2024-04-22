import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class ZoomEye extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip"];

  public constructor() {
    super();
    this.baseURL = "https://www.zoomeye.org";
    this.name = "ZoomEye";
  }

  public searchByIP(query: string) {
    return ok(
      buildURL(this.baseURL, "/searchResult", {
        q: `ip:"${query}"`,
        t: "host",
      }),
    );
  }
}
