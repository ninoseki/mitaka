import { expect } from "chai";
import "mocha";
import { URLhaus } from "../../src/lib/searcher";

describe("URLhaus", function () {
  const subject = new URLhaus();

  it("should support IP & domain type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://urlhaus.abuse.ch/host/1.1.1.1/"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://urlhaus.abuse.ch/host/github.com/"
      );
    });
  });
});
