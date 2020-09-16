import "mocha";

import { expect } from "chai";

import { WebAnalyzer } from "../../src/lib/searcher";

describe("WebAnalyzer", function () {
  const subject = new WebAnalyzer();

  it("should support domain", function () {
    expect(subject.supportedTypes).to.deep.equal(["domain"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://wa-com.com/${domain}`
      );
    });
  });
});
