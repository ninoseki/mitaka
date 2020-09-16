import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const expect = chai.expect;

import "mocha";

import moxios from "moxios";

import { HybridAnalysis } from "../../src/lib/scanner";

describe("HybridAnalysis", function () {
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

  it("should support url", function () {
    expect(subject.supportedTypes).to.deep.equal(["url"]);
  });

  describe("#scanByURL", function () {
    it("should return a URL", async function () {
      const res = await subject.scanByURL("http://example.com");
      expect(res).to.equal("https://www.hybrid-analysis.com/sample/foo/");
    });
  });

  context("when apiKey is undefined", function () {
    it("should raise an error", function () {
      subject.setApiKey(undefined);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      expect(subject.scanByURL("http://example.com")).to.be.rejectedWith(Error);
    });
  });
});
