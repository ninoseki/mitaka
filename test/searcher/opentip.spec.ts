import { expect } from "chai";
import "mocha";
import { OpenTIP } from "../../src/lib/searcher";

describe("OpenTIP", () => {
  const subject = new OpenTIP();

  it("should support hash type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["hash"]);
  });

  describe("#searchByHash", () => {
    it("should return URL", () => {
      expect(subject.searchByHash("44d88612fea8a8f36de82e1278abb02f")).to.equal(
        "https://opentip.kaspersky.com/44d88612fea8a8f36de82e1278abb02f"
      );
    });
  });
});
