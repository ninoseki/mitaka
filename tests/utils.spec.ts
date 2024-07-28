import { truncate } from "~/utils";

test.each([
  ["a".repeat(32), "a".repeat(32)],
  ["a".repeat(33), "a".repeat(29) + "..."],
])(".truncate(%s, %s)", (s: string, expected: string) => {
  expect(truncate(s)).toBe(expected);
});
