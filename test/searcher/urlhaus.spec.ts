import "mocha";

import { expect } from "chai";

import { URLhaus } from "@/searcher";

describe("URLhaus", function () {
  const subject = new URLhaus();

  it("should support ip and domain", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://urlhaus.abuse.ch/host/${ip}/`
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://urlhaus.abuse.ch/host/${domain}/`
      );
    });
  });
});
