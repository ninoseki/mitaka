import { OTX } from "@/searcher";

describe("OTX", function () {
  const subject = new OTX();

  it("should support url, CVE, domain, ip and hash", function () {
    expect(subject.supportedTypes).toEqual([
      "ip",
      "domain",
      "url",
      "hash",
      "cve",
    ]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(
        `https://otx.alienvault.com/indicator/ip/${ip}`
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `https://otx.alienvault.com/indicator/domain/${domain}`
      );
    });
  });

  describe("#searchByHash", function () {
    const hash = "726a2eedb9df3d63ec1b4a7d774a799901f1a2b9";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)).toBe(
        `https://otx.alienvault.com/indicator/file/${hash}`
      );
    });
  });

  describe("#searchByCVE", function () {
    it("should return a URL", function () {
      const cve = "CVE-2018-8013";
      expect(subject.searchByCVE(cve)).toBe(
        `https://otx.alienvault.com/indicator/cve/${cve}`
      );
    });
  });

  describe("#searchByURL", function () {
    it("should return a URL", function () {
      const url = "https://github.com";
      expect(subject.searchByURL(url)).toBe(
        `https://otx.alienvault.com/indicator/url/${url}`
      );
    });
  });
});
