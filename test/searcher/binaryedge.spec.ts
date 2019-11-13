import { expect } from "chai";
import "mocha";
import { BinaryEdge } from "../../src/lib/searcher";

describe("BinaryEdge", function() {
  const subject = new BinaryEdge();

  it("should support IP & Domain type IOC", function() {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", function() {
    it("should return URL", function() {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://app.binaryedge.io/services/query?query=ip%3A%221.1.1.1%22"
      );
    });
  });

  describe("#searchByDomain", function() {
    it("should return URL", function() {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://app.binaryedge.io/services/domains?query=github.com"
      );
    });
  });
});
