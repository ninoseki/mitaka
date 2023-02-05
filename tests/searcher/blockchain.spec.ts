import { BlockChain } from "@/searcher";

describe("Blockchain", function () {
  const subject = new BlockChain();

  it("should support btc", function () {
    expect(subject.supportedTypes).toEqual(["btc"]);
  });

  describe("#searchByBTC", function () {
    const btc = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
    it("should return a URL", function () {
      expect(subject.searchByBTC(btc)).toBe(
        `https://www.blockchain.com/btc/address/${btc}`
      );
    });
  });
});
