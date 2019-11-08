import { expect } from "chai";
import "mocha";
import { Scumware } from "../../src/lib/searcher";

describe("Scumware", () => {
  const subject = new Scumware();

  it("should support Domain, IP, file hash type IOCs", () => {
    expect(subject.supportedTypes).to.deep.equal(["domain", "ip", "hash"]);
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://www.scumware.org/report/github.com"
      );
    });
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("1.1.1.1")).to.equal(
        "https://www.scumware.org/report/1.1.1.1"
      );
    });
  });

  describe("#searchByHash", () => {
    it("should return URL", () => {
      const md5 = "44d88612fea8a8f36de82e1278abb02f";
      expect(subject.searchByHash(md5)).to.equal(
        `https://www.scumware.org/report/${md5}`
      );
    });

    it("should throw an error when given hash not MD5", () => {
        const sha256 = "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f";
        expect(() => {
          subject.searchByHash(sha256);
        }).to.throw("Scumware supports only MD5 hashes");
      });
  });

});
