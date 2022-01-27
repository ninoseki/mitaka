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

import { Scanners } from "@/scanner";
import { Searchers } from "@/searcher";
import {
  AnalyzerEntry,
  Options,
  ScannableType,
  Scanner,
  ScannerSlot,
  SearchableType,
  Searcher,
  SelectorSlot,
} from "@/types";

export class Selector {
  protected input: string;
  protected options: Options;

  protected scanners: Scanner[] = Scanners;
  protected searchers: Searcher[] = Searchers;

  public constructor(
    input: string,
    options: Options = { enableIDN: true, strictTLD: true, enableRefang: true }
  ) {
    this.input = options.enableRefang ? refang(input) : input;
    this.options = options;
  }

  public getIP(): string | null {
    return extractIPv4(this.input);
  }

  public getDomain(): string | null {
    return extractDomain(this.input, this.options);
  }

  public getURL(): string | null {
    return extractURL(this.input, this.options);
  }

  public getEmail(): string | null {
    return extractEmail(this.input, this.options);
  }

  public getASN(): string | null {
    return extractASN(this.input);
  }

  public getHash(): string | null {
    const sha256 = extractSHA256(this.input);
    if (sha256 !== null) {
      return sha256;
    }

    const sha1 = extractSHA1(this.input);
    if (sha1 !== null) {
      return sha1;
    }

    const md5 = extractMD5(this.input);
    if (md5 !== null) {
      return md5;
    }

    return null;
  }

  public getCVE(): string | null {
    return extractCVE(this.input);
  }

  public getBTC(): string | null {
    return extractBTC(this.input);
  }

  public getXMR(): string | null {
    return extractXMR(this.input);
  }

  public getGATrackID(): string | null {
    return extractGATrackID(this.input);
  }

  public getGAPubID(): string | null {
    return extractGAPubID(this.input);
  }

  public getETH(): string | null {
    return extractETH(this.input);
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

  public isPossibleNetworkIndicator(): boolean {
    return this.input.includes(".");
  }

  private getSelectorSlots(): SelectorSlot[] {
    let slots: SelectorSlot[] = [];

    if (this.isPossibleNetworkIndicator()) {
      slots = slots.concat([
        { type: "url", func: (this.getURL = this.getURL.bind(this)) },
        { type: "email", func: (this.getEmail = this.getEmail.bind(this)) },
        { type: "domain", func: (this.getDomain = this.getDomain.bind(this)) },
        { type: "ip", func: (this.getIP = this.getIP.bind(this)) },
      ]);
    }

    return slots.concat([
      { type: "asn", func: (this.getASN = this.getASN.bind(this)) },
      { type: "hash", func: (this.getHash = this.getHash.bind(this)) },
      { type: "cve", func: (this.getCVE = this.getCVE.bind(this)) },
      { type: "btc", func: (this.getBTC = this.getBTC.bind(this)) },
      {
        type: "gaTrackID",
        func: (this.getGATrackID = this.getGATrackID.bind(this)),
      },
      { type: "gaPubID", func: (this.getGAPubID = this.getGAPubID.bind(this)) },
      { type: "eth", func: (this.getETH = this.getETH.bind(this)) },
    ]);
  }

  public getSearcherEntries(): AnalyzerEntry[] {
    const entries: AnalyzerEntry[] = [];
    const slots = this.getSelectorSlots();

    for (const slot of slots) {
      const type = slot.type;
      const func = slot.func;

      const result = func.apply(this);
      if (result !== null) {
        console.debug(`Mitaka: ${type} type is selected, value = ${result}.`);
        return this.makeAnalyzerEntries(
          this.getSearchersByType(type),
          type,
          result
        );
      }
    }

    return entries;
  }

  private scannerSlots: ScannerSlot[] = [
    { type: "url", func: (this.getURL = this.getURL.bind(this)) },
    { type: "domain", func: (this.getDomain = this.getDomain.bind(this)) },
    { type: "ip", func: (this.getIP = this.getIP.bind(this)) },
  ];

  public getScannerEntries(): AnalyzerEntry[] {
    const entries: AnalyzerEntry[] = [];

    for (const slot of this.scannerSlots) {
      const type = slot.type;
      const func = slot.func;

      const result = func.apply(this);
      if (result !== null) {
        return this.makeAnalyzerEntries(
          this.getScannersByType(type),
          type,
          result
        );
      }
    }

    return entries;
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
