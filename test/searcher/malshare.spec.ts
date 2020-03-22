import { expect } from "chai";
import "mocha";
import { Malshare } from "../../src/lib/searcher";

describe("Malshare", function () {
  const subject = new Malshare();

  it("should support Hash type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["hash"]);
  });

  describe("#searchByHash", function () {
    it("should return URL", function () {
      expect(subject.searchByHash("44d88612fea8a8f36de82e1278abb02f")).to.equal(
        "https://www.malshare.com/sample.php?action=detail&hash=44d88612fea8a8f36de82e1278abb02f"
      );
    });
  });
});
