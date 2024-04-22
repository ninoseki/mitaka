import { VirusTotal } from "~/searcher";

describe("VirusTotal", function () {
  const subject = new VirusTotal();

  it("should support ip, domain, url and hash", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain", "url", "hash"]);
  });

  describe("#searchByURL", function () {
    it("should return a URL", function () {
      expect(
        subject.searchByURL("https://virustotal.com")._unsafeUnwrap(),
      ).toBe(
        "https://www.virustotal.com/gui/url/77af0145fa9290ca3a4c214eb4561fc01070132300f6265e2c4cfb447372422e/details",
      );
      expect(
        subject.searchByURL("https://qiita.com/trend")._unsafeUnwrap(),
      ).toBe(
        "https://www.virustotal.com/gui/url/5dd2d006b4430a593be125eee20494016d3ac933796da6deef590c3e045a685d/details",
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)._unsafeUnwrap()).toBe(
        `https://www.virustotal.com/gui/domain/${domain}/details`,
      );
    });
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)._unsafeUnwrap()).toBe(
        `https://www.virustotal.com/gui/ip-address/${ip}/details`,
      );
    });
  });

  describe("#searchByHash", function () {
    const hash =
      "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)._unsafeUnwrap()).toBe(
        `https://www.virustotal.com/gui/file/${hash}/details`,
      );
    });
  });
});
