import { expect } from "chai";
import "mocha";
import { IntelligenceX, Maltiverse } from "../../lib/searcher";

describe("Maltiverse", () => {
  const subject = new Maltiverse();

  it("should support Domain & Hash type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["domain", "hash"]);
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal("https://www.maltiverse.com/search;query=domain:github.com");
    });
  });

  describe("#searchByURL", () => {
    it("should return URL", () => {
      expect(subject.searchByHash("44d88612fea8a8f36de82e1278abb02")).to.equal("https://www.maltiverse.com/search;query=44d88612fea8a8f36de82e1278abb02");
    });
  });
});
