import { expect } from "chai";
import "mocha";
import { BinaryEdge } from "../../src/lib/searcher";

describe("BinaryEdge", () => {
  const subject = new BinaryEdge();

  it("should support IP & Domain type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://app.binaryedge.io/services/query?query=ip%3A%221.1.1.1%22"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://app.binaryedge.io/services/domains?query=github.com"
      );
    });
  });
});
