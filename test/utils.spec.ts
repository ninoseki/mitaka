/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import "mocha";

import { expect } from "chai";
import { JSDOM } from "jsdom";
import root from "window-or-global";

import { getConfig } from "../src/utility";
import { browserMock } from "./browserMock";
import sinon = require("sinon");

const sandbox = sinon.createSandbox();

describe("Utility", function () {
  afterEach(() => {
    browserMock.reset();
    sandbox.restore();
  });

  describe("#getConfig", function () {
    it("should compose a config based on a value via chrome.storage.sync.get", async function () {
      sandbox
        .stub(browserMock.storage.sync, "get")
        .withArgs(["searcherStates", "generalSettings"])
        .resolves({
          searcherStates: {
            Censys: true,
          },
          generalSettings: {
            enableIDN: true,
            strictTLD: true,
          },
        });

      const config = await getConfig();
      expect(config.generalSettings.enableIDN).to.be.true;
      expect(config.generalSettings.strictTLD).to.be.true;
      expect(config.searcherStates["Censys"]).to.be.true;
      expect(config.searcherStates["404"]).to.be.undefined;
    });
  });
});
