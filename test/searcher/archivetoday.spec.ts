import { expect } from "chai";
import "mocha";
import { ArchiveToday } from "../../src/lib/searcher";

describe("ArchiveToday", () => {
  const subject = new ArchiveToday();

  it("should support URL type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["url"]);
  });

  describe("#searchByURL", () => {
    it("should return URL", () => {
      expect(subject.searchByURL("https://github.com")).to.equal(
        "http://archive.fo/https://github.com"
      );
    });
  });
});
