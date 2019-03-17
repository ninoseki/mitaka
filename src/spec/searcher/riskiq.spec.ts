import { expect } from "chai";
import "mocha";
import { RiskIQ } from "../../lib/searcher";

describe("RiskIQ", () => {
  const subject = new RiskIQ();

  it("should support IP, Domain & Emal type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "email"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("ip")).not.equal(-1);
      expect(subject.searchByIP("1.1.1.1")).
        to.equal("https://community.riskiq.com/search/1.1.1.1");
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("domain")).not.equal(-1);
      expect(subject.searchByDomain("github.com")).
        to.equal("https://community.riskiq.com/search/github.com");
    });
  });

  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("email")).not.equal(-1);
      expect(subject.searchByEmail("test@test.com")).
        to.equal("https://community.riskiq.com/search/whois/email/test@test.com");
    });
  });
});
