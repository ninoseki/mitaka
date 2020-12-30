import "mocha";

import { expect } from "chai";

import { TIP } from "@/searcher";

describe("TIP", function () {
  const subject = new TIP();

  it("should support ip and domain", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://threatintelligenceplatform.com/report/${ip}/`
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://threatintelligenceplatform.com/report/${domain}/`
      );
    });
  });
});
