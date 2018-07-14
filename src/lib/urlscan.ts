import axios from "axios";
import { Searcher } from "./searcher";

export class Urlscan implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: string[] = ["ip", "domain", "url"];
  protected apiKey: string;

  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoint = "https://urlscan.io/api/v1";
    this.name = "Urlscan";
  }

  public searchByIP(query) {
    const encoded = encodeURIComponent(query);
    return this.search(encoded);
  }

  public searchByDomain(query) {
    const encoded = encodeURIComponent(query);
    return this.search(encoded);
  }

  public searchByURL(query) {
    const encoded = encodeURIComponent(`"${query}"`);
    return this.search(encoded);
  }

  public search(query) {
    const url = `https://urlscan.io/search/`;
    return `${url}#${query}`;
  }

  public async scanByUrl(url, isPublic = true) {
    const res = await axios.post(`${this.endpoint}/scan/`, {
      public: isPublic ? "on" : "off",
      url,
    }, {
        headers: {
          "API-KEY": this.apiKey,
        },
      });
    return res;
  }
}
