import "mocha";

import { expect } from "chai";

import { ThreatConnect } from "../../src/lib/searcher";

describe("ThreatConnect", function () {
  const subject = new ThreatConnect();

  it("should support ip, domain and email", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "email"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://app.threatconnect.com/auth/indicators/details/address.xhtml?address=${ip}`
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://app.threatconnect.com/auth/indicators/details/host.xhtml?host=${domain}`
      );
    });
  });

  describe("#searchByEmail", function () {
    const email = "test@test.com";
    it("should return a URL", function () {
      expect(subject.searchByEmail(email)).to.equal(
        "https://app.threatconnect.com/auth/indicators/details/emailaddress.xhtml?emailaddress=test%40test.com"
      );
    });
  });
});
