import { ApiKeys, Scanner } from "./scanner";
import { Searcher } from "./searcher";
import { AnalyzerEntry, Selector } from "./selector";

export class Command {
  public action: string;
  public query: string;
  public target: string;
  public type: string;

  public constructor(command: string) {
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
    const entry = entries.find(r => r.analyzer.name === this.target);
    let url = "";
    if (entry !== undefined) {
      const searcher = entry.analyzer as Searcher;
      switch (this.type) {
        case "text":
          if (searcher.searchByText) {
            url = searcher.searchByText(entry.query);
          }
          break;
        case "ip":
          if (searcher.searchByIP) {
            url = searcher.searchByIP(entry.query);
          }
          break;
        case "domain":
          if (searcher.searchByDomain) {
            url = searcher.searchByDomain(entry.query);
          }
          break;
        case "url":
          if (searcher.searchByURL) {
            url = searcher.searchByURL(entry.query);
          }
          break;
        case "asn":
          if (searcher.searchByASN) {
            url = searcher.searchByASN(entry.query);
          }
          break;
        case "email":
          if (searcher.searchByEmail) {
            url = searcher.searchByEmail(entry.query);
          }
          break;
        case "hash":
          if (searcher.searchByHash) {
            url = searcher.searchByHash(entry.query);
          }
          break;
        case "cve":
          if (searcher.searchByCVE) {
            url = searcher.searchByCVE(entry.query);
          }
          break;
        case "btc":
          if (searcher.searchByBTC) {
            url = searcher.searchByBTC(entry.query);
          }
          break;
        case "xmr":
          if (searcher.searchbyXMR) {
            url = searcher.searchbyXMR(entry.query);
          }
          break;
        case "gaTrackID":
          if (searcher.searchByGATrackID) {
            url = searcher.searchByGATrackID(entry.query);
          }
          break;
        case "gaPubID":
          if (searcher.searchByGAPubID) {
            url = searcher.searchByGAPubID(entry.query);
          }
          break;
        default:
          break;
      }
    }
    return url;
  }

  public async scan(apiKeys: ApiKeys): Promise<string> {
    const selector: Selector = new Selector(this.query);
    const entries: AnalyzerEntry[] = selector.getScannerEntries();
    const entry = entries.find(r => r.analyzer.name === this.target);
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
          if (scanner.scanByIP) {
            url = await scanner.scanByIP(entry.query);
          }
          break;
        case "domain":
          if (scanner.scanByDomain) {
            url = await scanner.scanByDomain(entry.query);
          }
          break;
        case "url":
          if (scanner.scanByURL) {
            url = await scanner.scanByURL(entry.query);
          }
          break;
        default:
          break;
      }
    }
    return url;
  }
}
