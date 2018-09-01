import { expect } from "chai";
import "mocha";
import { Pipl } from "../../lib/searcher";

describe("Pipl", () => {
  describe("#searchByEmail", () => {
    it("should return URL", () => {
      const pipl = new Pipl();
      expect(pipl.searchByEmail("test@test.com")).to.equal("https://pipl.com/search/?q=test%40test.com");
    });
  });
});
