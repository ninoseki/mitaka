import "mocha";

import { expect } from "chai";

import { VxCube } from "../../src/lib/searcher";

describe("VxCube", function () {
  const subject = new VxCube();

  it("should support IP, Domain & Hash type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "hash"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "http://vxcube.com/tools/ip/1.1.1.1/whois"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "http://vxcube.com/tools/domain/github.com/whois"
      );
    });
  });

  describe("#searchByHash", function () {
    it("should return URL", function () {
      expect(subject.searchByHash("44d88612fea8a8f36de82e1278abb02f")).to.equal(
        "http://vxcube.com/result/44d88612fea8a8f36de82e1278abb02f"
      );
    });
  });
});
