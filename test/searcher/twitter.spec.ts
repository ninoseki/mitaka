import "mocha";

import { expect } from "chai";

import { Twitter } from "../../src/lib/searcher";

describe("Twitter", function () {
  const subject = new Twitter();

  it("should support text type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["text"]);
  });

  describe("#searchByText", function () {
    it("should return URL", function () {
      expect(subject.searchByText("urlscan.io")).to.equal(
        "https://twitter.com/search?q=urlscan.io"
      );
    });
  });
});
