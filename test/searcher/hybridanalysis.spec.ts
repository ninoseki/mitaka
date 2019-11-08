import { expect } from "chai";
import "mocha";
import { HybridAnalysis } from "../../src/lib/searcher";

describe("HybridAnalysis", () => {
  const subject = new HybridAnalysis();

  it("should support IP, URL & Hash type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "hash"]);
  });

  describe("#searchByHash", () => {
    it("should return URL", () => {
      const sha256 =
        "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f";
      expect(subject.searchByHash(sha256)).to.equal(
        `https://www.hybrid-analysis.com/search?query=${sha256}`
      );
    });
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://www.hybrid-analysis.com/search?query=host%3A1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://www.hybrid-analysis.com/search?query=domain%3Agithub.com"
      );
    });
  });
});
