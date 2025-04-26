import { ok } from "neverthrow";
import { Base64 } from "js-base64";

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
    const encodedQuery = Base64.encode(`ip="${query}"`);
    return ok(
      buildURL(this.baseURL, "/searchResult", {
        q: encodedQuery,
      }),
    );
  }
}