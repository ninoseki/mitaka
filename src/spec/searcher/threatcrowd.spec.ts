import { expect } from "chai";
import "mocha";
import { ThreatCrowd } from "../../lib/searcher";

describe("ThreatCrowd", () => {
  describe("#searchByIP", () => {
    it("should return URL", () => {
      const threatCrowd = new ThreatCrowd();
      expect(threatCrowd.supportedTypes.indexOf("ip")).not.equal(-1);
      expect(threatCrowd.searchByIP("188.40.75.132")).
        to.equal("https://www.threatcrowd.org/ip.php?ip=188.40.75.132")
    });
  });
  describe("#searchByDomain", () => {
    it("should return URL", () => {
      const threatCrowd = new ThreatCrowd();
      expect(threatCrowd.supportedTypes.indexOf("domain")).not.equal(-1);
      expect(threatCrowd.searchByDomain("github.com")).
        to.equal("https://www.threatcrowd.org/domain.php?domain=github.com");
    });
  });
});
