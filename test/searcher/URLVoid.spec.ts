import "mocha";

import { expect } from "chai";

import { URLVoid } from "@/searcher";

describe("URLVoid", function () {
  const subject = new URLVoid();

  it("should support domain and url", function () {
    expect(subject.supportedTypes).to.deep.equal(["domain"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://www.urlvoid.com/scan/${domain}`
      );
    });
  });
});
