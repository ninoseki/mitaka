import "mocha";

import { expect } from "chai";

import { Robtex } from "../../src/lib/searcher";

describe("Robtex", function () {
  const subject = new Robtex();

  it("should support Domain, IP type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["domain", "ip"]);
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://www.robtex.com/dns-lookup/github.com"
      );
    });
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://www.robtex.com/ip-lookup/1.1.1.1"
      );
    });
  });

});
