import { ApiKeys } from "./scanner";
import { ScannerResult, SearcherResult, Selector } from "./selector";

export class Command {
  public action: string;
  public parts: string[];
  public query: string;
  public target: string;

  constructor(command: string) {
    this.parts = command.split(" ");
    this.action = this.parts[0].toLowerCase();
    this.query = this.parts.slice(1, this.parts.length - 5).join(" ");
    this.target = this.parts[this.parts.length - 1];
  }

  public search(): string {
    const selector: Selector = new Selector(this.query);
    const results: SearcherResult[] = selector.getSearcherResults();
    const result = results.find((r) => r.searcher.name === this.target);
    let url = "";
    if (result !== undefined) {
      switch (result.type) {
        case "text":
          url = result.searcher.searchByText!(result.query);
          break;
        case "ip":
          url = result.searcher.searchByIP!(result.query);
          break;
        case "domain":
          url = result.searcher.searchByDomain!(result.query);
          break;
        case "url":
          url = result.searcher.searchByURL!(result.query);
          break;
        case "hash":
          url = result.searcher.searchByHash!(result.query);
          break;
      }
    }
    return url;
  }

  public async scan(apiKeys: ApiKeys) {
    const selector: Selector = new Selector(this.query);
    const results: ScannerResult[] = selector.getScannerResults();
    const result = results.find((r) => r.scanner.name === this.target);
    let url = "";
    if (result !== undefined) {
      switch (result.scanner.name) {
        case "Urlscan":
          result.scanner.setApiKey(apiKeys.urlscanApiKey);
          break;
        case "VirusTotal":
          result.scanner.setApiKey(apiKeys.virusTotalApiKey);
          break;
      }
      switch (result.type) {
        case "ip":
          url = await result.scanner.scanByIP!(result.query);
          break;
        case "domain":
          url = await result.scanner.scanByDomain!(result.query);
          break;
        case "url":
          url = await result.scanner.scanByURL!(result.query);
          break;
      }
    }
    return url;
  }
}
