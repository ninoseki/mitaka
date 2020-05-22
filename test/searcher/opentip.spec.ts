import "mocha";

import { expect } from "chai";

import { OpenTIP } from "../../src/lib/searcher";

describe("OpenTIP", function () {
  const subject = new OpenTIP();

  it("should support hash type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["hash"]);
  });

  describe("#searchByHash", function () {
    it("should return URL", function () {
      expect(subject.searchByHash("44d88612fea8a8f36de82e1278abb02f")).to.equal(
        "https://opentip.kaspersky.com/44d88612fea8a8f36de82e1278abb02f"
      );
    });
  });
});
