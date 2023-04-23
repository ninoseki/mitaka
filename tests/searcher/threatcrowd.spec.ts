import { ThreatCrowd } from "~/searcher";

describe("ThreatCrowd", function () {
  const subject = new ThreatCrowd();

  it("should support ip, domain and email", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain", "email"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(
        `https://www.threatcrowd.org/ip.php?ip=${ip}`
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `https://www.threatcrowd.org/domain.php?domain=${domain}`
      );
    });
  });

  describe("#searchByEmail", function () {
    const email = "test@test.com";
    it("should return a URL", function () {
      expect(subject.searchByEmail(email)).toBe(
        "https://www.threatcrowd.org/email.php?email=test%40test.com"
      );
    });
  });
});
