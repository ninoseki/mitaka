import { Hostio } from "~/searcher";

describe("Hostio", function () {
  const subject = new Hostio();

  it("should support domain", function () {
    expect(subject.supportedTypes).toEqual(["domain"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `https://host.io/${domain}`,
      );
    });
  });
});
