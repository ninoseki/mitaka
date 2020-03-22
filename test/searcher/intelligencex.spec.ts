import { expect } from "chai";
import "mocha";
import { IntelligenceX } from "../../src/lib/searcher";

describe("Intelligence X", function () {
  const subject = new IntelligenceX();

  it("should support IP, Domain, URL, Email & BTC type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "url",
      "email",
      "btc",
    ]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://intelx.io/?s=1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://intelx.io/?s=github.com"
      );
    });
  });

  describe("#searchByURL", function () {
    it("should return URL", function () {
      expect(subject.searchByURL("https://github.com")).to.equal(
        "https://intelx.io/?s=https%3A%2F%2Fgithub.com"
      );
    });
  });

  describe("#searchByEmail", function () {
    it("should return URL", function () {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://intelx.io/?s=test%40test.com"
      );
    });
  });

  describe("#searchByBTC", function () {
    it("should return URL", function () {
      expect(
        subject.searchByBTC("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")
      ).to.equal("https://intelx.io/?s=1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
    });
  });
});
