import { expect } from "chai";
import "mocha";
import { Intezer } from "../../src/lib/searcher";

describe("Intezer", function() {
  const subject = new Intezer();

  it("should support Hash type IOC", function() {
    expect(subject.supportedTypes).to.deep.equal(["hash"]);
  });

  describe("#searchByHash", function() {
    it("should return URL", function() {
      const hash =
        "794374d3e3bd6f2bb232f61d2922d9dae3f78f864a2941f3b76157f82a3e6017";
      expect(subject.searchByHash(hash)).to.equal(
        "https://analyze.intezer.com/#/files/794374d3e3bd6f2bb232f61d2922d9dae3f78f864a2941f3b76157f82a3e6017"
      );
    });
  });
});
