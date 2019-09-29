import { expect } from "chai";
import "mocha";
import { FindSubDomains } from "../../src/lib/searcher";

describe("FindSubDomain", () => {
  const subject = new FindSubDomains();

  it("should support Domain type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["domain"]);
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://findsubdomains.com/subdomains-of/github.com"
      );
    });
  });
});
