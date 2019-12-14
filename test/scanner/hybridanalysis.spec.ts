import { expect } from "chai";
import "mocha";
import * as moxios from "moxios";

import { HybridAnalysis } from "../../src/lib/scanner";

describe("HybridAnalysis", function() {
  const subject = new HybridAnalysis();

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should support IP type IOC", function() {
    expect(subject.supportedTypes).to.deep.equal(["url"]);
  });

  describe("#scanByURL", function() {
    before(() => {
      subject.setApiKey("foo");
    });

    after(() => {
      subject.setApiKey(undefined);
    });

    it("should return a URL", async function() {
      moxios.stubRequest(
        "https://www.hybrid-analysis.com/api/v2/quick-scan/url",
        {
          response: {
            sha256: "foo",
          },
          status: 200,
        }
      );

      const res = await subject.scanByURL("http://example.com");
      expect(res).to.equal("https://www.hybrid-analysis.com/sample/foo/");
    });
  });
});
