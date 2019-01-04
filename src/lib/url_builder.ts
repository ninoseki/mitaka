import * as crypto from "crypto-js";
import * as qs from "qs";

export function buildURL(endpoint: string, path: string, params = {}): string {
  const queryString: string = qs.stringify(params);
  if (queryString === "") {
    return `${endpoint}${path}`;
  } else {
    return `${endpoint}${path}?${queryString}`;
  }
}

export function base64fy(s: string): string {
  const wordArray = crypto.enc.Utf8.parse(s);
  return crypto.enc.Base64.stringify(wordArray).trim();
}
