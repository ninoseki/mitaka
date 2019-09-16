import { expect } from "chai";
import "mocha";
import { OCCRP } from "../../src/lib/searcher";

describe("OCCRP", () => {
  const subject = new OCCRP();

  it("should support Email type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["email"]);
  });

  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://data.occrp.org/search?facet=email&filter%3Aemails=test%40test.com"
      );
    });
  });
});
