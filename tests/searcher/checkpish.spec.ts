import { CheckPhish } from "@/searcher";

describe("CheckPhish", function () {
  const subject = new CheckPhish();

  it("should support ip and domain", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(`https://checkphish.ai/ip/${ip}`);
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `https://checkphish.ai/domain/${domain}`
      );
    });
  });
});
