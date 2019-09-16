import { expect } from "chai";
import "mocha";
import { SecurityTrails } from "../../src/lib/searcher";

describe("SecurityTrails", () => {
  const subject = new SecurityTrails();

  it("should support IP, Domain type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "email"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("8.8.8.8")).to.equal(
        "https://securitytrails.com/list/ip/8.8.8.8"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://securitytrails.com/domain/github.com"
      );
    });
  });

  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://securitytrails.com/list/by-email/test@test.com"
      );
    });
  });
});
