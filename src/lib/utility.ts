export function extractASNumber(asn: string): string {
  const matches = /\d+$/.exec(asn);
  if (matches !== null && matches[0]) {
    return matches[0];
  }
  return "";
}

export function extractCVENumber(cve: string): string {
  const parts = cve.split("-");
  const numbers = parts.slice(1 - parts.length);
  return numbers.join("-");
}
