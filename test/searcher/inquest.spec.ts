import { expect } from "chai";
import "mocha";
import { InQuest } from "../../src/lib/searcher";

describe("InQuest", function () {
  const subject = new InQuest();

  it("should support Hash type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["hash"]);
  });

  describe("#searchByHash", function () {
    it("should return URL", function () {
      const hash =
        "794374d3e3bd6f2bb232f61d2922d9dae3f78f864a2941f3b76157f82a3e6017";
      expect(subject.searchByHash(hash)).to.equal(
        "https://labs.inquest.net/dfi/sha256/794374d3e3bd6f2bb232f61d2922d9dae3f78f864a2941f3b76157f82a3e6017"
      );
    });

    it("should throw an error when given hash which is not SHA256", function () {
      expect(() => {
        subject.searchByHash("5584cd3c99cde56e459f30eec3bb470b");
      }).to.throw("InQuest supports SHA256 hash only");
    });
  });
});
