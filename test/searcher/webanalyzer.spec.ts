import { expect } from "chai";
import "mocha";
import { WebAnalyzer } from "../../src/lib/searcher";

describe("WebAnalyzer", function () {
  const subject = new WebAnalyzer();

  it("should support Domain type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["domain"]);
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://wa-com.com/github.com"
      );
    });
  });
});
