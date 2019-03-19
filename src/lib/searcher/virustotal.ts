import * as crypto from "crypto-js";
import * as url from "url";
import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class VirusTotal implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "url", "hash"];

  constructor() {
    this.endpoint = "https://www.virustotal.com/#";
    this.name = "VirusTotal";
  }

  public searchByIP(query: string) {
    return buildURL(this.endpoint, `/ip-address/${query}`);
  }

  public searchByURL(query: string) {
    const hash = crypto.SHA256(this.normalizeURL(query));
    return buildURL(this.endpoint, `/url/${hash}`);
  }

  public searchByDomain(query: string) {
    return buildURL(this.endpoint, `/domain/${query}`);
  }

  public searchByHash(query: string) {
    return buildURL(this.endpoint, `/file/${query}`);
  }

  private normalizeURL(uri: string) {
    const parsedUrl = url.parse(uri);
    if (parsedUrl.pathname === "/" && uri.slice(-1) !== "/") {
      return `${uri}/`;
    }
    return uri;
  }
}
