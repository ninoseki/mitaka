import { Maltiverse } from "~/searcher";

describe("Maltiverse", function () {
  const subject = new Maltiverse();

  it("should support domain and hash", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain", "url", "hash"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)._unsafeUnwrap()).toBe(
        `https://www.maltiverse.com/ip/${ip}`,
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)._unsafeUnwrap()).toBe(
        `https://www.maltiverse.com/hostname/${domain}`,
      );
    });
  });

  describe("#searchByURL", function () {
    const url = "https://mxqfubnawkypazgkxu.top/";
    it("should return a URL", function () {
      expect(subject.searchByURL(url)._unsafeUnwrap()).toBe(
        `https://www.maltiverse.com/url/900c18a4bbfb8be98a1b5ba07afb1a9d46c8acb4628999e935934bd59c28f140`,
      );
    });
  });

  describe("#searchByHash", function () {
    const hash = "44d88612fea8a8f36de82e1278abb02";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)._unsafeUnwrap()).toBe(
        `https://www.maltiverse.com/search;query=${hash}`,
      );
    });
  });
});
