import { expect } from "chai";
import "mocha";
import { SecurityTrails } from "../../src/lib/searcher";

describe("SecurityTrails", function () {
  const subject = new SecurityTrails();

  it("should support IP, Domain type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "email"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("8.8.8.8")).to.equal(
        "https://securitytrails.com/list/ip/8.8.8.8"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://securitytrails.com/domain/github.com"
      );
    });
  });

  describe("#searchByEmail", function () {
    it("should return URL", function () {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://securitytrails.com/list/by-email/test@test.com"
      );
    });
  });
});
