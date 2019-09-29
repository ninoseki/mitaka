import { expect } from "chai";
import "mocha";
import { ThreatCrowd } from "../../src/lib/searcher";

describe("ThreatCrowd", () => {
  const subject = new ThreatCrowd();

  it("should support IP, Domain & Emal type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "email"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("188.40.75.132")).to.equal(
        "https://www.threatcrowd.org/ip.php?ip=188.40.75.132"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://www.threatcrowd.org/domain.php?domain=github.com"
      );
    });
  });

  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://www.threatcrowd.org/email.php?email=test%40test.com"
      );
    });
  });
});
