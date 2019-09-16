import { expect } from "chai";
import "mocha";
import { Talos } from "../../src/lib/searcher";

describe("Talos", () => {
  const subject = new Talos();

  it("should support IP & Domain type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://talosintelligence.com/reputation_center/lookup?search=1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://talosintelligence.com/reputation_center/lookup?search=github.com"
      );
    });
  });
});
