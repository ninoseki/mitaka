import { expect } from "chai";
import "mocha";
import { RiskIQ } from "../../src/lib/searcher";

describe("RiskIQ", () => {
  const subject = new RiskIQ();

  it("should support IP, Domain & Emal type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "email",
      "gaTrackID",
    ]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://community.riskiq.com/search/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://community.riskiq.com/search/github.com"
      );
    });
  });

  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://community.riskiq.com/search/whois/email/test@test.com"
      );
    });
  });

  describe("#searchByGATarckID", () => {
    it("should return URL", () => {
      expect(subject.searchByGATrackID("UA-67609351-1")).to.equal(
        "https://community.riskiq.com/search/trackers/ua-67609351-1"
      );
    });
  });
});
