import "mocha";

import { expect } from "chai";

import { Urlscan } from "../../src/lib/searcher";

describe("Urlscan", function () {
  const subject = new Urlscan();

  it("should support IP, Domain & URL type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "asn",
      "url",
    ]);
  });

  describe("#searchByURL", function () {
    it("should return URL", function () {
      expect(subject.searchByURL("https://github.com")).to.eq(
        "https://urlscan.io/search/#page.url%3A%22https%3A%2F%2Fgithub.com%22%20OR%20task.url%3A%22https%3A%2F%2Fgithub.com%22"
      );
    });
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.eq(
        "https://urlscan.io/ip/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("urlscan.io")).to.eq(
        "https://urlscan.io/domain/urlscan.io"
      );
    });
  });

  describe("#searchByASN", function () {
    it("should return URL", function () {
      expect(subject.searchByASN("AS24940")).to.eq(
        "https://urlscan.io/asn/AS24940"
      );
    });
  });
});
