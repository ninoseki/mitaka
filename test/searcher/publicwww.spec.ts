import { expect } from "chai";
import "mocha";
import { PublicWWW } from "../../src/lib/searcher";

describe("PublicWWW", () => {
  const subject = new PublicWWW();

  it("should support text type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["text"]);
  });

  describe("#searchByText", () => {
    it("should return URL", () => {
      expect(subject.searchByText("urlscan.io")).to.equal(
        "https://publicwww.com/websites/urlscan.io"
      );
      expect(subject.searchByText(" href=https://urlscan.io ")).to.equal(
        "https://publicwww.com/websites/%20href%3Dhttps%3A%2F%2Furlscan.io%20"
      );
    });
  });
});
