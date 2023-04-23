import { Crtsh } from "~/searcher";

describe("Crtsh", function () {
  const subject = new Crtsh();

  it("should support domain", function () {
    expect(subject.supportedTypes).toEqual(["domain"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `https://crt.sh/?q=${domain}`
      );
    });
  });
});
