import { expect } from "chai";
import "mocha";
import { ThreatMiner } from "../../src/lib/searcher";

describe("ThreatMiner", function () {
  const subject = new ThreatMiner();

  it("should support IP, Domain & Emal type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "hash"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://www.threatminer.org/host.php?q=1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://www.threatminer.org/domain.php?q=github.com"
      );
    });
  });

  describe("#searchByHash", function () {
    it("should return URL", function () {
      expect(subject.searchByHash("44d88612fea8a8f36de82e1278abb02f")).to.equal(
        "https://www.threatminer.org/sample.php?q=44d88612fea8a8f36de82e1278abb02f"
      );
    });
  });
});
