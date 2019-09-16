import { expect } from "chai";
import "mocha";
import { WebAnalyzer } from "../../src/lib/searcher";

describe("WebAnalyzer", () => {
  const subject = new WebAnalyzer();

  it("should support Domain type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["domain"]);
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://wa-com.com/github.com"
      );
    });
  });
});
