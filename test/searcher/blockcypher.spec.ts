import { expect } from "chai";
import "mocha";
import { BlockCypher } from "../../src/lib/searcher";

describe("BlockCypher", function () {
  const subject = new BlockCypher();

  it("should support BTC type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["btc"]);
  });

  describe("#searchByBTC", function () {
    it("should return URL", function () {
      expect(
        subject.searchByBTC("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")
      ).to.equal(
        "https://live.blockcypher.com/btc/address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa/"
      );
    });
  });
});
