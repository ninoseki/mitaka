import { ViewDNS } from "~/searcher";

describe("ViewDNS", function () {
  const subject = new ViewDNS();

  it("should support ip, domain and email", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain", "email"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(
        `https://viewdns.info/reverseip/?t=1&host=${ip}`,
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `https://viewdns.info/iphistory/?domain=${domain}`,
      );
    });
  });

  describe("#searchByEmail", function () {
    const email = "test@test.com";
    it("should return a URL", function () {
      expect(subject.searchByEmail(email)).toBe(
        "https://viewdns.info/reversewhois/?q=test%40test.com",
      );
    });
  });
});
