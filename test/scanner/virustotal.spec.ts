import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const expect = chai.expect;

import "mocha";

import moxios from "moxios";

import { VirusTotal } from "../../src/lib/scanner";

describe("VirusTotal", function () {
  const subject = new VirusTotal();

  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("https://www.virustotal.com/api/v3/urls", {
      response: {
        data: {
          id:
            "u-ef8678c0f43f6142407ca89b4a376556cd4472d26b5952efa6d3821fa9fc597b-1589690619",
          type: "analysis",
        },
      },
      status: 200,
    });

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
      expect(res).to.equal(
        "https://www.virustotal.com/gui/url/ef8678c0f43f6142407ca89b4a376556cd4472d26b5952efa6d3821fa9fc597b/details"
      );
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
