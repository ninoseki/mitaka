import { Scumware } from "~/searcher";

describe("Scumware", function () {
  const subject = new Scumware();

  it("should support domain, ip and hash", function () {
    expect(subject.supportedTypes).toEqual(["domain", "ip", "hash"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)._unsafeUnwrap()).toBe(
        `https://www.scumware.org/report/${domain}`,
      );
    });
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)._unsafeUnwrap()).toBe(
        `https://www.scumware.org/report/${ip}`,
      );
    });
  });

  describe("#searchByHash", function () {
    it("should return a URL", function () {
      const md5 = "44d88612fea8a8f36de82e1278abb02f";
      expect(subject.searchByHash(md5)._unsafeUnwrap()).toBe(
        `https://www.scumware.org/report/${md5}`,
      );
    });

    it("should throw an error when given SHA256", function () {
      const sha256 =
        "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f";
      // eslint-disable-next-line neverthrow/must-use-result
      const res = subject.searchByHash(sha256);
      expect(res.isErr()).toBe(true);
    });
  });
});
