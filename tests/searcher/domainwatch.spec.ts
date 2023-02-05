import { DomainWatch } from "@/searcher";

describe("DomainWatch", function () {
  const subject = new DomainWatch();

  it("should support domain and email", function () {
    expect(subject.supportedTypes).toEqual(["domain", "email"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `https://domainwat.ch/site/${domain}`
      );
    });
  });

  describe("#searchByEmail", function () {
    const email = "test@test.com";
    it("should return a URL", function () {
      expect(subject.searchByEmail(email)).toBe(
        "https://domainwat.ch/search?query=email%3Atest%40test.com&type=whois_raw"
      );
    });
  });
});
