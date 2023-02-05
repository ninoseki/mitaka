import { IntelligenceX } from "@/searcher";

describe("Intelligence X", function () {
  const subject = new IntelligenceX();

  it("should support ip, domain, url, email and btc", function () {
    expect(subject.supportedTypes).toEqual([
      "ip",
      "domain",
      "url",
      "email",
      "btc",
    ]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(`https://intelx.io/?s=${ip}`);
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `https://intelx.io/?s=${domain}`
      );
    });
  });

  describe("#searchByURL", function () {
    const url = "https://github.com";
    it("should return a URL", function () {
      expect(subject.searchByURL(url)).toBe(
        "https://intelx.io/?s=https%3A%2F%2Fgithub.com"
      );
    });
  });

  describe("#searchByEmail", function () {
    const email = "test@test.com";
    it("should return a URL", function () {
      expect(subject.searchByEmail(email)).toBe(
        "https://intelx.io/?s=test%40test.com"
      );
    });
  });

  describe("#searchByBTC", function () {
    const btc = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
    it("should return a URL", function () {
      expect(subject.searchByBTC(btc)).toBe(`https://intelx.io/?s=${btc}`);
    });
  });
});
