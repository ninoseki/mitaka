import { Base64 } from "js-base64";

import type { Scanner, Searcher } from "~/types";

export function buildURL(baseURL: string, path: string, params = {}): string {
  const searchParams = new URLSearchParams(params);
  const queryString: string = searchParams.toString();

  if (queryString === "") {
    return `${baseURL}${path}`;
  }
  return `${baseURL}${path}?${queryString}`;
}

export function base64fy(s: string): string {
  return Base64.encode(s).trim();
}

export function getFaviconURL(baseURL: string): string {
  return `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${baseURL}&size=16`;
}

export function extractASNumber(asn: string): string {
  const matches = /\d+$/.exec(asn);
  if (matches && matches[0]) {
    return matches[0];
  }
  return "";
}

export function extractCVENumber(cve: string): string {
  const parts = cve.split("-");
  const numbers = parts.slice(1 - parts.length);
  return numbers.join("-");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSearcher(object: any): object is Searcher {
  return !("setAPIKey" in object);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isScanner(object: any): object is Scanner {
  return "setAPIKey" in object;
}
