import { HurricaneElectric } from "~/searcher";

describe("HurricaneElectric", function () {
  const subject = new HurricaneElectric();

  it("should support ip, domain and asn", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain", "asn"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)._unsafeUnwrap()).toBe(
        `https://bgp.he.net/ip/${ip}`,
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)._unsafeUnwrap()).toBe(
        `https://bgp.he.net/dns/${domain}`,
      );
    });
  });

  describe("#searchByASN", function () {
    const asn = "AS2497";
    it("should return a URL", function () {
      expect(subject.searchByASN(asn)._unsafeUnwrap()).toBe(
        `https://bgp.he.net/${asn}`,
      );
    });
  });
});
