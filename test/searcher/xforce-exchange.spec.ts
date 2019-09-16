import { expect } from "chai";
import "mocha";
import { XForceExchange } from "../../src/lib/searcher";

describe("X-Force Exchange", () => {
  const subject = new XForceExchange();

  it("should support IP, Domain, Hash type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "hash"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://exchange.xforce.ibmcloud.com/ip/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://exchange.xforce.ibmcloud.com/url/github.com"
      );
    });
  });

  describe("#searchByHash", () => {
    it("should return URL", () => {
      expect(subject.searchByHash("44d88612fea8a8f36de82e1278abb02f")).to.equal(
        "https://exchange.xforce.ibmcloud.com/malware/44d88612fea8a8f36de82e1278abb02f"
      );
      expect(
        subject.searchByHash("3395856ce81f2b7382dee72602f798b642f14140")
      ).to.equal(
        "https://exchange.xforce.ibmcloud.com/malware/3395856ce81f2b7382dee72602f798b642f14140"
      );
    });
  });
});
