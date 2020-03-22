import { expect } from "chai";
import "mocha";
import { Talos } from "../../src/lib/searcher";

describe("Talos", function () {
  const subject = new Talos();

  it("should support IP & Domain type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://talosintelligence.com/reputation_center/lookup?search=1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://talosintelligence.com/reputation_center/lookup?search=github.com"
      );
    });
  });
});
