import { expect } from "chai";
import "mocha";
import { Censys } from "../../lib/searcher";

describe("Censys", () => {
  const subject = new Censys();
  describe("#searchByText", () => {
    it("should return URL", () => {
      expect(subject.searchByText("urlscan.io")).to.equal("https://censys.io/ipv4?q=urlscan.io");
    });
  });
});
