import { expect } from "chai";
import "mocha";
import { BitcoinAbuse } from "../../src/lib/searcher";

describe("BitcoinAbuse", () => {
  const subject = new BitcoinAbuse();

  it("should support BTC type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["btc"]);
  });

  describe("#searchByBTC", () => {
    it("should return URL", () => {
      expect(
        subject.searchByBTC("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")
      ).to.equal(
        "https://www.bitcoinabuse.com/reports/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
      );
    });
  });
});
