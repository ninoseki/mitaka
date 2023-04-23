import { BitcoinAbuse } from "~/searcher";

describe("BitcoinAbuse", function () {
  const subject = new BitcoinAbuse();

  it("should support btc", function () {
    expect(subject.supportedTypes).toEqual(["btc"]);
  });

  describe("#searchByBTC", function () {
    const btc = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
    it("should return a URL", function () {
      expect(subject.searchByBTC(btc)).toBe(
        `https://www.bitcoinabuse.com/reports/${btc}`
      );
    });
  });
});
