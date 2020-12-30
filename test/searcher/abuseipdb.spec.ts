import "mocha";

import { expect } from "chai";

import { AbuseIPDB } from "@/searcher";

describe("AbuseIPDB", function () {
  const subject = new AbuseIPDB();

  it("should support ip", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://www.abuseipdb.com/check/${ip}`
      );
    });
  });
});
