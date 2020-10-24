import {
  extractASN,
  extractBTC,
  extractCVE,
  extractDomain,
  extractEmail,
  extractETH,
  extractGAPubID,
  extractGATrackID,
  extractIPv4,
  extractMD5,
  extractSHA1,
  extractSHA256,
  extractURL,
  extractXMR,
  refang,
} from "ioc-extractor";

import { Scanners } from "./scanner";
import { Searchers } from "./searcher";
import {
  AnalyzerEntry,
  ScannableType,
  Scanner,
  ScannerSlot,
  SearchableType,
  Searcher,
  SelectorSlot,
} from "./types";

export class Selector {
  protected input: string;
  protected enableIDN: boolean;

  protected scanners: Scanner[] = Scanners;
  protected searchers: Searcher[] = Searchers;

  public constructor(input: string, enableIDN = true) {
    this.input = refang(input);
    this.enableIDN = enableIDN;
  }

  public getIP(): string | null {
    return this.getFirstValueFromArray(extractIPv4(this.input));
  }

  public getDomain(): string | null {
    return this.getFirstValueFromArray(
      extractDomain(this.input, this.enableIDN)
    );
  }

  public getURL(): string | null {
    return this.getFirstValueFromArray(extractURL(this.input, this.enableIDN));
  }

  public getEmail(): string | null {
    return this.getFirstValueFromArray(
      extractEmail(this.input, this.enableIDN)
    );
  }

  public getASN(): string | null {
    return this.getFirstValueFromArray(extractASN(this.input));
  }

  public getHash(): string | null {
    let hashes: string[] = [];
    hashes = this.concat(hashes, extractSHA256(this.input));
    hashes = this.concat(hashes, extractSHA1(this.input));
    hashes = this.concat(hashes, extractMD5(this.input));
    if (hashes.length === 0) {
      return null;
    }
    return hashes[0];
  }

  public getCVE(): string | null {
    return this.getFirstValueFromArray(extractCVE(this.input));
  }

  public getBTC(): string | null {
    return this.getFirstValueFromArray(extractBTC(this.input));
  }

  public getXMR(): string | null {
    return this.getFirstValueFromArray(extractXMR(this.input));
  }

  public getGATrackID(): string | null {
    return this.getFirstValueFromArray(extractGATrackID(this.input));
  }

  public getGAPubID(): string | null {
    return this.getFirstValueFromArray(extractGAPubID(this.input));
  }

  public getETH(): string | null {
    return this.getFirstValueFromArray(extractETH(this.input));
  }

  public getSearchersByType(type: SearchableType): Searcher[] {
    return this.searchers.filter((searcher: Searcher) =>
      searcher.supportedTypes.includes(type)
    );
  }

  public getScannersByType(type: ScannableType): Scanner[] {
    return this.scanners.filter((scanner: Scanner) =>
      scanner.supportedTypes.includes(type)
    );
  }

  private selectorSlots: SelectorSlot[] = [
    { type: "url", func: this.getURL = this.getURL.bind(this) },
    { type: "email", func: this.getEmail = this.getEmail.bind(this) },
    { type: "domain", func: this.getDomain = this.getDomain.bind(this) },
    { type: "ip", func: this.getIP = this.getIP.bind(this) },
    { type: "asn", func: this.getASN = this.getASN.bind(this) },
    { type: "hash", func: this.getHash = this.getHash.bind(this) },
    { type: "cve", func: this.getCVE = this.getCVE.bind(this) },
    { type: "btc", func: this.getBTC = this.getBTC.bind(this) },
    {
      type: "gaTrackID",
      func: this.getGATrackID = this.getGATrackID.bind(this),
    },
    { type: "gaPubID", func: this.getGAPubID = this.getGAPubID.bind(this) },
    { type: "eth", func: this.getETH = this.getETH.bind(this) },
  ];

  public getSearcherEntries(): AnalyzerEntry[] {
    const entries: AnalyzerEntry[] = this.makeAnalyzerEntries(
      this.getSearchersByType("text"),
      "text",
      this.input
    );

    for (const slot of this.selectorSlots) {
      const type = slot.type;
      const func = slot.func;

      const result = func.apply(this);
      if (result !== null) {
        return this.concat(
          entries,
          this.makeAnalyzerEntries(this.getSearchersByType(type), type, result)
        );
      }
    }

    return entries;
  }

  private scannerSlots: ScannerSlot[] = [
    { type: "url", func: this.getURL = this.getURL.bind(this) },
    { type: "domain", func: this.getDomain = this.getDomain.bind(this) },
    { type: "ip", func: this.getIP = this.getIP.bind(this) },
  ];

  public getScannerEntries(): AnalyzerEntry[] {
    const entries: AnalyzerEntry[] = [];

    for (const slot of this.scannerSlots) {
      const type = slot.type;
      const func = slot.func;

      const result = func.apply(this);
      if (result !== null) {
        return entries.concat(
          this.makeAnalyzerEntries(this.getScannersByType(type), type, result)
        );
      }
    }

    return entries;
  }

  private getFirstValueFromArray<T>(array: T[] | null): T | null {
    if (array !== null && array[0]) {
      return array[0];
    }
    return null;
  }

  private concat<T>(target: T[], input: T[] | null): T[] {
    if (input !== null) {
      return target.concat(input);
    }
    return target;
  }

  private makeAnalyzerEntries(
    analyzers: Scanner[] | Searcher[],
    type: SearchableType | ScannableType,
    query: string
  ): AnalyzerEntry[] {
    const analyzerEntries: AnalyzerEntry[] = [];
    for (const analyzer of analyzers) {
      analyzerEntries.push(this.makeAnalyzerEntry(analyzer, type, query));
    }
    return analyzerEntries;
  }

  private makeAnalyzerEntry(
    analyzer: Scanner | Searcher,
    type: SearchableType | ScannableType,
    query: string
  ): AnalyzerEntry {
    return { analyzer, type, query };
  }
}
