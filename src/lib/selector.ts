import { getIOC, IOC } from "ioc-extractor";
import { Scanner, UrlscanScanner, VirusTotalScanner } from "./scanner";
import {
  Censys,
  DomainBigData,
  FindSubDomains,
  HybridAnalysis,
  PublicWWW,
  Pulsedive,
  Searcher,
  SecurityTrails,
  Shodan,
  ThreatCrowd,
  Urlscan,
  VirusTotal,
  XForceExchange,
} from "./searcher";

export interface AnalyzerEntry {
  analyzer: Scanner | Searcher;
  type: string;
  query: string;
}

interface ScanType {
  name: "ip" | "domain" | "url";
  value: string | null;
}

export class Selector {
  protected input: string;
  protected ioc: IOC;

  protected searchers: Searcher[] = [
    new Censys(),
    new DomainBigData(),
    new FindSubDomains(),
    new HybridAnalysis(),
    new PublicWWW(),
    new Pulsedive(),
    new SecurityTrails(),
    new Shodan(),
    new ThreatCrowd(),
    new Urlscan(),
    new VirusTotal(),
    new XForceExchange(),
  ];

  protected scanners: Scanner[] = [
    new UrlscanScanner(),
    new VirusTotalScanner(),
  ];

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

  public getUrl(): string | null {
    if (this.ioc.networks.urls !== null && this.ioc.networks.urls[0]) {
      return this.ioc.networks.urls[0];
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

  public getSearchersByType(type: "text" | "ip" | "domain" | "url" | "hash") {
    return this.searchers.filter((searcher: Searcher) => searcher.supportedTypes.indexOf(type) !== -1);
  }

  public getScannersByType(type: "ip" | "domain" | "url") {
    return this.scanners.filter((scanner: Scanner) => scanner.supportedTypes.indexOf(type) !== -1);
  }

  public getSearcherEntries(): AnalyzerEntry[] {
    let entries: AnalyzerEntry[] = [];
    entries = this.concat(entries, this.makeAnalyzerEntries(this.getSearchersByType("text"), "text", this.input));

    const url = this.getUrl();
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
    return entries;
  }

  public getScannerEntries(): AnalyzerEntry[] {
    const analyzerEntries: AnalyzerEntry[] = [];

    const url = this.getUrl();
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
