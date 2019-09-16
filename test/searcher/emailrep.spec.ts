import { expect } from "chai";
import "mocha";
import { EmailRep } from "../../src/lib/searcher";

describe("EmailRep", () => {
  const subject = new EmailRep();

  it("should support Email type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["email"]);
  });

  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://emailrep.io/test@test.com"
      );
    });
  });
});
