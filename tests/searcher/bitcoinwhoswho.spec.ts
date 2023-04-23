import { BitcoinWhosWho } from "~/searcher";

describe("BitcoinAbuse", function () {
  const subject = new BitcoinWhosWho();

  it("should support btc", function () {
    expect(subject.supportedTypes).toEqual(["btc"]);
  });

  describe("#searchByBTC", function () {
    const btc = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
    it("should return a URL", function () {
      expect(subject.searchByBTC(btc)).toBe(
        `https://bitcoinwhoswho.com/address/${btc}`
      );
    });
  });
});
