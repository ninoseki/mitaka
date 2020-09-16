import "mocha";

import { expect } from "chai";

import { BlockChain } from "../../src/lib/searcher";

describe("Blockchain", function () {
  const subject = new BlockChain();

  it("should support btc", function () {
    expect(subject.supportedTypes).to.deep.equal(["btc"]);
  });

  describe("#searchByBTC", function () {
    const btc = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
    it("should return a URL", function () {
      expect(subject.searchByBTC(btc)).to.equal(
        `https://www.blockchain.com/btc/address/${btc}`
      );
    });
  });
});
