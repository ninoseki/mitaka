import { SearchableType, Searcher } from "./searcher";

export class HybridAnalysis implements Searcher {
  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  constructor() {
    this.endpoint = "https://www.hybrid-analysis.com";
    this.name = "HybridAnalysis";
  }

  searchByHash(query) {
    if (query.length !== 64) {
      throw new Error("HybridAnalysis onlys suports SHA256");
    }
    return `${this.endpoint}/sample/${query}`;
  }

  searchByIP(query) {
    const q = encodeURIComponent(`host:${query}`);
    return `${this.endpoint}/search?query=${q}`;
  }

  searchByDomain(query) {
    const q = encodeURIComponent(`domain:${query}`);
    return `${this.endpoint}/search?query=${q}`;
  }
}
