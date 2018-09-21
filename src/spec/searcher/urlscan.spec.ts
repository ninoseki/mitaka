import { expect } from "chai";
import "mocha";
import { Urlscan } from "../../lib/searcher";

describe("Urlscan", () => {
  const subject = new Urlscan();
  describe("#searchByURL", () => {
    it("should return URL", () => {
      expect(subject.searchByURL("https://urlscan.io")).to.
        eq("https://urlscan.io/search/#%22https%3A%2F%2Furlscan.io%22");
    });
  });
  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.eq("https://urlscan.io/search/#1.1.1.1");
    });
  });
  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("urlscan.io")).to.eq("https://urlscan.io/search/#urlscan.io");
    });
  });
});
