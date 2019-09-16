import { expect } from "chai";
import "mocha";
import { Malshare } from "../../src/lib/searcher";

describe("Malshare", () => {
  const subject = new Malshare();

  it("should support Hash type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["hash"]);
  });

  describe("#searchByHash", () => {
    it("should return URL", () => {
      expect(subject.searchByHash("44d88612fea8a8f36de82e1278abb02f")).to.equal(
        "https://www.malshare.com/sample.php?action=detail&hash=44d88612fea8a8f36de82e1278abb02f"
      );
    });
  });
});
