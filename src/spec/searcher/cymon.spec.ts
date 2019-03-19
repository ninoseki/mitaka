import { expect } from "chai";
import "mocha";
import { Cymon } from "../../lib/searcher";

describe("Cymon", () => {
  const subject = new Cymon();

  it("should support IP & Domain type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://cymon.io/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://cymon.io/domain/github.com"
      );
    });
  });
});
