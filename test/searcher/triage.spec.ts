import "mocha";

import { expect } from "chai";

import { Triage } from "../../src/lib/searcher";

describe("Triage", function () {
  const subject = new Triage();

  it("should support hash and url", function () {
    expect(subject.supportedTypes).to.deep.equal(["hash", "url"]);
  });

  describe("#searchByHash", function () {
    const hash = "44d88612fea8a8f36de82e1278abb02f";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)).to.equal(
        `https://tria.ge/s?q=${hash}`
      );
    });
  });

  describe("#searchByURL", function () {
    const url = "http://example.com";
    it("should return a URL", function () {
      expect(subject.searchByURL(url)).to.equal(
        "https://tria.ge/s?q=url%3Ahttp%3A%2F%2Fexample.com"
      );
    });
  });
});
