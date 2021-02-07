export function truncate(text: string, maxLength = 32): string {
  if (text.length <= maxLength) {
    return text;
  }

  const dots = "...";
  const length = maxLength - dots.length;
  const truncated = text.slice(0, length);

  return truncated + dots;
}
