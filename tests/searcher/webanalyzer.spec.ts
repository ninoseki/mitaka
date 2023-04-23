import { WebAnalyzer } from "~/searcher";

describe("WebAnalyzer", function () {
  const subject = new WebAnalyzer();

  it("should support domain", function () {
    expect(subject.supportedTypes).toEqual(["domain"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `https://wa-com.com/${domain}`
      );
    });
  });
});
