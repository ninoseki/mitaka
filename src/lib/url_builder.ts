import crypto from "crypto-js";
import qs from "qs";

export function buildURL(baseURL: string, path: string, params = {}): string {
  const queryString: string = qs.stringify(params);
  if (queryString === "") {
    return `${baseURL}${path}`;
  } else {
    return `${baseURL}${path}?${queryString}`;
  }
}

export function base64fy(s: string): string {
  const wordArray = crypto.enc.Utf8.parse(s);
  return crypto.enc.Base64.stringify(wordArray).trim();
}
