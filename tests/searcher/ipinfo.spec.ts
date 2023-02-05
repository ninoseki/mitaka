import { IPinfo } from "@/searcher";

describe("IPinfo", function () {
  const subject = new IPinfo();

  it("should support ip and asn", function () {
    expect(subject.supportedTypes).toEqual(["ip", "asn"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(`https://ipinfo.io/${ip}`);
    });
  });

  describe("#searchByASN", function () {
    const asn = "AS13335";
    it("should return a URL", function () {
      expect(subject.searchByASN(asn)).toBe(`https://ipinfo.io/${asn}`);
    });
  });
});
