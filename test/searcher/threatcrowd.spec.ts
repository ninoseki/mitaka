import "mocha";

import { expect } from "chai";

import { ThreatCrowd } from "../../src/lib/searcher";

describe("ThreatCrowd", function () {
  const subject = new ThreatCrowd();

  it("should support IP, Domain & Emal type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "email"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("188.40.75.132")).to.equal(
        "https://www.threatcrowd.org/ip.php?ip=188.40.75.132"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://www.threatcrowd.org/domain.php?domain=github.com"
      );
    });
  });

  describe("#searchByEmail", function () {
    it("should return URL", function () {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://www.threatcrowd.org/email.php?email=test%40test.com"
      );
    });
  });
});
