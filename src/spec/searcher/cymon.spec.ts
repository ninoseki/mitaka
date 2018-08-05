import { expect } from "chai";
import "mocha";
import { Cymon } from "../../lib/searcher";

describe("Cymon", () => {
  describe("#searchByIP", () => {
    it("should return URL", () => {
      const cymon = new Cymon();
      expect(cymon.searchByIP("1.1.1.1")).to.equal("https://cymon.io/1.1.1.1");
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      const cymon = new Cymon();
      expect(cymon.searchByDomain("github.com")).to.equal("https://cymon.io/domain/github.com");
    });
  });
});
