import { getIOC, IOC } from "ioc-extractor";
import { Scanner, Scanners } from "./scanner";
import { Searcher, Searchers } from "./searcher";

export interface AnalyzerEntry {
  analyzer: Scanner | Searcher;
  type: string;
  query: string;
}

export class Selector {
  protected input: string;
  protected ioc: IOC;

  protected scanners: Scanner[] = Scanners;
  protected searchers: Searcher[] = Searchers;

  constructor(input: string) {
    this.input = input;
    this.ioc = getIOC(input);
  }

  public getIP(): string | null {
    if (this.ioc.networks.ipv4s !== null && this.ioc.networks.ipv4s[0]) {
      return this.ioc.networks.ipv4s[0];
    }
    return null;
  }

  public getDomain(): string | null {
    if (this.ioc.networks.domains !== null && this.ioc.networks.domains[0]) {
      return this.ioc.networks.domains[0];
    }
    return null;
  }

  public getURL(): string | null {
    if (this.ioc.networks.urls !== null && this.ioc.networks.urls[0]) {
      return this.ioc.networks.urls[0];
    }
    return null;
  }

  public getEmail(): string | null {
    if (this.ioc.networks.emails !== null && this.ioc.networks.emails[0]) {
      return this.ioc.networks.emails[0];
    }
    return null;
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
    if (this.ioc.utilities.cves !== null && this.ioc.utilities.cves[0]) {
      return this.ioc.utilities.cves[0]
    }
    return null;
  }

  public getSearchersByType(type: "text" | "ip" | "domain" | "url" | "email" | "hash" | "cve") {
    return this.searchers.filter((searcher: Searcher) => searcher.supportedTypes.indexOf(type) !== -1);
  }

  public getScannersByType(type: "ip" | "domain" | "url") {
    return this.scanners.filter((scanner: Scanner) => scanner.supportedTypes.indexOf(type) !== -1);
  }

  public getSearcherEntries(): AnalyzerEntry[] {
    let entries: AnalyzerEntry[] = [];
    entries = this.concat(entries, this.makeAnalyzerEntries(this.getSearchersByType("text"), "text", this.input));

    const email = this.getEmail();
    if (email !== null) {
      return this.concat(entries, this.makeAnalyzerEntries(this.getSearchersByType("email"), "email", email));
    }
    const url = this.getURL();
    if (url !== null) {
      return this.concat(entries, this.makeAnalyzerEntries(this.getSearchersByType("url"), "url", url));
    }
    const domain = this.getDomain();
    if (domain !== null) {
      return this.concat(entries, this.makeAnalyzerEntries(this.getSearchersByType("domain"), "domain", domain));
    }
    const ip = this.getIP();
    if (ip !== null) {
      return this.concat(entries, this.makeAnalyzerEntries(this.getSearchersByType("ip"), "ip", ip));
    }
    const hash = this.getHash();
    if (hash !== null) {
      return this.concat(entries, this.makeAnalyzerEntries(this.getSearchersByType("hash"), "hash", hash));
    }
    const cve = this.getCVE();
    if (cve !== null) {
      return this.concat(entries, this.makeAnalyzerEntries(this.getSearchersByType("cve"), "cve", cve));
    }
    return entries;
  }

  public getScannerEntries(): AnalyzerEntry[] {
    const analyzerEntries: AnalyzerEntry[] = [];

    const url = this.getURL();
    if (url !== null) {
      return this.makeAnalyzerEntries(this.getScannersByType("url"), "url", url);
    }
    const domain = this.getDomain();
    if (domain !== null) {
      return this.makeAnalyzerEntries(this.getScannersByType("domain"), "domain", domain);
    }
    const ip = this.getIP();
    if (ip !== null) {
      return this.makeAnalyzerEntries(this.getScannersByType("ip"), "ip", ip);
    }
    return analyzerEntries;
  }

  private concat<T>(target: T[], input: T[] | null): T[] {
    if (input !== null) {
      return target.concat(input);
    }
    return target;
  }

  private makeAnalyzerEntries(analyzers: Scanner[] | Searcher[], type: string, query: string) {
    const analyzerEntries: AnalyzerEntry[] = [];
    for (const analyzer of analyzers) {
      analyzerEntries.push(this.makeAnalyzerEntry(analyzer, type, query));
    }
    return analyzerEntries;
  }

  private makeAnalyzerEntry(analyzer: Scanner | Searcher, type: string, query: string) {
    return { analyzer, type, query };
  }
}
