import { expect } from "chai";
import "mocha";
import { WeLeakInfo } from "../../src/lib/searcher";

describe("WeLeakInfo", function() {
  const subject = new WeLeakInfo();

  it("should support Email type IOC", function() {
    expect(subject.supportedTypes).to.deep.equal(["email"]);
  });

  describe("#searchByEmail", function() {
    it("should return URL", function() {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://weleakinfo.com/search?type=email&query=test%40test.com"
      );
    });
  });
});
