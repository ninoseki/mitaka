import { truncate } from "~/utils";

describe("truncate", function () {
  it("truncates a text", function () {
    expect(truncate("foo")).toBe("foo");
    expect(truncate("12345678912")).toBe("12345678912");
    expect(truncate("123456789123")).toBe("123456789123");

    expect(truncate("1234567891234", 12)).toBe("123456789...");
    expect(truncate("1234567891234", 12).length).toBe(12);
  });
});
