import { expect } from "chai";
import "mocha";
import { HybridAnalysis } from "../../lib/searcher";

describe("HybridAnalysis", () => {
  const subject = new HybridAnalysis();
  describe("#searchByHash", () => {
    it("should return URL", () => {
      const sha256 = "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f";
      expect(subject.supportedTypes.indexOf("hash")).not.equal(-1);
      expect(subject.searchByHash(sha256)).to.equal(`https://www.hybrid-analysis.com/sample/${sha256}`);
    });

    it("should throw an error when given a not SHA256 value", () => {
      const md5 = "44d88612fea8a8f36de82e1278abb02f";
      expect(() => {
        subject.searchByHash(md5);
      }).to.throw("HybridAnalysis onlys suports SHA256");
    });
  });
});
