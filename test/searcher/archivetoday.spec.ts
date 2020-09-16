import "mocha";

import { expect } from "chai";

import { ArchiveToday } from "../../src/lib/searcher";

describe("ArchiveToday", function () {
  const subject = new ArchiveToday();

  it("should support url", function () {
    expect(subject.supportedTypes).to.deep.equal(["url"]);
  });

  describe("#searchByURL", function () {
    const url = "https://github.com";
    it("should return a URL", function () {
      expect(subject.searchByURL(url)).to.equal(`http://archive.fo/${url}`);
    });
  });
});
