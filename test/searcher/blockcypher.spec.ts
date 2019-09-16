import { expect } from "chai";
import "mocha";
import { BlockCypher } from "../../src/lib/searcher";

describe("BlockCypher", () => {
  const subject = new BlockCypher();

  it("should support BTC type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["btc"]);
  });

  describe("#searchByBTC", () => {
    it("should return URL", () => {
      expect(
        subject.searchByBTC("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")
      ).to.equal(
        "https://live.blockcypher.com/btc/address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa/"
      );
    });
  });
});
