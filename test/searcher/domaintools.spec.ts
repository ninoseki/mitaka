import { expect } from "chai";
import "mocha";
import { DomainTools } from "../../src/lib/searcher";

describe("DomainTools", function () {
  const subject = new DomainTools();

  it("should support IP & Domain type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://whois.domaintools.com/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://whois.domaintools.com/github.com"
      );
    });
  });
});
