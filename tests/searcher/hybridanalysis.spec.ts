import { HybridAnalysis } from "~/searcher";

describe("HybridAnalysis", function () {
  const subject = new HybridAnalysis();

  it("should support ip, domain and hash", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain", "hash"]);
  });

  describe("#searchByHash", function () {
    it("should return a URL", function () {
      const sha256 =
        "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f";
      expect(subject.searchByHash(sha256)).toBe(
        `https://www.hybrid-analysis.com/search?query=${sha256}`,
      );
    });
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(
        "https://www.hybrid-analysis.com/search?query=host%3A1.1.1.1",
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        "https://www.hybrid-analysis.com/search?query=domain%3Agithub.com",
      );
    });
  });
});
