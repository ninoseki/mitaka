import { VxCube } from "~/searcher";

describe("VxCube", function () {
  const subject = new VxCube();

  it("should support ip, domain and hash ", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain", "hash"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(
        `http://vxcube.com/tools/ip/${ip}/whois`,
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        `http://vxcube.com/tools/domain/${domain}/whois`,
      );
    });
  });

  describe("#searchByHash", function () {
    const hash = "44d88612fea8a8f36de82e1278abb02f";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)).toBe(
        `http://vxcube.com/result/${hash}`,
      );
    });
  });
});
