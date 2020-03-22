import { expect } from "chai";
import "mocha";
import { BlockChain } from "../../src/lib/searcher";

describe("Blockchain", function () {
  const subject = new BlockChain();

  it("should support BTC type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["btc"]);
  });

  describe("#searchByBTC", function () {
    it("should return URL", function () {
      expect(
        subject.searchByBTC("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")
      ).to.equal(
        "https://www.blockchain.com/btc/address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
      );
    });
  });
});
