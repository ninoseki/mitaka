export function extractASNumber(asn: string): string {
  const matches = /\d+$/.exec(asn);
  if (matches !== null && matches[0]) {
    return matches[0];
  }
  return "";
}
