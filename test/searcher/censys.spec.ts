import "mocha";

import { expect } from "chai";

import { Censys } from "../../src/lib/searcher";

describe("Censys", function () {
  const subject = new Censys();

  it("should support ip, domain, asn and text", function () {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "asn",
      "text",
    ]);
  });

  describe("#searchByText", function () {
    const text = "urlscan.io";
    it("should return a URL", function () {
      expect(subject.searchByText(text)).to.equal(
        `https://censys.io/ipv4?q=${text}`
      );
    });
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(`https://censys.io/ipv4/${ip}`);
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://censys.io/domain/${domain}`
      );
    });
  });

  describe("#searchByASN", function () {
    const asn = "AS13335";
    it("should return a URL", function () {
      expect(subject.searchByASN(asn)).to.equal(
        "https://censys.io/ipv4?q=autonomous_system.asn%3A13335"
      );
    });
  });
});
