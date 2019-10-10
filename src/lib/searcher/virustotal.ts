import * as crypto from "crypto-js";
import * as url from "url";
import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class VirusTotal implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "url", "hash"];

  public constructor() {
    this.endpoint = "https://www.virustotal.com";
    this.name = "VirusTotal";
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, `/gui/ip-address/${query}/details`);
  }

  public searchByURL(query: string): string {
    const hash = crypto.SHA256(this.normalizeURL(query));
    return buildURL(this.endpoint, `/gui/url/${hash}/details`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, `/gui/domain/${query}/details`);
  }

  public searchByHash(query: string): string {
    return buildURL(this.endpoint, `/gui/file/${query}/details`);
  }

  private normalizeURL(uri: string): string {
    const parsedUrl = url.parse(uri);
    if (parsedUrl.pathname === "/" && !uri.endsWith("/")) {
      return `${uri}/`;
    }
    return uri;
  }
}
