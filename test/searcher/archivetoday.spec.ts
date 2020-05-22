import "mocha";

import { expect } from "chai";

import { ArchiveToday } from "../../src/lib/searcher";

describe("ArchiveToday", function () {
  const subject = new ArchiveToday();

  it("should support URL type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["url"]);
  });

  describe("#searchByURL", function () {
    it("should return URL", function () {
      expect(subject.searchByURL("https://github.com")).to.equal(
        "http://archive.fo/https://github.com"
      );
    });
  });
});
