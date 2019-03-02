import { ApiKeys, Scanner } from "./scanner";
import { Searcher } from "./searcher";
import { AnalyzerEntry, Selector } from "./selector";

export class Command {
  public action: string;
  public query: string;
  public target: string;
  public type: string;

  constructor(command: string) {
    // command = `Search ${entry.query} as a ${entry.type} on ${name}`;
    const parts: string[] = command.split(" ");
    this.action = parts[0].toLowerCase();
    this.type = parts[parts.length - 3];
    this.query = parts.slice(1, parts.length - 5).join(" ");
    this.target = parts[parts.length - 1];
  }

  public search(): string {
    const selector: Selector = new Selector(this.query);
    const entries: AnalyzerEntry[] = selector.getSearcherEntries();
    const entry = entries.find((r) => r.analyzer.name === this.target);
    let url = "";
    if (entry !== undefined) {
      const searcher = entry.analyzer as Searcher;
      switch (this.type) {
        case "text":
          url = searcher.searchByText!(entry.query);
          break;
        case "ip":
          url = searcher.searchByIP!(entry.query);
          break;
        case "domain":
          url = searcher.searchByDomain!(entry.query);
          break;
        case "url":
          url = searcher.searchByURL!(entry.query);
          break;
        case "asn":
          url = searcher.searchByASN!(entry.query);
          break;
        case "email":
          url = searcher.searchByEmail!(entry.query);
          break;
        case "hash":
          url = searcher.searchByHash!(entry.query);
          break;
        case "cve":
          url = searcher.searchByCVE!(entry.query);
          break;
        case "btc":
          url = searcher.searchByBTC!(entry.query);
          break;
        case "xmr":
          url = searcher.searchbyXMR!(entry.query);
          break;
        case "gaTrackID":
          url = searcher.searchByGATrackID!(entry.query);
          break;
        case "gaPubID":
          url = searcher.searchByGAPubID!(entry.query);
          break;
        default:
          break;
      }
    }
    return url;
  }

  public async scan(apiKeys: ApiKeys) {
    const selector: Selector = new Selector(this.query);
    const entries: AnalyzerEntry[] = selector.getScannerEntries();
    const entry = entries.find((r) => r.analyzer.name === this.target);
    let url = "";
    if (entry !== undefined) {
      const scanner = entry.analyzer as Scanner;
      switch (scanner.name) {
        case "Urlscan":
          scanner.setApiKey(apiKeys.urlscanApiKey);
          break;
        case "VirusTotal":
          scanner.setApiKey(apiKeys.virusTotalApiKey);
          break;
        default:
          break;
      }
      switch (entry.type) {
        case "ip":
          url = await scanner.scanByIP!(entry.query);
          break;
        case "domain":
          url = await scanner.scanByDomain!(entry.query);
          break;
        case "url":
          url = await scanner.scanByURL!(entry.query);
          break;
        default:
          break;
      }
    }
    return url;
  }
}
