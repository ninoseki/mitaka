import { expect } from "chai";
import "mocha";
import { AnyRun } from "../../src/lib/searcher";

describe("AnyRun", function () {
  const subject = new AnyRun();

  it("should support hash", function () {
    expect(subject.supportedTypes).to.deep.equal(["hash"]);
  });

  describe("#searchByHash", function () {
    it("should return URL", function () {
      const hash = "8a8f93a0a4e4a709d73695accb2af068";
      expect(subject.searchByHash(hash)).to.equal(
        "https://app.any.run/submissions/#filehash:8a8f93a0a4e4a709d73695accb2af068"
      );
    });
  });
});
