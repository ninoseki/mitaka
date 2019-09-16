import { expect } from "chai";
import "mocha";
import { Urlscan } from "../../src/lib/searcher";

describe("Urlscan", () => {
  const subject = new Urlscan();

  it("should support IP, Domain & URL type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "asn",
      "url",
    ]);
  });

  describe("#searchByURL", () => {
    it("should return URL", () => {
      expect(subject.searchByURL("https://urlscan.io")).to.eq(
        "https://urlscan.io/search/#%22https%3A%2F%2Furlscan.io%22"
      );
    });
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.eq(
        "https://urlscan.io/ip/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("urlscan.io")).to.eq(
        "https://urlscan.io/domain/urlscan.io"
      );
    });
  });

  describe("#searchByASN", () => {
    it("should return URL", () => {
      expect(subject.searchByASN("AS24940")).to.eq(
        "https://urlscan.io/asn/AS24940"
      );
    });
  });
});
