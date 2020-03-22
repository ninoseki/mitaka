import { expect } from "chai";
import "mocha";
import { AbuseIPDB } from "../../src/lib/searcher";

describe("AbuseIPDB", function () {
  const subject = new AbuseIPDB();

  it("should support IP type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://www.abuseipdb.com/check/1.1.1.1"
      );
    });
  });
});
