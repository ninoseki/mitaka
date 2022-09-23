import { Base64 } from "js-base64";
import qs from "qs";

export function buildURL(baseURL: string, path: string, params = {}): string {
  const queryString: string = qs.stringify(params);
  if (queryString === "") {
    return `${baseURL}${path}`;
  }
  return `${baseURL}${path}?${queryString}`;
}

export function base64fy(s: string): string {
  return Base64.encode(s).trim();
}
