import { RiskIQ } from "~/searcher";

describe("RiskIQ", function () {
  const subject = new RiskIQ();

  it("should support ip, domain, email and gaTrackID", function () {
    expect(subject.supportedTypes).toEqual([
      "ip",
      "domain",
      "email",
      "gaTrackID",
    ]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(
        `https://community.riskiq.com/search/${ip}`
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `https://community.riskiq.com/search/${domain}`
      );
    });
  });

  describe("#searchByEmail", function () {
    const email = "test@test.com";
    it("should return a URL", function () {
      expect(subject.searchByEmail(email)).toBe(
        `https://community.riskiq.com/search/whois/email/${email}`
      );
    });
  });

  describe("#searchByGATarckID", function () {
    const gaTrackID = "UA-67609351-1";
    it("should return a URL", function () {
      expect(subject.searchByGATrackID(gaTrackID)).toBe(
        "https://community.riskiq.com/search/trackers/ua-67609351-1"
      );
    });
  });
});
