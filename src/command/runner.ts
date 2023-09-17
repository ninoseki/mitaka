import { Selector } from "~/selector";
import type {
  Command,
  Options,
  Scanner,
  ScannerMap,
  Searcher,
  SearcherMap,
  SelectorSlot,
} from "~/types";
import { isScanner, isSearcher } from "~/utils";
import { ok, err, Result } from "neverthrow";

export class CommandRunner {
  public command: Command;
  protected options: Options;

  public constructor(command: Command, options: Options) {
    this.command = command;
    this.options = options;
  }

  private searcherMap: SearcherMap = {
    ip: (searcher: Searcher, query: string): Result<string, string> => {
      if (searcher.searchByIP) {
        return ok(searcher.searchByIP(query));
      }
      return err(`${searcher.name} does not support IP`);
    },
    domain: (searcher: Searcher, query: string): Result<string, string> => {
      if (searcher.searchByDomain) {
        return ok(searcher.searchByDomain(query));
      }
      return err(`${searcher.name} does not support domain`);
    },
    url: (searcher: Searcher, query: string): Result<string, string> => {
      if (searcher.searchByURL) {
        return ok(searcher.searchByURL(query));
      }
      return err(`${searcher.name} does not support URL`);
    },
    asn: (searcher: Searcher, query: string): Result<string, string> => {
      if (searcher.searchByASN) {
        return ok(searcher.searchByASN(query));
      }
      return err(`${searcher.name} does not support ASN`);
    },
    email: (searcher: Searcher, query: string): Result<string, string> => {
      if (searcher.searchByEmail) {
        return ok(searcher.searchByEmail(query));
      }
      return err(`${searcher.name} does not support email`);
    },
    hash: (searcher: Searcher, query: string): Result<string, string> => {
      if (searcher.searchByHash) {
        const result = searcher.searchByHash(query);
        if (typeof result === "string") {
          return ok(result);
        }
        return result;
      }
      return err(`${searcher.name} does not support hash`);
    },
    cve: (searcher: Searcher, query: string): Result<string, string> => {
      if (searcher.searchByCVE) {
        return ok(searcher.searchByCVE(query));
      }
      return err(`${searcher.name} does not support CVE`);
    },
    btc: (searcher: Searcher, query: string): Result<string, string> => {
      if (searcher.searchByBTC) {
        return ok(searcher.searchByBTC(query));
      }
      return err(`${searcher.name} does not support BTC`);
    },
    gaPubID: (searcher: Searcher, query: string): Result<string, string> => {
      if (searcher.searchByGAPubID) {
        return ok(searcher.searchByGAPubID(query));
      }
      return err(`${searcher.name} does not support GA pub ID`);
    },
    gaTrackID: (searcher: Searcher, query: string): Result<string, string> => {
      if (searcher.searchByGATrackID) {
        return ok(searcher.searchByGATrackID(query));
      }
      return err(`${searcher.name} does not support GA track ID`);
    },
    eth: (searcher: Searcher, query: string): Result<string, string> => {
      if (searcher.searchByETH) {
        return ok(searcher.searchByETH(query));
      }
      return err(`${searcher.name} does not support ETH`);
    },
  };

  public search(): Result<string, string> {
    const selector: Selector = new Selector(this.command.query, this.options);
    const slots: SelectorSlot[] = selector.getSearcherSlots();
    const slot = slots.find((s) => s.analyzer.name === this.command.name);

    if (slot === undefined) {
      return err(`Slot for ${this.command.name} is missing`);
    }

    if (!isSearcher(slot.analyzer)) {
      return err(`${slot.analyzer.name} is not a searcher`);
    }

    const searcher = slot.analyzer;
    if (this.command.type in this.searcherMap) {
      const fn = this.searcherMap[this.command.type];
      return fn(searcher, slot.query);
    }

    return err("Something went wrong");
  }

  public searchAll(): Result<string, string>[] {
    const selector: Selector = new Selector(this.command.query, this.options);
    const slots: SelectorSlot[] = selector.getSearcherSlots();

    return slots.map((slot) => {
      const searcher = slot.analyzer;
      if (this.command.type in this.searcherMap) {
        const fn = this.searcherMap[this.command.type];
        return fn(searcher, slot.query);
      }
      return err(`${this.command.type} is not supported`);
    });
  }

  private scannerMap: ScannerMap = {
    ip: async (
      scanner: Scanner,
      query: string,
    ): Promise<Result<string, string>> => {
      if (scanner.scanByIP) {
        return scanner.scanByIP(query);
      }
      return err(`${scanner.name} does not support IP`);
    },
    domain: async (
      scanner: Scanner,
      query: string,
    ): Promise<Result<string, string>> => {
      if (scanner.scanByDomain) {
        return scanner.scanByDomain(query);
      }
      return err(`${scanner.name} does not support domain`);
    },
    url: async (
      scanner: Scanner,
      query: string,
    ): Promise<Result<string, string>> => {
      if (scanner.scanByURL) {
        return scanner.scanByURL(query);
      }
      return err(`${scanner.name} does not support URL`);
    },
  };

  public async scan(): Promise<Result<string, string>> {
    const selector: Selector = new Selector(this.command.query);
    const slots: SelectorSlot[] = selector.getScannerSlots();
    const slot = slots.find((s) => s.analyzer.name === this.command.name);

    if (slot === undefined) {
      return err(`Slot for ${this.command.name} is missing`);
    }

    if (!isScanner(slot.analyzer)) {
      return err(`${slot.analyzer.name} is not a scanner`);
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

    return err("Something went wrong");
  }
}
