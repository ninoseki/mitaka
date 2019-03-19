import { getIOC, IOC } from "ioc-extractor";
import { ScannableType, Scanner, Scanners } from "./scanner";
import { SearchableType, Searcher, Searchers } from "./searcher";

export interface AnalyzerEntry {
  analyzer: Scanner | Searcher;
  type: SearchableType | ScannableType;
  query: string;
}

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
    return this.getFirstValueFromArray(this.ioc.networks.ipv4s);
  }

  public getDomain(): string | null {
    return this.getFirstValueFromArray(this.ioc.networks.domains);
  }

  public getURL(): string | null {
    return this.getFirstValueFromArray(this.ioc.networks.urls);
  }

  public getEmail(): string | null {
    return this.getFirstValueFromArray(this.ioc.networks.emails);
  }

  public getASN(): string | null {
    return this.getFirstValueFromArray(this.ioc.networks.asns);
  }

  public getHash(): string | null {
    let hashes: string[] = [];
    hashes = this.concat(hashes, this.ioc.hashes.sha256s);
    hashes = this.concat(hashes, this.ioc.hashes.sha1s);
    hashes = this.concat(hashes, this.ioc.hashes.md5s);
    if (hashes.length === 0) {
      return null;
    }
    return hashes[0];
  }

  public getCVE(): string | null {
    return this.getFirstValueFromArray(this.ioc.utilities.cves);
  }

  public getBTC(): string | null {
    return this.getFirstValueFromArray(this.ioc.cryptocurrencies.btcs);
  }

  public getXMR(): string | null {
    return this.getFirstValueFromArray(this.ioc.cryptocurrencies.xmrs);
  }

  public getGATrackID(): string | null {
    return this.getFirstValueFromArray(this.ioc.trackers.gaTrackIDs);
  }

  public getGAPubID(): string | null {
    return this.getFirstValueFromArray(this.ioc.trackers.gaPubIDs);
  }

  public getSearchersByType(type: SearchableType) {
    return this.searchers.filter(
      (searcher: Searcher) => searcher.supportedTypes.indexOf(type) !== -1
    );
  }

  public getScannersByType(type: ScannableType) {
    return this.scanners.filter(
      (scanner: Scanner) => scanner.supportedTypes.indexOf(type) !== -1
    );
  }

  public getSearcherEntries(): AnalyzerEntry[] {
    let entries: AnalyzerEntry[] = [];
    entries = this.concat(
      entries,
      this.makeAnalyzerEntries(
        this.getSearchersByType("text"),
        "text",
        this.input
      )
    );

    const asn = this.getASN();
    if (asn !== null) {
      return this.concat(
        entries,
        this.makeAnalyzerEntries(this.getSearchersByType("asn"), "asn", asn)
      );
    }
    const email = this.getEmail();
    if (email !== null) {
      return this.concat(
        entries,
        this.makeAnalyzerEntries(
          this.getSearchersByType("email"),
          "email",
          email
        )
      );
    }
    const url = this.getURL();
    if (url !== null) {
      return this.concat(
        entries,
        this.makeAnalyzerEntries(this.getSearchersByType("url"), "url", url)
      );
    }
    const domain = this.getDomain();
    if (domain !== null) {
      return this.concat(
        entries,
        this.makeAnalyzerEntries(
          this.getSearchersByType("domain"),
          "domain",
          domain
        )
      );
    }
    const ip = this.getIP();
    if (ip !== null) {
      return this.concat(
        entries,
        this.makeAnalyzerEntries(this.getSearchersByType("ip"), "ip", ip)
      );
    }
    const hash = this.getHash();
    if (hash !== null) {
      return this.concat(
        entries,
        this.makeAnalyzerEntries(this.getSearchersByType("hash"), "hash", hash)
      );
    }
    const cve = this.getCVE();
    if (cve !== null) {
      return this.concat(
        entries,
        this.makeAnalyzerEntries(this.getSearchersByType("cve"), "cve", cve)
      );
    }
    const btc = this.getBTC();
    if (btc !== null) {
      return this.concat(
        entries,
        this.makeAnalyzerEntries(this.getSearchersByType("btc"), "btc", btc)
      );
    }
    const xmr = this.getXMR();
    if (xmr !== null) {
      return this.concat(
        entries,
        this.makeAnalyzerEntries(this.getSearchersByType("xmr"), "xmr", xmr)
      );
    }
    const gaTrackID = this.getGATrackID();
    if (gaTrackID !== null) {
      return this.concat(
        entries,
        this.makeAnalyzerEntries(
          this.getSearchersByType("gaTrackID"),
          "gaTrackID",
          gaTrackID
        )
      );
    }
    const gaPubID = this.getGAPubID();
    if (gaPubID !== null) {
      return this.concat(
        entries,
        this.makeAnalyzerEntries(
          this.getSearchersByType("gaPubID"),
          "gaPubID",
          gaPubID
        )
      );
    }
    return entries;
  }

  public getScannerEntries(): AnalyzerEntry[] {
    const analyzerEntries: AnalyzerEntry[] = [];

    const url = this.getURL();
    if (url !== null) {
      return this.makeAnalyzerEntries(
        this.getScannersByType("url"),
        "url",
        url
      );
    }
    const domain = this.getDomain();
    if (domain !== null) {
      return this.makeAnalyzerEntries(
        this.getScannersByType("domain"),
        "domain",
        domain
      );
    }
    const ip = this.getIP();
    if (ip !== null) {
      return this.makeAnalyzerEntries(this.getScannersByType("ip"), "ip", ip);
    }
    return analyzerEntries;
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
  ) {
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
  ) {
    return { analyzer, type, query };
  }
}
