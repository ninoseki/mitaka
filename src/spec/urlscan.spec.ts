import { expect } from "chai";
import "mocha";
import { Urlscan } from "../lib/urlscan";

describe("Urlscan", () => {
  const urlscan = new Urlscan("dummy");
  describe("#searchByURL", () => {
    it("should return URL", () => {
      expect(urlscan.searchByURL("https://urlscan.io")).to.
        eq("https://urlscan.io/search/#%22https%3A%2F%2Furlscan.io%22");
      expect(urlscan.searchByDomain("urlscan.io")).to.eq("https://urlscan.io/search/#urlscan.io");
      expect(urlscan.searchByIP("1.1.1.1")).to.eq("https://urlscan.io/search/#1.1.1.1");
    });
  });
  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(urlscan.searchByIP("1.1.1.1")).to.eq("https://urlscan.io/search/#1.1.1.1");
    });
  });
  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(urlscan.searchByDomain("urlscan.io")).to.eq("https://urlscan.io/search/#urlscan.io");
    });
  });
});
