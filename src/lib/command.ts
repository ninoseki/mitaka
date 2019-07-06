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

  private searcherTable = {
    text: function(searcher: Searcher, query: string): string {
      if (searcher.searchByText) {
        return searcher.searchByText(query);
      }
      return "";
    },
    ip: function(searcher: Searcher, query: string): string {
      if (searcher.searchByIP) {
        return searcher.searchByIP(query);
      }
      return "";
    },
    domain: function(searcher: Searcher, query: string): string {
      if (searcher.searchByDomain) {
        return searcher.searchByDomain(query);
      }
      return "";
    },
    url: function(searcher: Searcher, query: string): string {
      if (searcher.searchByURL) {
        return searcher.searchByURL(query);
      }
      return "";
    },
    asn: function(searcher: Searcher, query: string): string {
      if (searcher.searchByASN) {
        return searcher.searchByASN(query);
      }
      return "";
    },
    email: function(searcher: Searcher, query: string): string {
      if (searcher.searchByEmail) {
        return searcher.searchByEmail(query);
      }
      return "";
    },
    hash: function(searcher: Searcher, query: string): string {
      if (searcher.searchByHash) {
        return searcher.searchByHash(query);
      }
      return "";
    },
    cve: function(searcher: Searcher, query: string): string {
      if (searcher.searchByCVE) {
        return searcher.searchByCVE(query);
      }
      return "";
    },
    btc: function(searcher: Searcher, query: string): string {
      if (searcher.searchByBTC) {
        return searcher.searchByBTC(query);
      }
      return "";
    },
    xmr: function(searcher: Searcher, query: string): string {
      if (searcher.searchByXMR) {
        return searcher.searchByXMR(query);
      }
      return "";
    },
    gaPubID: function(searcher: Searcher, query: string): string {
      if (searcher.searchByGAPubID) {
        return searcher.searchByGAPubID(query);
      }
      return "";
    },
    gaTrackID: function(searcher: Searcher, query: string): string {
      if (searcher.searchByGATrackID) {
        return searcher.searchByGATrackID(query);
      }
      return "";
    },
  };

  public search(): string {
    const selector: Selector = new Selector(this.query);
    const entries: AnalyzerEntry[] = selector.getSearcherEntries();
    const entry = entries.find(r => r.analyzer.name === this.target);
    let url = "";
    if (entry !== undefined) {
      const searcher = entry.analyzer as Searcher;
      const fn: Function = this.searcherTable[entry.type];
      url = fn(searcher, entry.query);
    }
    return url;
  }

  private scannerTable = {
    ip: async function(scanner: Scanner, query: string): Promise<string> {
      if (scanner.scanByIP) {
        return await scanner.scanByIP(query);
      }
      return "";
    },
    domain: async function(scanner: Scanner, query: string): Promise<string> {
      if (scanner.scanByDomain) {
        return await scanner.scanByDomain(query);
      }
      return "";
    },
    url: async function(scanner: Scanner, query: string): Promise<string> {
      if (scanner.scanByURL) {
        return await scanner.scanByURL(query);
      }
      return "";
    },
  };

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
      const fn: Function = this.scannerTable[entry.type];
      url = await fn(scanner, entry.query);
    }
    return url;
  }
}
