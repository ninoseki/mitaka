import { Censys } from "~/searcher";

describe("Censys", function () {
  const subject = new Censys();

  it("should support ip, domain, asn and email", function () {
    expect(subject.supportedTypes).toEqual(["ip", "asn", "domain", "email"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)._unsafeUnwrap()).toBe(
        `https://search.censys.io/hosts/${ip}`,
      );
    });
  });

  describe("#searchByASN", function () {
    const asn = "AS13335";
    it("should return a URL", function () {
      expect(subject.searchByASN(asn)._unsafeUnwrap()).toBe(
        "https://search.censys.io/search?q=autonomous_system.asn%3A13335&resource=hosts",
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)._unsafeUnwrap()).toBe(
        "https://search.censys.io/search?q=parsed.names%3Agithub.com&resource=certificates",
      );
    });
  });

  describe("#searchByEmail", function () {
    const email = "test@test.com";
    it("should return a URL", function () {
      expect(subject.searchByEmail(email)._unsafeUnwrap()).toBe(
        "https://search.censys.io/search?q=parsed.subject.email_address%3Atest%40test.com&resource=certificates",
      );
    });
  });
});
