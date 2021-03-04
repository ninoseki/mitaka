import "mocha";

import { expect } from "chai";

import { Hashdd } from "@/searcher";

describe("Hashdd", function () {
  const subject = new Hashdd();

  it("should support ip, domain and hash", function () {
    expect(subject.supportedTypes).to.deep.equal(["hash"]);
  });

  describe("#searchByHash", function () {
    const hash = "44d88612fea8a8f36de82e1278abb02f";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)).to.equal(
        `https://hashdd.com/search/${hash}`
      );
    });
  });
});
