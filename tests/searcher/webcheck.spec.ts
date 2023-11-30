import { WebCheck } from "~/searcher";

describe("WebCheck", function () {
  const subject = new WebCheck();

  it("should support domain", function () {
    expect(subject.supportedTypes).toEqual(["domain"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `https://web-check.xyz/results/${domain}`,
      );
    });
  });
});
