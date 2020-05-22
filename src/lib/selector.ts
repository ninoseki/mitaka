import { getIOC, IOC } from "ioc-extractor";

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
  protected ioc: IOC;

  protected scanners: Scanner[] = Scanners;
  protected searchers: Searcher[] = Searchers;

  public constructor(input: string) {
    this.input = input;
    this.ioc = getIOC(input);
  }

  public getIP(): string | null {
    return this.getFirstValueFromArray(this.ioc.ipv4s);
  }

  public getDomain(): string | null {
    return this.getFirstValueFromArray(this.ioc.domains);
  }

  public getURL(): string | null {
    return this.getFirstValueFromArray(this.ioc.urls);
  }

  public getEmail(): string | null {
    return this.getFirstValueFromArray(this.ioc.emails);
  }

  public getASN(): string | null {
    return this.getFirstValueFromArray(this.ioc.asns);
  }

  public getHash(): string | null {
    let hashes: string[] = [];
    hashes = this.concat(hashes, this.ioc.sha256s);
    hashes = this.concat(hashes, this.ioc.sha1s);
    hashes = this.concat(hashes, this.ioc.md5s);
    if (hashes.length === 0) {
      return null;
    }
    return hashes[0];
  }

  public getCVE(): string | null {
    return this.getFirstValueFromArray(this.ioc.cves);
  }

  public getBTC(): string | null {
    return this.getFirstValueFromArray(this.ioc.btcs);
  }

  public getXMR(): string | null {
    return this.getFirstValueFromArray(this.ioc.xmrs);
  }

  public getGATrackID(): string | null {
    return this.getFirstValueFromArray(this.ioc.gaTrackIDs);
  }

  public getGAPubID(): string | null {
    return this.getFirstValueFromArray(this.ioc.gaPubIDs);
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
    { type: "url", func: this.getURL },
    { type: "email", func: this.getEmail },
    { type: "domain", func: this.getDomain },
    { type: "ip", func: this.getIP },
    { type: "asn", func: this.getASN },
    { type: "hash", func: this.getHash },
    { type: "cve", func: this.getCVE },
    { type: "btc", func: this.getBTC },
    { type: "gaTrackID", func: this.getGATrackID },
    { type: "gaPubID", func: this.getGAPubID },
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
    { type: "url", func: this.getURL },
    { type: "domain", func: this.getDomain },
    { type: "ip", func: this.getIP },
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
