import "mocha";

import { expect } from "chai";

import { DomainBigData } from "@/searcher";

describe("DomainBigData", function () {
  const subject = new DomainBigData();

  it("should support domain, ip and email", function () {
    expect(subject.supportedTypes).to.deep.equal(["domain", "ip", "email"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://domainbigdata.com/${domain}`
      );
    });
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://domainbigdata.com/${ip}`
      );
    });
  });

  describe("#searchByEmail", function () {
    const email = "test@test.com";
    it("should return a URL", function () {
      expect(subject.searchByEmail(email)).to.equal(
        `https://domainbigdata.com/email/${email}`
      );
    });
  });
});
