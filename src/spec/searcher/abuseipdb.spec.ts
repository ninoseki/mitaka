import { expect } from "chai";
import "mocha";
import { AbuseIPDB } from "../../lib/searcher";

describe("AbuseIPDB", () => {
  const subject = new AbuseIPDB();

  it("should support IP type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://www.abuseipdb.com/check/1.1.1.1"
      );
    });
  });
});
