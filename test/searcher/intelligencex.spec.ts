import { expect } from "chai";
import "mocha";
import { IntelligenceX } from "../../src/lib/searcher";

describe("Intelligence X", () => {
  const subject = new IntelligenceX();

  it("should support IP, Domain, URL, Email & BTC type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "url",
      "email",
      "btc",
    ]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://intelx.io/?s=1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://intelx.io/?s=github.com"
      );
    });
  });

  describe("#searchByURL", () => {
    it("should return URL", () => {
      expect(subject.searchByURL("https://github.com")).to.equal(
        "https://intelx.io/?s=https%3A%2F%2Fgithub.com"
      );
    });
  });

  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://intelx.io/?s=test%40test.com"
      );
    });
  });

  describe("#searchByBTC", () => {
    it("should return URL", () => {
      expect(
        subject.searchByBTC("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")
      ).to.equal("https://intelx.io/?s=1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
    });
  });
});
