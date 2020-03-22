import { expect } from "chai";
import "mocha";
import { BitcoinAbuse } from "../../src/lib/searcher";

describe("BitcoinAbuse", function () {
  const subject = new BitcoinAbuse();

  it("should support BTC type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["btc"]);
  });

  describe("#searchByBTC", function () {
    it("should return URL", function () {
      expect(
        subject.searchByBTC("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")
      ).to.equal(
        "https://www.bitcoinabuse.com/reports/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
      );
    });
  });
});
