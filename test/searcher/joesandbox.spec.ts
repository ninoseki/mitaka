import { expect } from "chai";
import "mocha";
import { JoeSandbox } from "../../src/lib/searcher";

describe("JoeSandbox", function () {
  const subject = new JoeSandbox();

  it("should support Hash type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["hash"]);
  });

  describe("#searchByHash", function () {
    it("should return URL", function () {
      expect(subject.searchByHash("44d88612fea8a8f36de82e1278abb02f")).to.equal(
        "https://www.joesandbox.com/search?q=44d88612fea8a8f36de82e1278abb02f"
      );
    });
  });
});
