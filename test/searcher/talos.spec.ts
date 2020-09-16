import "mocha";

import { expect } from "chai";

import { Talos } from "../../src/lib/searcher";

describe("Talos", function () {
  const subject = new Talos();

  it("should support ip and domain", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://talosintelligence.com/reputation_center/lookup?search=${ip}`
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://talosintelligence.com/reputation_center/lookup?search=${domain}`
      );
    });
  });
});
