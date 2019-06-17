export function extractASNumber(asn: string): string {
  const matches = asn.match(/\d+$/);
  if (matches !== null && matches[0]) {
    return matches[0];
  }
  return "";
}
