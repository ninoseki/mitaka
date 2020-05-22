import "mocha";

import { expect } from "chai";

import { Maltiverse } from "../../src/lib/searcher";

describe("Maltiverse", function () {
  const subject = new Maltiverse();

  it("should support Domain & Hash type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["domain", "hash"]);
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://www.maltiverse.com/search;query=domain:github.com"
      );
    });
  });

  describe("#searchByURL", function () {
    it("should return URL", function () {
      expect(subject.searchByHash("44d88612fea8a8f36de82e1278abb02")).to.equal(
        "https://www.maltiverse.com/search;query=44d88612fea8a8f36de82e1278abb02"
      );
    });
  });
});
