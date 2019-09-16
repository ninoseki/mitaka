import { expect } from "chai";
import "mocha";
import { DomainBigData } from "../../src/lib/searcher";

describe("DomainBigData", () => {
  const subject = new DomainBigData();

  it("should support Domain type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["domain"]);
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://domainbigdata.com/github.com"
      );
    });
  });
});
