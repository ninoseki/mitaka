import { ok } from "neverthrow";
import { encode as base64Encode } from "base-64";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class ZoomEye extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip"];

  public constructor() {
    super();
    this.baseURL = "https://www.zoomeye.ai";
    this.name = "ZoomEye";
  }

  public searchByIP(query: string) {
    const encodedQuery = base64Encode(`ip="${query}"`);
    return ok(
      buildURL(this.baseURL, "/searchResult", {
        q: encodedQuery,
        t: "host",
      }),
    );
  }
}
