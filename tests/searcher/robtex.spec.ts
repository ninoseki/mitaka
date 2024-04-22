import { Robtex } from "~/searcher";

describe("Robtex", function () {
  const subject = new Robtex();

  it("should support domain and ip", function () {
    expect(subject.supportedTypes).toEqual(["domain", "ip"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)._unsafeUnwrap()).toBe(
        `https://www.robtex.com/dns-lookup/${domain}`,
      );
    });
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)._unsafeUnwrap()).toBe(
        `https://www.robtex.com/ip-lookup/${ip}`,
      );
    });
  });
});
