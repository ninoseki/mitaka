import { expect } from "chai";
import "mocha";
import { FindSubDomains } from "../../src/lib/searcher";

describe("FindSubDomain", function () {
  const subject = new FindSubDomains();

  it("should support Domain type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["domain"]);
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://findsubdomains.com/subdomains-of/github.com"
      );
    });
  });
});
