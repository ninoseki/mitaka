import { ThreatMiner } from "~/searcher";

describe("ThreatMiner", function () {
  const subject = new ThreatMiner();

  it("should support ip, domain and email", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain", "hash"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(
        `https://www.threatminer.org/host.php?q=${ip}`,
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `https://www.threatminer.org/domain.php?q=${domain}`,
      );
    });
  });

  describe("#searchByHash", function () {
    const hash = "44d88612fea8a8f36de82e1278abb02f";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)).toBe(
        `https://www.threatminer.org/sample.php?q=${hash}`,
      );
    });
  });
});
