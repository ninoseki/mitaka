import "mocha";

import { expect } from "chai";

import { RiskIQ } from "../../src/lib/searcher";

describe("RiskIQ", function () {
  const subject = new RiskIQ();

  it("should support IP, Domain & Emal type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "email",
      "gaTrackID",
    ]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://community.riskiq.com/search/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://community.riskiq.com/search/github.com"
      );
    });
  });

  describe("#searchByEmail", function () {
    it("should return URL", function () {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://community.riskiq.com/search/whois/email/test@test.com"
      );
    });
  });

  describe("#searchByGATarckID", function () {
    it("should return URL", function () {
      expect(subject.searchByGATrackID("UA-67609351-1")).to.equal(
        "https://community.riskiq.com/search/trackers/ua-67609351-1"
      );
    });
  });
});
