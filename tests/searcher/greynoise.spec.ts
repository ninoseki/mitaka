import { GreyNoise } from "~/searcher";

describe("GreyNoise", function () {
  const subject = new GreyNoise();

  it("should support ip, domain, asn and cve", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain", "asn", "cve"]);
  });

  describe("#searchByIP", function () {
    it("should return a URL", function () {
      const ip = "1.1.1.1";
      expect(subject.searchByIP(ip)).toBe(
        "https://viz.greynoise.io/query?gnql=ip%3A1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        "https://viz.greynoise.io/query?gnql=metadata.rdns%3Agithub.com"
      );
    });
  });

  describe("#searchByASN", function () {
    const asn = "AS13335";
    it("should return a URL", function () {
      expect(subject.searchByASN(asn)).toBe(
        "https://viz.greynoise.io/query?gnql=metadata.asn%3AAS13335"
      );
    });
  });

  describe("#searchByCVE", function () {
    const cve = "CVE-2019-19781";
    it("should return a URL", function () {
      expect(subject.searchByCVE(cve)).toBe(
        "https://viz.greynoise.io/query?gnql=cve%3ACVE-2019-19781"
      );
    });
  });
});
