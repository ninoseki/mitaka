import "mocha";

import { expect } from "chai";

import { ArchiveOrg } from "../../src/lib/searcher";

describe("ArchiveOrg", function () {
  const subject = new ArchiveOrg();

  it("should support url", function () {
    expect(subject.supportedTypes).to.deep.equal(["url"]);
  });

  describe("#searchByURL", function () {
    const url = "https://github.com";
    it("should return a URL", function () {
      expect(subject.searchByURL(url)).to.equal(
        `https://web.archive.org/web/*/${url}`
      );
    });
  });
});
