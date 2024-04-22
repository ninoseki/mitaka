import { URLVoid } from "~/searcher";

describe("URLVoid", function () {
  const subject = new URLVoid();

  it("should support domain and url", function () {
    expect(subject.supportedTypes).toEqual(["domain"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)._unsafeUnwrap()).toBe(
        `https://www.urlvoid.com/scan/${domain}`,
      );
    });
  });
});
