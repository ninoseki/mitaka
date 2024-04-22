import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL, extractASNumber } from "~/utils";

import { Base } from "./base";

export class URLScan extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "asn", "url"];

  public constructor() {
    super();
    this.baseURL = "https://urlscan.io";
    this.name = "urlscan.io";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/ip/${query}`));
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/domain/${query}`));
  }

  public searchByASN(query: string) {
    const number: string = extractASNumber(query);
    return ok(buildURL(this.baseURL, `/asn/AS${number}`));
  }

  public searchByURL(query: string) {
    return ok(
      buildURL(
        this.baseURL,
        `/search/#${encodeURIComponent(`page.url:"${query}" OR task.url:"${query}"`)}`,
      ),
    );
  }
}
