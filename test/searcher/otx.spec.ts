import { expect } from "chai";
import "mocha";
import { OTX } from "../../src/lib/searcher";

describe("OTX", () => {
  const subject = new OTX();

  it("should support IP, Domain & Hash type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "hash"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://otx.alienvault.com/indicator/ip/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://otx.alienvault.com/indicator/domain/github.com"
      );
    });
  });

  describe("#searchByHash", () => {
    it("should return URL", () => {
      expect(
        subject.searchByHash("726a2eedb9df3d63ec1b4a7d774a799901f1a2b9")
      ).to.equal(
        "https://otx.alienvault.com/indicator/file/726a2eedb9df3d63ec1b4a7d774a799901f1a2b9"
      );
    });
  });
});
