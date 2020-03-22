import { expect } from "chai";
import "mocha";
import { ThreatConnect } from "../../src/lib/searcher";

describe("ThreatConnect", function () {
  const subject = new ThreatConnect();

  it("should support IP, Domain & Emal type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "email"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://app.threatconnect.com/auth/indicators/details/address.xhtml?address=1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://app.threatconnect.com/auth/indicators/details/host.xhtml?host=github.com"
      );
    });
  });

  describe("#searchByEmail", function () {
    it("should return URL", function () {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://app.threatconnect.com/auth/indicators/details/emailaddress.xhtml?emailaddress=test%40test.com"
      );
    });
  });
});
