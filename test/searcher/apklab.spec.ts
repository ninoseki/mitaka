import { expect } from "chai";
import "mocha";
import { Apklab } from "../../src/lib/searcher";

describe("Apklab", function() {
  const subject = new Apklab();

  it("should support hash", function() {
    expect(subject.supportedTypes).to.deep.equal(["hash"]);
  });

  describe("#searchByHash", function() {
    it("should return URL", function() {
      const hash =
        "c06537ddb8c4b0c5d338b8c6c891305cceadd9845138f7a87a0b277f16654295";
      expect(subject.searchByHash(hash)).to.equal(
        "https://www.apklab.io/apk.html?hash=c06537ddb8c4b0c5d338b8c6c891305cceadd9845138f7a87a0b277f16654295"
      );
    });

    it("should throw an error", function() {
      expect(() => subject.searchByHash("foo bar")).to.throw(
        "apklab supports only SHA256 hash"
      );
    });
  });
});
