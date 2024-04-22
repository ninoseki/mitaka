import { Talos } from "~/searcher";

describe("Talos", function () {
  const subject = new Talos();

  it("should support ip and domain", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)._unsafeUnwrap()).toBe(
        `https://talosintelligence.com/reputation_center/lookup?search=${ip}`,
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)._unsafeUnwrap()).toBe(
        `https://talosintelligence.com/reputation_center/lookup?search=${domain}`,
      );
    });
  });
});
