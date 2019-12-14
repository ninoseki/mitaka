import { expect } from "chai";
import "mocha";
import * as moxios from "moxios";

import { HybridAnalysis } from "../../src/lib/scanner";

describe("HybridAnalysis", function() {
  const subject = new HybridAnalysis();

  beforeEach(() => {
    moxios.install();
    moxios.stubRequest(
      "https://www.hybrid-analysis.com/api/v2/quick-scan/url",
      {
        response: {
          sha256: "foo",
        },
        status: 200,
      }
    );

    subject.setApiKey("foo");
  });

  afterEach(() => {
    moxios.uninstall();

    subject.setApiKey(undefined);
  });

  it("should support IP type IOC", function() {
    expect(subject.supportedTypes).to.deep.equal(["url"]);
  });

  describe("#scanByURL", function() {
    it("should return a URL", async function() {
      const res = await subject.scanByURL("http://example.com");
      expect(res).to.equal("https://www.hybrid-analysis.com/sample/foo/");
    });
  });
});
