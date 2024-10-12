import { DNSCoffee } from "~/searcher";

describe("DNSCofee", function () {
  const subject = new DNSCoffee();

  it("should support domain", function () {
    expect(subject.supportedTypes).toEqual(["domain"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)._unsafeUnwrap()).toBe(
        `https://dns.coffee/domains/${domain}`,
      );
    });
  });
});
