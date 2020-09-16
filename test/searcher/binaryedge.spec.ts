import "mocha";

import { expect } from "chai";

import { BinaryEdge } from "../../src/lib/searcher";

describe("BinaryEdge", function () {
  const subject = new BinaryEdge();

  it("should support ip and domain", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        "https://app.binaryedge.io/services/query?query=ip%3A%221.1.1.1%22"
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://app.binaryedge.io/services/domains?query=${domain}`
      );
    });
  });
});
