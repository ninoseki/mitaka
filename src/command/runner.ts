import { Selector } from "@/selector";
import {
  AnalyzerEntry,
  ApiKeys,
  Command,
  Scanner,
  ScannerTable,
  Searcher,
  SearcherStates,
  SearcherTable,
} from "@/types";

export class CommandRunner {
  public command: Command;

  public constructor(commandString: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const command: Command = JSON.parse(commandString);
    this.command = command;
  }

  private searcherTable: SearcherTable = {
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
    eth: (searcher: Searcher, query: string): string => {
      if (searcher.searchByETH) {
        return searcher.searchByETH(query);
      }
      return "";
    },
  };

  public search(): string {
    const selector: Selector = new Selector(this.command.query);
    const entries: AnalyzerEntry[] = selector.getSearcherEntries();
    const entry = entries.find((r) => r.analyzer.name === this.command.target);
    let url = "";

    if (entry !== undefined) {
      const searcher = entry.analyzer as Searcher;
      if (this.command.type in this.searcherTable) {
        const fn = this.searcherTable[this.command.type];
        url = fn(searcher, entry.query);
      }
    }

    return url;
  }

  public selectSearchers(searcherStates: SearcherStates): AnalyzerEntry[] {
    const selector: Selector = new Selector(this.command.query);
    const entries: AnalyzerEntry[] = selector
      .getSearcherEntries()
      .filter((entry) => this.command.type === entry.type);
    const selectedEntries = entries.filter(
      (entry) =>
        !(entry.analyzer.name in searcherStates) ||
        searcherStates[entry.analyzer.name]
    );
    return selectedEntries;
  }

  public getNumberOfSearchers(searcherStates: SearcherStates): number {
    const selectedEntries = this.selectSearchers(searcherStates);
    return selectedEntries.length;
  }

  public searchAll(searcherStates: SearcherStates): string[] {
    const selectedEntries = this.selectSearchers(searcherStates);
    const urls: string[] = [];
    for (const entry of selectedEntries) {
      const searcher = entry.analyzer as Searcher;
      if (this.command.type in this.searcherTable) {
        try {
          const fn = this.searcherTable[this.command.type];
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
    const selector: Selector = new Selector(this.command.query);
    const entries: AnalyzerEntry[] = selector.getScannerEntries();
    const entry = entries.find((r) => r.analyzer.name === this.command.target);
    let url = "";
    if (entry !== undefined) {
      const scanner = entry.analyzer as Scanner;
      switch (scanner.name) {
        case "HybridAnalysis":
          if (typeof scanner["setApiKey"] === "function") {
            scanner.setApiKey(apiKeys.hybridAnalysisApiKey);
          }
          break;
        case "urlscan.io":
          if (typeof scanner["setApiKey"] === "function") {
            scanner.setApiKey(apiKeys.urlscanApiKey);
          }
          break;
        case "VirusTotal":
          if (typeof scanner["setApiKey"] === "function") {
            scanner.setApiKey(apiKeys.virusTotalApiKey);
          }
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
