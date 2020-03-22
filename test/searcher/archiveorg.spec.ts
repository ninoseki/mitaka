import { expect } from "chai";
import "mocha";
import { ArchiveOrg } from "../../src/lib/searcher";

describe("ArchiveOrg", function () {
  const subject = new ArchiveOrg();

  it("should support URL type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["url"]);
  });

  describe("#searchByURL", function () {
    it("should return URL", function () {
      expect(subject.searchByURL("https://github.com")).to.equal(
        "https://web.archive.org/web/*/https://github.com"
      );
    });
  });
});
