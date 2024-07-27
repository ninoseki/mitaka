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
  unicodeToASCII,
} from "ioc-extractor";
import * as v from "valibot";

import { Scanners } from "~/scanner";
import { OptionsSchema } from "~/schemas";
import type { OptionsType, SearchableType } from "~/schemas";
import { All, Searchers } from "~/searcher";
import type {
  ScanFuncWrapper,
  ScannableType,
  Scanner,
  Searcher,
  SearchFuncWrapper,
  SelectorSlot,
} from "~/types";

const defaultOptions = v.parse(OptionsSchema, {});

export class Selector {
  protected input: string;
  protected options: OptionsType;

  protected scanners: Scanner[];
  protected searchers: Searcher[];

  public constructor(input: string, options: OptionsType = defaultOptions) {
    let normalized = options.refang ? refang(input) : input;
    normalized = options.punycode
      ? unicodeToASCII(normalized, {
          ignoreInvalidPunycode: true,
          transitionalProcessing: true,
        })
      : normalized;

    this.input = normalized;
    this.options = options;
    this.searchers = Searchers.filter(
      (s) => !this.options.disabledSearcherNames.includes(s.name),
    );
    this.scanners = Scanners.filter(
      (s) => !this.options.disabledScannerNames.includes(s.name),
    );
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
    if (sha256) {
      return sha256;
    }

    const sha1 = extractSHA1(this.input);
    if (sha1) {
      return sha1;
    }

    const md5 = extractMD5(this.input);
    if (md5) {
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
      searcher.supportedTypes.includes(type),
    );
  }

  public getScannersByType(type: ScannableType): Scanner[] {
    return this.scanners.filter((scanner: Scanner) =>
      scanner.supportedTypes.includes(type),
    );
  }

  private getSearchFuncWrappers(): SearchFuncWrapper[] {
    if (this.input.includes(".")) {
      return [
        { type: "url", func: (this.getURL = this.getURL.bind(this)) },
        { type: "email", func: (this.getEmail = this.getEmail.bind(this)) },
        { type: "domain", func: (this.getDomain = this.getDomain.bind(this)) },
        { type: "ip", func: (this.getIP = this.getIP.bind(this)) },
      ];
    }

    return [
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
    ];
  }

  public getSearcherSlots(): SelectorSlot[] {
    const wrappers = this.getSearchFuncWrappers();

    for (const wrapper of wrappers) {
      const query: string | null = wrapper.func.apply(this);
      if (query) {
        const type = wrapper.type;
        const searchers = this.getSearchersByType(type);
        const slots = searchers.map((analyzer) => {
          return { analyzer, type, query };
        });

        if (searchers.length > 1) {
          // add "all" searcher if there are searchers more than one
          slots.push({ analyzer: new All(), type, query });
        }

        return slots;
      }
    }

    return [];
  }

  private scanFuncWrappers: ScanFuncWrapper[] = [
    { type: "url", func: (this.getURL = this.getURL.bind(this)) },
    { type: "domain", func: (this.getDomain = this.getDomain.bind(this)) },
    { type: "ip", func: (this.getIP = this.getIP.bind(this)) },
  ];

  public getScannerSlots(): SelectorSlot[] {
    for (const wrapper of this.scanFuncWrappers) {
      const type = wrapper.type;

      const query: string | null = wrapper.func.apply(this);
      if (query) {
        const scanners = this.getScannersByType(type);
        return scanners.map((analyzer) => {
          return { analyzer, type, query };
        });
      }
    }

    return [];
  }

  public getSlots(): SelectorSlot[] {
    const searcherSlots = this.getSearcherSlots();
    const scannerSlots = this.getScannerSlots();
    return searcherSlots.concat(scannerSlots);
  }
}
