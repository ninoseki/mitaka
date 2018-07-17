import { expect } from "chai";
import "mocha";
import { PublicWWW } from "../../lib/searcher";

describe("PublicWWW", () => {
  describe("#searchByText", () => {
    it("should return URL", () => {
      const publicwww = new PublicWWW();
      expect(publicwww.searchByText("urlscan.io")).to.equal("https://publicwww.com/websites/urlscan.io");
      expect(publicwww.searchByText(" href=https://urlscan.io ")).to.
        equal("https://publicwww.com/websites/%20href%3Dhttps%3A%2F%2Furlscan.io%20");
    });
  });
});
