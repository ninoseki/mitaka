import { getIOC, IOC } from 'ioc-extractor';

import { Censys } from './censys';
import { PublicWWW } from './publicwww';
import { Searcher } from './searcher';
import { Shodan } from './shodan';
import { Urlscan } from './urlscan';
import { VirusTotal } from './virustotal';

export interface SearcherResult {
  searcher: Searcher;
  type: string;
  query: string;
}

export class Selector {
  protected input: string;
  protected ioc: IOC;

  protected searchers: Searcher[] = [
    new Censys(),
    new PublicWWW(),
    new Shodan(),
    new Urlscan('test'),
    new VirusTotal(),
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
    hashes = this.concat(hashes, this.ioc.hashes.md5s);
    hashes = this.concat(hashes, this.ioc.hashes.sha1s);
    hashes = this.concat(hashes, this.ioc.hashes.sha256s);
    hashes = this.concat(hashes, this.ioc.hashes.sha512s);
    if (hashes.length === 0) {
      return null;
    }
    return hashes[0];
  }

  public getSearchersForRaw(): Searcher[] {
    return this.searchers.filter((searcher: Searcher) => searcher.supportedTypes.indexOf('raw') !== -1);
  }

  public getSearchersForIP(): Searcher[] {
    return this.searchers.filter((searcher: Searcher) => searcher.supportedTypes.indexOf('ip') !== -1);
  }

  public getSearchersForDomain(): Searcher[] {
    return this.searchers.filter((searcher: Searcher) => searcher.supportedTypes.indexOf('domain') !== -1);
  }

  public getSearchersForUrl(): Searcher[] {
    return this.searchers.filter((searcher: Searcher) => searcher.supportedTypes.indexOf('url') !== -1);
  }

  public getSearchersForHash(): Searcher[] {
    return this.searchers.filter((searcher: Searcher) => searcher.supportedTypes.indexOf('hash') !== -1);
  }

  public getSearcherResults(): SearcherResult[] {
    let results: SearcherResult[] = [];
    results = this.concat(results, this.makeResults(this.getSearchersForRaw(), 'raw', this.input));

    const url = this.getUrl();
    if (url !== null) {
      return this.concat(results, this.makeResults(this.getSearchersForUrl(), 'url', url));
    }
    const domain = this.getDomain();
    if (domain !== null) {
      return this.concat(results, this.makeResults(this.getSearchersForDomain(), 'domain', domain));
    }
    const ip = this.getIP();
    if (ip !== null) {
      return this.concat(results, this.makeResults(this.getSearchersForIP(), 'ip', ip));
    }
    const hash = this.getHash();
    if (hash !== null) {
      return this.concat(results, this.makeResults(this.getSearchersForHash(), 'hash', hash));
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
