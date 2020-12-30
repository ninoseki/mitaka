import "mocha";

import { expect } from "chai";

import { VMRay } from "@/searcher";

describe("VMRay", function () {
  const subject = new VMRay();

  it("should support hash", function () {
    expect(subject.supportedTypes).to.deep.equal(["hash"]);
  });

  describe("#searchByHash", function () {
    const sha256 =
      "4e38fd97f1d64237659653a6f82e1d144636e69671c7e07ca7137bc59823c4d3";
    const md5 = "5584cd3c99cde56e459f30eec3bb470b";

    it("should return a URL", function () {
      expect(subject.searchByHash(sha256)).to.equal(
        "https://www.vmray.com/analyses/4e38fd97f1d6/report/overview.html"
      );
    });

    it("should throw an error when given hash which is not SHA256", function () {
      expect(() => {
        subject.searchByHash(md5);
      }).to.throw("VMRay supports SHA256 hash only");
    });
  });
});
