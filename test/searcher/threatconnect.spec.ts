import { expect } from "chai";
import "mocha";
import { ThreatConnect } from "../../src/lib/searcher";

describe("ThreatConnect", () => {
  const subject = new ThreatConnect();

  it("should support IP, Domain & Emal type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "email"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("ip")).not.equal(-1);
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://app.threatconnect.com/auth/indicators/details/address.xhtml?address=1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("domain")).not.equal(-1);
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://app.threatconnect.com/auth/indicators/details/host.xhtml?host=github.com"
      );
    });
  });

  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("email")).not.equal(-1);
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://app.threatconnect.com/auth/indicators/details/emailaddress.xhtml?emailaddress=test%40test.com"
      );
    });
  });
});
