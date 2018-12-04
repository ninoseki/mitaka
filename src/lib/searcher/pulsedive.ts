import * as crypto from "crypto-js";
import { SearchableType, Searcher } from "./searcher";

export class Pulsedive implements Searcher {

  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["ip", "domain", "url", "hash"];

  constructor() {
    this.endpoint = "https://pulsedive.com";
    this.name = "Pulsedive";
  }

  searchByIP(query) {
    return this.search(query);
  }
  searchByDomain(query) {
    return this.search(query);
  }
  searchByURL(query) {
    return this.search(query);
  }
  searchByHash(query) {
    return this.search(query);
  }

  private search(query: string) {
    const wordArray = crypto.enc.Utf8.parse(query);
    const b64 = crypto.enc.Base64.stringify(wordArray);
    return `${this.endpoint}/indicator/?ioc=${b64}`;
  }
}
