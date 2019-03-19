import { expect } from "chai";
import "mocha";
import { ArchiveOrg } from "../../lib/searcher";

describe("ArchiveOrg", () => {
  const subject = new ArchiveOrg();

  it("should support URL type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["url"]);
  });

  describe("#searchByURL", () => {
    it("should return URL", () => {
      expect(subject.searchByURL("https://github.com")).to.equal(
        "https://web.archive.org/web/*/https://github.com"
      );
    });
  });
});
