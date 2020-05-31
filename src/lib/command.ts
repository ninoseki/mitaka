import { Selector } from "./selector";
import {
  AnalyzerEntry,
  ApiKeys,
  Scanner,
  ScannerTable,
  Searcher,
  SearcherStates,
  SearcherTable,
} from "./types";

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

  private searcherTable: SearcherTable = {
    text: (searcher: Searcher, query: string): string => {
      if (searcher.searchByText) {
        return searcher.searchByText(query);
      }
      return "";
    },
    ip: (searcher: Searcher, query: string): string => {
      if (searcher.searchByIP) {
        return searcher.searchByIP(query);
      }
      return "";
    },
    domain: (searcher: Searcher, query: string): string => {
      if (searcher.searchByDomain) {
        return searcher.searchByDomain(query);
      }
      return "";
    },
    url: (searcher: Searcher, query: string): string => {
      if (searcher.searchByURL) {
        return searcher.searchByURL(query);
      }
      return "";
    },
    asn: (searcher: Searcher, query: string): string => {
      if (searcher.searchByASN) {
        return searcher.searchByASN(query);
      }
      return "";
    },
    email: (searcher: Searcher, query: string): string => {
      if (searcher.searchByEmail) {
        return searcher.searchByEmail(query);
      }
      return "";
    },
    hash: (searcher: Searcher, query: string): string => {
      if (searcher.searchByHash) {
        return searcher.searchByHash(query);
      }
      return "";
    },
    cve: (searcher: Searcher, query: string): string => {
      if (searcher.searchByCVE) {
        return searcher.searchByCVE(query);
      }
      return "";
    },
    btc: (searcher: Searcher, query: string): string => {
      if (searcher.searchByBTC) {
        return searcher.searchByBTC(query);
      }
      return "";
    },
    xmr: (searcher: Searcher, query: string): string => {
      if (searcher.searchByXMR) {
        return searcher.searchByXMR(query);
      }
      return "";
    },
    gaPubID: (searcher: Searcher, query: string): string => {
      if (searcher.searchByGAPubID) {
        return searcher.searchByGAPubID(query);
      }
      return "";
    },
    gaTrackID: (searcher: Searcher, query: string): string => {
      if (searcher.searchByGATrackID) {
        return searcher.searchByGATrackID(query);
      }
      return "";
    },
  };

  public search(): string {
    const selector: Selector = new Selector(this.query);
    const entries: AnalyzerEntry[] = selector.getSearcherEntries();
    const entry = entries.find((r) => r.analyzer.name === this.target);
    let url = "";
    if (entry !== undefined) {
      const searcher = entry.analyzer as Searcher;
      if (this.type in this.searcherTable) {
        const fn = this.searcherTable[this.type];
        url = fn(searcher, entry.query);
      }
    }
    return url;
  }

  public searchAll(searcherStates: SearcherStates): string[] {
    const selector: Selector = new Selector(this.query);
    const entries: AnalyzerEntry[] = selector
      .getSearcherEntries()
      .filter((entry) => this.type === entry.type);
    const selectedEntries = entries.filter(
      (entry) =>
        !(entry.analyzer.name in searcherStates) ||
        searcherStates[entry.analyzer.name]
    );
    const urls: string[] = [];
    for (const entry of selectedEntries) {
      const searcher = entry.analyzer as Searcher;
      if (this.type in this.searcherTable) {
        try {
          const fn = this.searcherTable[this.type];
          urls.push(fn(searcher, entry.query));
        } catch (err) {
          continue;
        }
      }
    }
    return urls;
  }

  private scannerTable: ScannerTable = {
    ip: async (scanner: Scanner, query: string): Promise<string> => {
      if (scanner.scanByIP) {
        return scanner.scanByIP(query);
      }
      return "";
    },
    domain: async (scanner: Scanner, query: string): Promise<string> => {
      if (scanner.scanByDomain) {
        return scanner.scanByDomain(query);
      }
      return "";
    },
    url: async (scanner: Scanner, query: string): Promise<string> => {
      if (scanner.scanByURL) {
        return scanner.scanByURL(query);
      }
      return "";
    },
  };

  public async scan(apiKeys: ApiKeys): Promise<string> {
    const selector: Selector = new Selector(this.query);
    const entries: AnalyzerEntry[] = selector.getScannerEntries();
    const entry = entries.find((r) => r.analyzer.name === this.target);
    let url = "";
    if (entry !== undefined) {
      const scanner = entry.analyzer as Scanner;
      switch (scanner.name) {
        case "HybridAnalysis":
          scanner.setApiKey(apiKeys.hybridAnalysisApiKey);
          break;
        case "Urlscan":
          scanner.setApiKey(apiKeys.urlscanApiKey);
          break;
        case "VirusTotal":
          scanner.setApiKey(apiKeys.virusTotalApiKey);
          break;
        default:
          break;
      }
      if (entry.type in this.scannerTable) {
        const fn = this.scannerTable[entry.type];
        url = await fn(scanner, entry.query);
      }
    }
    return url;
  }
}
