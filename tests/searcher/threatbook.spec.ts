import { ThreatBook } from "~/searcher";

describe("ThreatBook", function () {
  const subject = new ThreatBook();

  it("should support ip, domain and email", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(`https://threatbook.io/ip/${ip}`);
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `https://threatbook.io/domain/${domain}`,
      );
    });
  });
});
