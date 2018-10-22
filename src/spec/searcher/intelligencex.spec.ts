import { expect } from "chai";
import "mocha";
import { IntelligenceX } from "../../lib/searcher";

describe("Intelligence X", () => {
  const subject = new IntelligenceX();
  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("ip")).not.equal(-1);
      expect(subject.searchByIP("1.1.1.1")).to.equal("https://intelx.io/?s=1.1.1.1");
    });
  });
  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("domain")).not.equal(-1);
      expect(subject.searchByIP("github.com")).to.equal("https://intelx.io/?s=github.com");
    });
  });
  describe("#searchByURL", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("url")).not.equal(-1);
      expect(subject.searchByIP("https://github.com")).to.equal("https://intelx.io/?s=https://github.com");
    });
  });
  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("email")).not.equal(-1);
      expect(subject.searchByIP("test@test.com")).to.equal("https://intelx.io/?s=test@test.com");
    });
  });
  describe("#searchByBTC", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("btc")).not.equal(-1);
      expect(subject.searchByIP("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")).to.equal("https://intelx.io/?s=1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
    });
  });
});
