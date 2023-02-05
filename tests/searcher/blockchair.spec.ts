import { Blockchair } from "@/searcher";

describe("Blockchair", function () {
  const subject = new Blockchair();

  it("should support btc and eth", function () {
    expect(subject.supportedTypes).toEqual(["btc", "eth"]);
  });

  describe("#searchByBTC", function () {
    const btc = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
    it("should return a URL", function () {
      expect(subject.searchByBTC(btc)).toBe(
        `https://blockchair.com/bitcoin/address/${btc}`
      );
    });
  });

  describe("#searchByETH", function () {
    const eth = "0x4966db520b0680fc19df5d7774ca96f42e6abd4f";
    it("should return a URL", function () {
      expect(subject.searchByETH(eth)).toBe(
        `https://blockchair.com/ethereum/address/${eth}`
      );
    });
  });
});
