import "mocha";

import { expect } from "chai";

import { Crtsh } from "../../src/lib/searcher";

describe("Crtsh", function () {
  const subject = new Crtsh();

  it("should support Domain type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["domain"]);
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://crt.sh/?q=github.com"
      );
    });
  });
});
