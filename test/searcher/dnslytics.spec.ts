import "mocha";

import { expect } from "chai";

import { DNSlytics } from "../../src/lib/searcher";

describe("DNSlytics", function () {
  const subject = new DNSlytics();

  it("should support ip and domain", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(`https://dnslytics.com/ip/${ip}`);
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://dnslytics.com/domain/${domain}`
      );
    });
  });
});
