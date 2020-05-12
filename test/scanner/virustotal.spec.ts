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
    moxios.stubRequest("https://www.virustotal.com/vtapi/v2/url/scan", {
      response: {
        permalink: `http://www.virustotal.com/foo`,
      },
      status: 200,
    });

    subject.setApiKey("foo");
  });

  afterEach(() => {
    moxios.uninstall();

    subject.setApiKey(undefined);
  });

  it("should support IP type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["url"]);
  });

  describe("#scanByURL", function () {
    it("should return a URL", async function () {
      const res = await subject.scanByURL("http://example.com");
      expect(res).to.equal("http://www.virustotal.com/foo");
    });
  });

  context("when apiKey is undefined", function () {
    it("should raise an error", async function () {
      subject.setApiKey(undefined);

      expect(subject.scanByURL("http://example.com")).to.be.rejectedWith(Error);
    });
  });
});
