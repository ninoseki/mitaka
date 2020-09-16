import "mocha";

import { expect } from "chai";

import { Maltiverse } from "../../src/lib/searcher";

describe("Maltiverse", function () {
  const subject = new Maltiverse();

  it("should support domain and hash", function () {
    expect(subject.supportedTypes).to.deep.equal(["domain", "hash"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://www.maltiverse.com/search;query=domain:${domain}`
      );
    });
  });

  describe("#searchByHash", function () {
    const hash = "44d88612fea8a8f36de82e1278abb02";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)).to.equal(
        `https://www.maltiverse.com/search;query=${hash}`
      );
    });
  });
});
