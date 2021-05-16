import "mocha";

import { expect } from "chai";

import { Censys } from "@/searcher";

describe("Censys", function () {
  const subject = new Censys();

  it("should support ip, domain, asn", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "asn"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://search.censys.io/hosts/${ip}`
      );
    });
  });

  describe("#searchByASN", function () {
    const asn = "AS13335";
    it("should return a URL", function () {
      expect(subject.searchByASN(asn)).to.equal(
        "https://search.censys.io/search?q=autonomous_system.asn%3A13335&resource=hosts"
      );
    });
  });
});
