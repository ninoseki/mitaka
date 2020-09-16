import "mocha";

import { expect } from "chai";

import { OCCRP } from "../../src/lib/searcher";

describe("OCCRP", function () {
  const subject = new OCCRP();

  it("should support email", function () {
    expect(subject.supportedTypes).to.deep.equal(["email"]);
  });

  describe("#searchByEmail", function () {
    const email = "test@test.com";
    it("should return a URL", function () {
      expect(subject.searchByEmail(email)).to.equal(
        "https://data.occrp.org/search?facet=email&filter%3Aemails=test%40test.com"
      );
    });
  });
});
