import { Host } from "~/searcher";

describe("Host", function () {
  const subject = new Host();

  it("should support domain", function () {
    expect(subject.supportedTypes).toEqual(["domain"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(`https://host.io/${domain}`);
    });
  });
});
