import { expect } from "chai";
import "mocha";
import { ThreatCrowd } from "../../lib/searcher";

describe("ThreatCrowd", () => {
  const subject = new ThreatCrowd();
  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("ip")).not.equal(-1);
      expect(subject.searchByIP("188.40.75.132")).
        to.equal("https://www.threatcrowd.org/ip.php?ip=188.40.75.132")
    });
  });
  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("domain")).not.equal(-1);
      expect(subject.searchByDomain("github.com")).
        to.equal("https://www.threatcrowd.org/domain.php?domain=github.com");
    });
  });
  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("email")).not.equal(-1);
      expect(subject.searchByEmail("test@test.com")).
        to.equal("https://www.threatcrowd.org/email.php?email=test@test.com");
    });
  });
});
