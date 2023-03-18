import { Selector } from "@/selector";
import type {
  Command,
  Options,
  Scanner,
  ScannerMap,
  Searcher,
  SearcherMap,
  SelectorSlot,
} from "@/types";
import { isScanner, isSearcher } from "@/utils";

export class CommandRunner {
  public command: Command;
  protected options: Options;

  public constructor(command: Command, options: Options) {
    this.command = command;
    this.options = options;
  }

  private searcherMap: SearcherMap = {
    ip: (searcher: Searcher, query: string): string | undefined => {
      if (searcher.searchByIP) {
        return searcher.searchByIP(query);
      }
    },
    domain: (searcher: Searcher, query: string): string | undefined => {
      if (searcher.searchByDomain) {
        return searcher.searchByDomain(query);
      }
    },
    url: (searcher: Searcher, query: string): string | undefined => {
      if (searcher.searchByURL) {
        return searcher.searchByURL(query);
      }
    },
    asn: (searcher: Searcher, query: string): string | undefined => {
      if (searcher.searchByASN) {
        return searcher.searchByASN(query);
      }
    },
    email: (searcher: Searcher, query: string): string | undefined => {
      if (searcher.searchByEmail) {
        return searcher.searchByEmail(query);
      }
    },
    hash: (searcher: Searcher, query: string): string | undefined => {
      if (searcher.searchByHash) {
        return searcher.searchByHash(query);
      }
    },
    cve: (searcher: Searcher, query: string): string | undefined => {
      if (searcher.searchByCVE) {
        return searcher.searchByCVE(query);
      }
    },
    btc: (searcher: Searcher, query: string): string | undefined => {
      if (searcher.searchByBTC) {
        return searcher.searchByBTC(query);
      }
    },
    gaPubID: (searcher: Searcher, query: string): string | undefined => {
      if (searcher.searchByGAPubID) {
        return searcher.searchByGAPubID(query);
      }
    },
    gaTrackID: (searcher: Searcher, query: string): string | undefined => {
      if (searcher.searchByGATrackID) {
        return searcher.searchByGATrackID(query);
      }
    },
    eth: (searcher: Searcher, query: string): string | undefined => {
      if (searcher.searchByETH) {
        return searcher.searchByETH(query);
      }
    },
  };

  public search(): string | undefined {
    const selector: Selector = new Selector(this.command.query, this.options);
    const slots: SelectorSlot[] = selector.getSearcherSlots();
    const slot = slots.find((s) => s.analyzer.name === this.command.name);

    if (slot === undefined) {
      return undefined;
    }

    if (!isSearcher(slot.analyzer)) {
      return undefined;
    }

    const searcher = slot.analyzer;
    if (this.command.type in this.searcherMap) {
      const fn = this.searcherMap[this.command.type];
      return fn(searcher, slot.query);
    }

    return undefined;
  }

  public searchAll(): string[] {
    const selector: Selector = new Selector(this.command.query, this.options);
    const slots: SelectorSlot[] = selector.getSearcherSlots();

    return slots
      .map((slot) => {
        const searcher = slot.analyzer;
        if (this.command.type in this.searcherMap) {
          const fn = this.searcherMap[this.command.type];
          return fn(searcher, slot.query);
        }
      })
      .flatMap((url) => (url === undefined ? [] : [url]));
  }

  private scannerMap: ScannerMap = {
    ip: async (
      scanner: Scanner,
      query: string
    ): Promise<string | undefined> => {
      if (scanner.scanByIP) {
        return scanner.scanByIP(query);
      }
    },
    domain: async (
      scanner: Scanner,
      query: string
    ): Promise<string | undefined> => {
      if (scanner.scanByDomain) {
        return scanner.scanByDomain(query);
      }
    },
    url: async (
      scanner: Scanner,
      query: string
    ): Promise<string | undefined> => {
      if (scanner.scanByURL) {
        return scanner.scanByURL(query);
      }
    },
  };

  public async scan(): Promise<string | undefined> {
    const selector: Selector = new Selector(this.command.query);
    const slots: SelectorSlot[] = selector.getScannerSlots();
    const slot = slots.find((s) => s.analyzer.name === this.command.name);

    if (slot === undefined) {
      return undefined;
    }

    if (!isScanner(slot.analyzer)) {
      return undefined;
    }

    const scanner = slot.analyzer;

    switch (scanner.name) {
      case "HybridAnalysis":
        scanner.setAPIKey(this.options.hybridAnalysisAPIKey);
        break;
      case "urlscan.io":
        scanner.setAPIKey(this.options.urlscanAPIKey);
        break;
      case "VirusTotal":
        scanner.setAPIKey(this.options.virusTotalAPIKey);
        break;
      default:
        break;
    }

    if (slot.type in this.scannerMap) {
      const fn = this.scannerMap[slot.type];
      return await fn(scanner, slot.query);
    }

    return undefined;
  }
}
