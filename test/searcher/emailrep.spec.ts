import "mocha";

import { expect } from "chai";

import { EmailRep } from "../../src/lib/searcher";

describe("EmailRep", function () {
  const subject = new EmailRep();

  it("should support Email type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["email"]);
  });

  describe("#searchByEmail", function () {
    it("should return URL", function () {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://emailrep.io/test@test.com"
      );
    });
  });
});
