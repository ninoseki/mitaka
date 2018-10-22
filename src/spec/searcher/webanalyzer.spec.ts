import { expect } from "chai";
import "mocha";
import { WebAnalyzer } from "../../lib/searcher";

describe("WebAnalyzer", () => {
  const subject = new WebAnalyzer();
  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal("https://wa-com.com/github.com");
    });
  });
});
