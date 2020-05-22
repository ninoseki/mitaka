import "mocha";

import { expect } from "chai";

import { VirusTotal } from "../../src/lib/searcher";

describe("VirusTotal", function () {
  const subject = new VirusTotal();

  it("should support IP, Domain, URL & Hash type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "url",
      "hash",
    ]);
  });

  describe("#searchByURL", function () {
    it("should return URL", function () {
      expect(subject.searchByURL("https://virustotal.com")).to.equal(
        "https://www.virustotal.com/gui/url/77af0145fa9290ca3a4c214eb4561fc01070132300f6265e2c4cfb447372422e/details"
      );
      expect(subject.searchByURL("https://qiita.com/trend")).to.equal(
        "https://www.virustotal.com/gui/url/5dd2d006b4430a593be125eee20494016d3ac933796da6deef590c3e045a685d/details"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("virustotal.com")).to.equal(
        "https://www.virustotal.com/gui/domain/virustotal.com/details"
      );
    });
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://www.virustotal.com/gui/ip-address/1.1.1.1/details"
      );
    });
  });

  describe("#searchByHash", function () {
    it("should return URL", function () {
      expect(
        subject.searchByHash(
          "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f"
        )
      ).to.equal(
        "https://www.virustotal.com/gui/file/275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f/details"
      );
    });
  });
});
