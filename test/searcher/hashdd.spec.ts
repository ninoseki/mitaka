import { expect } from "chai";
import "mocha";
import { Hashdd } from "../../src/lib/searcher";

describe("Hashdd", () => {
  const subject = new Hashdd();

  it("should support IP, domain, URL and hash type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "hash"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://hashdd.com/i/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://hashdd.com/i/github.com"
      );
    });
  });

  describe("#searchByHash", () => {
    it("should return URL", () => {
      expect(subject.searchByHash("44d88612fea8a8f36de82e1278abb02f")).to.equal(
        "https://hashdd.com/i/44d88612fea8a8f36de82e1278abb02f"
      );
    });
  });
});
