import "mocha";

import { expect } from "chai";

import { DomainBigData } from "../../src/lib/searcher";

describe("DomainBigData", function () {
  const subject = new DomainBigData();

  it("should support Domain, IP, Email type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["domain", "ip", "email"]);
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://domainbigdata.com/github.com"
      );
    });
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("1.1.1.1")).to.equal(
        "https://domainbigdata.com/1.1.1.1"
      );
    });
  });

  describe("#searchByEmail", function () {
    it("should return URL", function () {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://domainbigdata.com/email/test@test.com"
      );
    });
  });
});
