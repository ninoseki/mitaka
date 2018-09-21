import { expect } from "chai";
import "mocha";
import { Pipl } from "../../lib/searcher";

describe("Pipl", () => {
  const subject = new Pipl();
  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.searchByEmail("test@test.com")).to.equal("https://pipl.com/search/?q=test%40test.com");
    });
  });
});
