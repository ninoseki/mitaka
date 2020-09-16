import "mocha";

import { expect } from "chai";

import { Hashdd } from "../../src/lib/searcher";

describe("Hashdd", function () {
  const subject = new Hashdd();

  it("should support ip, domain and hash", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "hash"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(`https://hashdd.com/i/${ip}`);
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://hashdd.com/i/${domain}`
      );
    });
  });

  describe("#searchByHash", function () {
    const hash = "44d88612fea8a8f36de82e1278abb02f";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)).to.equal(
        `https://hashdd.com/i/${hash}`
      );
    });
  });
});
