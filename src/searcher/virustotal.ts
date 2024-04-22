import { sha256 } from "js-sha256";
import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class VirusTotal extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "url", "hash"];

  public constructor() {
    super();
    this.baseURL = "https://www.virustotal.com";
    this.name = "VirusTotal";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/gui/ip-address/${query}/details`));
  }

  public searchByURL(query: string) {
    const hash = sha256(this.normalizeURL(query));
    return ok(buildURL(this.baseURL, `/gui/url/${hash}/details`));
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/gui/domain/${query}/details`));
  }

  public searchByHash(query: string) {
    return ok(buildURL(this.baseURL, `/gui/file/${query}/details`));
  }

  private normalizeURL(uri: string): string {
    const parsedUrl = new URL(uri);
    if (parsedUrl.pathname === "/" && !uri.endsWith("/")) {
      return `${uri}/`;
    }
    return uri;
  }
}
