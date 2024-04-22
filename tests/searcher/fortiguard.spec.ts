import { FortiGuard } from "~/searcher";

describe("FortiGuard", function () {
  const subject = new FortiGuard();

  it("should support ip, url and cve", function () {
    expect(subject.supportedTypes).toEqual(["ip", "url", "cve"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)._unsafeUnwrap()).toBe(
        `https://fortiguard.com/search?q=${ip}&engine=7`,
      );
    });
  });

  describe("#searchByURL", function () {
    const url = "https://github.com";
    it("should return a URL", function () {
      expect(subject.searchByURL(url)._unsafeUnwrap()).toBe(
        `https://fortiguard.com/search?q=${encodeURIComponent(url)}&engine=7`,
      );
    });
  });

  describe("#searchByCVE", function () {
    const cve = "CVE-2017-2991";
    it("should return a URL", function () {
      expect(subject.searchByCVE(cve)._unsafeUnwrap()).toBe(
        `https://fortiguard.com/search?q=${cve}&engine=3`,
      );
    });
  });
});
