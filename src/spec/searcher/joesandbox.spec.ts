import { expect } from "chai";
import "mocha";
import { JoeSandbox } from "../../lib/searcher";

describe("JoeSandbox", () => {
  const subject = new JoeSandbox();

  it("should support Hash type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["hash"]);
  });

  describe("#searchByHash", () => {
    it("should return URL", () => {
      expect(subject.searchByHash("44d88612fea8a8f36de82e1278abb02f")).to.equal(
        "https://www.joesandbox.com/search?q=44d88612fea8a8f36de82e1278abb02f"
      );
    });
  });
});
