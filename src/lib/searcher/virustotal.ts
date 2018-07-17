import * as crypto from "crypto-js";
import * as url from "url";
import { Scanner } from "../scanner/scanner";
import { Searcher } from "./searcher";

export class VirusTotal implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: string[] = ["ip", "domain", "url", "hash"];

  constructor() {
    this.endpoint = "https://www.virustotal.com/#";
    this.name = "VirusTotal";
  }

  public searchByIP(query) {
    return `${this.endpoint}/ip-address/${query}`;
  }

  public searchByURL(q) {
    const hash = crypto.SHA256(this.normalizeUrl(q));
    return `${this.endpoint}/url/${hash}`;
  }

  public normalizeUrl(q) {
    const parsedUrl = url.parse(q);
    if (parsedUrl.pathname === "/" && q.slice(-1) !== "/") {
      return `${q}/`;
    }
    return q;
  }

  public searchByDomain(query) {
    return `${this.endpoint}/domain/${query}`;
  }

  public searchByHash(query) {
    return `${this.endpoint}/file/${query}`;
  }
}
