import "mocha";

import { expect } from "chai";

import { Crtsh } from "../../src/lib/searcher";

describe("Crtsh", function () {
  const subject = new Crtsh();

  it("should support domain", function () {
    expect(subject.supportedTypes).to.deep.equal(["domain"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://crt.sh/?q=${domain}`
      );
    });
  });
});
