import { IPIP } from "@/searcher";

describe("IPIP", function () {
  const subject = new IPIP();

  it("should support ip and asn", function () {
    expect(subject.supportedTypes).toEqual(["ip", "asn"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(`https://en.ipip.net/ip/${ip}.html`);
    });
  });

  describe("#searchByASN", function () {
    const asn = "AS13335";
    it("should return a URL", function () {
      expect(subject.searchByASN(asn)).toBe(`https://whois.ipip.net/${asn}`);
    });
  });
});
