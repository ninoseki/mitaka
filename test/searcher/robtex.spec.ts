import "mocha";

import { expect } from "chai";

import { Robtex } from "@/searcher";

describe("Robtex", function () {
  const subject = new Robtex();

  it("should support domain and ip", function () {
    expect(subject.supportedTypes).to.deep.equal(["domain", "ip"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://www.robtex.com/dns-lookup/${domain}`
      );
    });
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://www.robtex.com/ip-lookup/${ip}`
      );
    });
  });
});
