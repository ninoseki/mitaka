import "mocha";

import { expect } from "chai";

import { BlockCypher } from "@/searcher";

describe("BlockCypher", function () {
  const subject = new BlockCypher();

  it("should support btc", function () {
    expect(subject.supportedTypes).to.deep.equal(["btc"]);
  });

  describe("#searchByBTC", function () {
    const btc = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

    it("should return a URL", function () {
      expect(subject.searchByBTC(btc)).to.equal(
        `https://live.blockcypher.com/btc/address/${btc}/`
      );
    });
  });
});
