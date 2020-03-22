import { expect } from "chai";
import "mocha";
import { Shodan } from "../../src/lib/searcher";

describe("Shodan", function () {
  const subject = new Shodan();

  it("should support text type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "asn"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://www.shodan.io/host/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://www.shodan.io/search?query=hostname%3Agithub.com"
      );
    });
  });

  describe("#searchByASN", function () {
    it("should return URL", function () {
      expect(subject.searchByASN("AS13335")).to.equal(
        "https://www.shodan.io/search?query=asn%3AAS13335"
      );
    });
  });
});
