import { SecurityTrails } from "~/searcher";

describe("SecurityTrails", function () {
  const subject = new SecurityTrails();

  it("should support ip, domain", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(
        `https://securitytrails.com/list/ip/${ip}`,
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `https://securitytrails.com/domain/${domain}`,
      );
    });
  });
});
