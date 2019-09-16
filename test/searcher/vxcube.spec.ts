import { expect } from "chai";
import "mocha";
import { VxCube } from "../../src/lib/searcher";

describe("VxCube", () => {
  const subject = new VxCube();

  it("should support IP, Domain & Hash type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "hash"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "http://vxcube.com/tools/ip/1.1.1.1/whois"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "http://vxcube.com/tools/domain/github.com/whois"
      );
    });
  });

  describe("#searchByHash", () => {
    it("should return URL", () => {
      expect(subject.searchByHash("44d88612fea8a8f36de82e1278abb02f")).to.equal(
        "http://vxcube.com/result/44d88612fea8a8f36de82e1278abb02f"
      );
    });
  });
});
