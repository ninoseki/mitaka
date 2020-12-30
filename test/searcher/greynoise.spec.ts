import "mocha";

import { expect } from "chai";

import { GreyNoise } from "@/searcher";

describe("GreyNoise", function () {
  const subject = new GreyNoise();

  it("should support ip, domain & asn", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "asn"]);
  });

  describe("#searchByIP", function () {
    it("should return a URL", function () {
      const ip = "1.1.1.1";
      expect(subject.searchByIP(ip)).to.equal(
        "https://viz.greynoise.io/query?gnql=ip%3A1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        "https://viz.greynoise.io/query?gnql=metadata.rdns%3Agithub.com"
      );
    });
  });

  describe("#searchByASN", function () {
    const asn = "AS13335";
    it("should return a URL", function () {
      expect(subject.searchByASN(asn)).to.equal(
        "https://viz.greynoise.io/query?gnql=metadata.asn%3AAS13335"
      );
    });
  });
});
