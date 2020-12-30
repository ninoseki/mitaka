import "mocha";

import { expect } from "chai";

import { DomainTools } from "@/searcher";

describe("DomainTools", function () {
  const subject = new DomainTools();

  it("should support ip and domain", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://whois.domaintools.com/${ip}`
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://whois.domaintools.com/${domain}`
      );
    });
  });
});
