import { getIOC, IOC } from "ioc-extractor";

import { Censys } from "./censys";
import { DomainBigData } from "./domainbigdata";
import { FindSubDomains } from "./findsubdomains";
import { HybridAnalysis } from "./hybridanalysis";
import { PublicWWW } from "./publicwww";
import { Pulsedive } from "./pulsedive";
import { Scanner, UrlscanScanner, VirusTotalScanner } from "./scanner";
import { Searcher } from "./searcher";
import { SecurityTrails } from "./securitytrails";
import { Shodan } from "./shodan";
import { Urlscan } from "./urlscan";
import { VirusTotal } from "./virustotal";

export interface SearcherResult {
  searcher: Searcher;
  type: string;
  query: string;
}

export interface ScannerResult {
  scanner: Scanner;
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
    new Urlscan(),
    new VirusTotal(),
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
    if (this.ioc.networks.ipv4s !== null) {
      return this.ioc.networks.ipv4s[0];
    }
    return null;
  }

  public getDomain(): string | null {
    if (this.ioc.networks.domains !== null) {
      return this.ioc.networks.domains[0];
    }
    return null;
  }

  public getUrl(): string | null {
    if (this.ioc.networks.urls !== null) {
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

  public getSearchersForText(): Searcher[] {
    return this.searchers.filter((searcher: Searcher) => searcher.supportedTypes.indexOf("text") !== -1);
  }

  public getSearchersForIP(): Searcher[] {
    return this.searchers.filter((searcher: Searcher) => searcher.supportedTypes.indexOf("ip") !== -1);
  }

  public getSearchersForDomain(): Searcher[] {
    return this.searchers.filter((searcher: Searcher) => searcher.supportedTypes.indexOf("domain") !== -1);
  }

  public getSearchersForUrl(): Searcher[] {
    return this.searchers.filter((searcher: Searcher) => searcher.supportedTypes.indexOf("url") !== -1);
  }

  public getSearchersForHash(): Searcher[] {
    return this.searchers.filter((searcher: Searcher) => searcher.supportedTypes.indexOf("hash") !== -1);
  }

  public getScannersByType(type: "ip" | "domain" | "url") {
    return this.scanners.filter((scanner: Scanner) => scanner.supportedTypes.indexOf(type) !== -1);
  }

  public getSearcherResults(): SearcherResult[] {
    let results: SearcherResult[] = [];
    results = this.concat(results, this.makeResults(this.getSearchersForText(), "text", this.input));

    const url = this.getUrl();
    if (url !== null) {
      return this.concat(results, this.makeResults(this.getSearchersForUrl(), "url", url));
    }
    const domain = this.getDomain();
    if (domain !== null) {
      return this.concat(results, this.makeResults(this.getSearchersForDomain(), "domain", domain));
    }
    const ip = this.getIP();
    if (ip !== null) {
      return this.concat(results, this.makeResults(this.getSearchersForIP(), "ip", ip));
    }
    const hash = this.getHash();
    if (hash !== null) {
      return this.concat(results, this.makeResults(this.getSearchersForHash(), "hash", hash));
    }
    return results;
  }

  public getScannerResults(): ScannerResult[] {
    const results: ScannerResult[] = [];
    const types: ScanType[] = [
      { name: "url", value: this.getUrl() },
      { name: "domain", value: this.getDomain() },
      { name: "ip", value: this.getIP() },
    ];
    for (const type of types) {
      if (type.value !== null) {
        const scanners = this.getScannersByType(type.name);
        for (const scanner of scanners) {
          results.push({
            query: type.value,
            scanner,
            type: type.name,
          });
        }
        break;
      }
    }
    return results;
  }

  private concat<T>(target: T[], input: T[] | null): T[] {
    if (input !== null) {
      return target.concat(input);
    }
    return target;
  }

  private makeResults(searchers: Searcher[], type: string, query: string) {
    const results: SearcherResult[] = [];
    for (const s of searchers) {
      results.push(this.makeResult(s, type, query));
    }
    return results;
  }

  private makeResult(searcher: Searcher, type: string, query: string) {
    return { searcher, type, query };
  }
}
