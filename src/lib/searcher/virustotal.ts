import * as crypto from "crypto-js";
import * as url from "url";
import { SearchableType, Searcher } from "./searcher";

export class VirusTotal implements Searcher {

  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["ip", "domain", "url", "hash"];

  constructor() {
    this.endpoint = "https://www.virustotal.com/#";
    this.name = "VirusTotal";
  }

  searchByIP(query) {
    return `${this.endpoint}/ip-address/${query}`;
  }

  searchByURL(q) {
    const hash = crypto.SHA256(this.normalizeURL(q));
    return `${this.endpoint}/url/${hash}`;
  }

  normalizeURL(q) {
    const parsedUrl = url.parse(q);
    if (parsedUrl.pathname === "/" && q.slice(-1) !== "/") {
      return `${q}/`;
    }
    return q;
  }

  searchByDomain(query) {
    return `${this.endpoint}/domain/${query}`;
  }

  searchByHash(query) {
    return `${this.endpoint}/file/${query}`;
  }
}
