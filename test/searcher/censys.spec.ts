import "mocha";

import { expect } from "chai";

import { Censys } from "../../src/lib/searcher";

describe("Censys", function () {
  const subject = new Censys();

  it("should support text type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "asn",
      "text",
    ]);
  });

  describe("#searchByText", function () {
    it("should return URL", function () {
      expect(subject.searchByText("urlscan.io")).to.equal(
        "https://censys.io/ipv4?q=urlscan.io"
      );
    });
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://censys.io/ipv4/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://censys.io/domain/github.com"
      );
    });
  });

  describe("#searchByASN", function () {
    it("should return URL", function () {
      expect(subject.searchByASN("AS13335")).to.equal(
        "https://censys.io/ipv4?q=autonomous_system.asn%3A13335"
      );
    });
  });
});
