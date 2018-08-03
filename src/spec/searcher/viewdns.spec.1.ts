import { expect } from "chai";
import "mocha";
import { RiskIQ } from "../../lib/searcher";

describe("RiskIQ", () => {
  describe("#searchByIP", () => {
    it("should return URL", () => {
      const riskIQ = new RiskIQ();
      expect(riskIQ.supportedTypes.indexOf("ip")).not.equal(-1);
      expect(riskIQ.searchByIP("1.1.1.1")).
        to.equal("https://community.riskiq.com/search/1.1.1.1")
    });
  });
  describe("#searchByDomain", () => {
    it("should return URL", () => {
      const riskIQ = new RiskIQ();
      expect(riskIQ.supportedTypes.indexOf("domain")).not.equal(-1);
      expect(riskIQ.searchByDomain("github.com")).
        to.equal("https://community.riskiq.com/search/github.com");
    });
  });
  describe("#searchByEmail", () => {
    it("should return URL", () => {
      const riskIQ = new RiskIQ();
      expect(riskIQ.supportedTypes.indexOf("email")).not.equal(-1);
      expect(riskIQ.searchByEmail("test@test.com")).
        to.equal("https://community.riskiq.com/search/whois/email/test@test.com");
    });
  });
});
