import { XForceExchange } from "@/searcher";

describe("X-Force Exchange", function () {
  const subject = new XForceExchange();

  it("should support ip, domain and hash", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain", "hash"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(
        `https://exchange.xforce.ibmcloud.com/ip/${ip}`
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `https://exchange.xforce.ibmcloud.com/url/${domain}`
      );
    });
  });

  describe("#searchByHash", function () {
    const hash = "44d88612fea8a8f36de82e1278abb02f";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)).toBe(
        `https://exchange.xforce.ibmcloud.com/malware/${hash}`
      );
    });
  });
});
