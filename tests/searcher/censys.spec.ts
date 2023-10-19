import { Censys } from "~/searcher";

describe("Censys", function () {
  const subject = new Censys();

  it("should support ip, domain, asn and email", function () {
    expect(subject.supportedTypes).toEqual(["ip", "asn", "domain", "email", "gaTrackID"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(
        `https://search.censys.io/hosts/${ip}`,
      );
    });
  });

  describe("#searchByASN", function () {
    const asn = "AS13335";
    it("should return a URL", function () {
      expect(subject.searchByASN(asn)).toBe(
        "https://search.censys.io/search?q=autonomous_system.asn%3A+13335&resource=hosts",
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        "https://search.censys.io/search?q=parsed.names%3A+github.com&resource=certificates",
      );
    });
  });

  describe("#searchByEmail", function () {
    const email = "test@test.com";
    it("should return a URL", function () {
      expect(subject.searchByEmail(email)).toBe(
        "https://search.censys.io/search?q=parsed.subject.email_address%3A+test%40test.com&resource=certificates",
      );
    });
  });

  describe("#searchByGATrackID", function () {
    const id = "UA-67609351-1";
    it("should return a URL", function () {
      expect(subject.searchByGATrackID(id)).toBe(
        "https://search.censys.io/search?q=services.http.response.body%3A+%22UA-67609351-1%22&resource=hosts",
      );
    });
  });
});
