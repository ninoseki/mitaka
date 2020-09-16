import "mocha";

import { expect } from "chai";

import { BitcoinWhosWho } from "../../src/lib/searcher";

describe("BitcoinAbuse", function () {
  const subject = new BitcoinWhosWho();

  it("should support btc", function () {
    expect(subject.supportedTypes).to.deep.equal(["btc"]);
  });

  describe("#searchByBTC", function () {
    const btc = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
    it("should return a URL", function () {
      expect(subject.searchByBTC(btc)).to.equal(
        `https://bitcoinwhoswho.com/address/${btc}`
      );
    });
  });
});
