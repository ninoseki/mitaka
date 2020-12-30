import "mocha";

import { expect } from "chai";

import { SecurityTrails } from "@/searcher";

describe("SecurityTrails", function () {
  const subject = new SecurityTrails();

  it("should support ip, domain and email", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "email"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://securitytrails.com/list/ip/${ip}`
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://securitytrails.com/domain/${domain}`
      );
    });
  });

  describe("#searchByEmail", function () {
    const email = "test@test.com";
    it("should return a URL", function () {
      expect(subject.searchByEmail(email)).to.equal(
        `https://securitytrails.com/list/by-email/${email}`
      );
    });
  });
});
