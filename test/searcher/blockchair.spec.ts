import "mocha";

import { expect } from "chai";

import { Blockchair } from "../../src/lib/searcher";

describe("Blockchair", function () {
  const subject = new Blockchair();

  it("should support BTC and ETH ", function () {
    expect(subject.supportedTypes).to.deep.equal(["btc", "eth"]);
  });

  describe("#searchByBTC", function () {
    it("should return URL", function () {
      expect(
        subject.searchByBTC("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")
      ).to.equal(
        "https://blockchair.com/bitcoin/address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
      );
    });
  });

  describe("#searchByETH", function () {
    it("should return URL", function () {
      expect(
        subject.searchByETH("0x4966db520b0680fc19df5d7774ca96f42e6abd4f")
      ).to.equal(
        "https://blockchair.com/ethereum/address/0x4966db520b0680fc19df5d7774ca96f42e6abd4f"
      );
    });
  });
});
