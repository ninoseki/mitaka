import { err, ok, Result } from "neverthrow";

import type { OptionsType } from "~/schemas";
import { Selector } from "~/selector";
import type {
  Command,
  Scanner,
  ScannerMap,
  Searcher,
  SearcherMap,
  SelectorSlot,
} from "~/types";
import { isScanner, isSearcher } from "~/utils";

export class CommandRunner {
  public command: Command;
  protected options: OptionsType;

  public constructor(command: Command, options: OptionsType) {
    this.command = command;
    this.options = options;
  }

  private searcherMap: SearcherMap = {
    ip: (searcher: Searcher, query: string): Result<string, string> => {
      return searcher.searchByIP(query);
    },
    domain: (searcher: Searcher, query: string): Result<string, string> => {
      return searcher.searchByDomain(query);
    },
    url: (searcher: Searcher, query: string): Result<string, string> => {
      return searcher.searchByURL(query);
    },
    asn: (searcher: Searcher, query: string): Result<string, string> => {
      return searcher.searchByASN(query);
    },
    email: (searcher: Searcher, query: string): Result<string, string> => {
      return searcher.searchByEmail(query);
    },
    hash: (searcher: Searcher, query: string): Result<string, string> => {
      return searcher.searchByHash(query);
    },
    cve: (searcher: Searcher, query: string): Result<string, string> => {
      return searcher.searchByCVE(query);
    },
    btc: (searcher: Searcher, query: string): Result<string, string> => {
      return searcher.searchByBTC(query);
    },
    gaPubID: (searcher: Searcher, query: string): Result<string, string> => {
      return searcher.searchByGAPubID(query);
    },
    gaTrackID: (searcher: Searcher, query: string): Result<string, string> => {
      return searcher.searchByGATrackID(query);
    },
    eth: (searcher: Searcher, query: string): Result<string, string> => {
      return searcher.searchByETH(query);
    },
  };

  public search(): Result<string, string> {
    const getSlot = (): Result<SelectorSlot, string> => {
      const selector: Selector = new Selector(this.command.query, this.options);
      const slots: SelectorSlot[] = selector.getSearcherSlots();
      const slot = slots.find((s) => s.analyzer.name === this.command.name);
      if (!slot) {
        return err(`Slot for ${this.command.name} is missing`);
      }

      if (!isSearcher(slot.analyzer)) {
        return err(`${slot.analyzer.name} is not a searcher`);
      }

      return ok(slot);
    };

    const search = (slot: SelectorSlot) => {
      const searcher = slot.analyzer as Searcher;
      if (this.command.type in this.searcherMap) {
        const fn = this.searcherMap[this.command.type];
        return fn(searcher, slot.query);
      }
      return err("Something goes wrong");
    };

    return getSlot().andThen(search);
  }

  public searchAll(): Result<string, string>[] {
    const selector: Selector = new Selector(this.command.query, this.options);
    const slots: SelectorSlot[] = selector.getSearcherSlots();
    const slotsWithoutAll = slots.filter(
      (slot) => slot.analyzer.name !== "all",
    );
    return slotsWithoutAll.map((slot) => {
      const searcher = slot.analyzer as Searcher;
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
      return scanner.scanByIP(query);
    },
    domain: async (
      scanner: Scanner,
      query: string,
    ): Promise<Result<string, string>> => {
      return scanner.scanByDomain(query);
    },
    url: async (
      scanner: Scanner,
      query: string,
    ): Promise<Result<string, string>> => {
      return scanner.scanByURL(query);
    },
  };

  public async scan(): Promise<Result<string, string>> {
    const getSlot = () => {
      const selector: Selector = new Selector(this.command.query);
      const slots: SelectorSlot[] = selector.getScannerSlots();
      const slot = slots.find((s) => s.analyzer.name === this.command.name);

      if (!slot) {
        return err(`Slot for ${this.command.name} is missing`);
      }

      if (!isScanner(slot.analyzer)) {
        return err(`${slot.analyzer.name} is not a scanner`);
      }

      return ok(slot);
    };

    const scan = async (slot: SelectorSlot) => {
      const scanner = slot.analyzer as Scanner;

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

      return err("Something goes wrong");
    };

    const result = await getSlot().asyncMap(scan);

    if (result.isErr()) {
      return err(result.error);
    }
    return result.value;
  }
}
