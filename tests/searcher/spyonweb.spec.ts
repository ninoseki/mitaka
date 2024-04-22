import { SpyOnWeb } from "~/searcher";

describe("SpyOnWeb", function () {
  const subject = new SpyOnWeb();

  it("should support ip, domain, gaPubID and gaTrackID", function () {
    expect(subject.supportedTypes).toEqual([
      "ip",
      "domain",
      "gaPubID",
      "gaTrackID",
    ]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)._unsafeUnwrap()).toBe(
        `http://spyonweb.com/${ip}`,
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)._unsafeUnwrap()).toBe(
        `http://spyonweb.com/${domain}`,
      );
    });
  });

  describe("#searchByGAPubID", function () {
    const id = "pub-7232066202917795";
    it("should return a URL", function () {
      expect(subject.searchByGAPubID(id)._unsafeUnwrap()).toBe(
        `http://spyonweb.com/${id}`,
      );
    });
  });

  describe("#searchByGATrackID", function () {
    const id = "ua-67609351-1";
    it("should return a URL", function () {
      expect(subject.searchByGATrackID(id)._unsafeUnwrap()).toBe(
        `http://spyonweb.com/${id}`,
      );
    });
  });
});
