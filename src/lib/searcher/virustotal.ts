import { sha256 } from "js-sha256";
import url from "url";

import { SearchableType, Searcher } from "../types";
import { buildURL } from "../url_builder";

export class VirusTotal implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "url", "hash"];

  public constructor() {
    this.baseURL = "https://www.virustotal.com";
    this.name = "VirusTotal";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/gui/ip-address/${query}/details`);
  }

  public searchByURL(query: string): string {
    const hash = sha256(this.normalizeURL(query));
    return buildURL(this.baseURL, `/gui/url/${hash}/details`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/gui/domain/${query}/details`);
  }

  public searchByHash(query: string): string {
    return buildURL(this.baseURL, `/gui/file/${query}/details`);
  }

  private normalizeURL(uri: string): string {
    const parsedUrl = url.parse(uri);
    if (parsedUrl.pathname === "/" && !uri.endsWith("/")) {
      return `${uri}/`;
    }
    return uri;
  }
}
