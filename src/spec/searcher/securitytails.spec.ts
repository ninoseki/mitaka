import { expect } from "chai";
import "mocha";
import { SecurityTrails } from "../../lib/searcher";

describe("SecurityTrails", () => {
  const subject = new SecurityTrails();

  it("should support IP, Domain type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("8.8.8.8")).to.equal("https://securitytrails.com/list/ip/8.8.8.8");
    });
  });
  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal("https://securitytrails.com/domain/github.com");
    });
  });
  describe("#searchByText", () => {
    it("should return URL", () => {
      expect(subject.searchByText("test")).to.equal("https://securitytrails.com/list/keyword/test");
    });
  });
});
