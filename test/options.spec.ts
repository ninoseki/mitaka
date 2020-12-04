/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import "mocha";

import { expect } from "chai";
import { JSDOM } from "jsdom";
import root from "window-or-global";

import {
  restoreApiKeys,
  restoreGeneralSettings,
  restoreSearcherStates,
  saveApiKeys,
  saveGeneralSettings,
  saveSearcherStates,
} from "../src/options";
import { browserMock } from "./browserMock";
import sinon = require("sinon");

const sandbox = sinon.createSandbox();

describe("Options script", function () {
  afterEach(() => {
    browserMock.reset();
    sandbox.restore();
  });

  describe("#saveApiKeys", function () {
    beforeEach(() => {
      const dom = new JSDOM();
      root.document = dom.window.document;

      const input = root.document.createElement("input") as HTMLInputElement;
      input.value = "test";

      const stub: sinon.SinonStub = sandbox.stub(
        root.document,
        "getElementById"
      );
      stub.withArgs("hybridanalysis-api-key").returns(input);
      stub.withArgs("urlscan-api-key").returns(input);
      stub.withArgs("virustotal-api-key").returns(input);
    });

    it("should save apiKeys via chrome.storage.sync.set", async function () {
      await saveApiKeys();
      browserMock.storage.sync.set.assertCalls([
        [
          {
            apiKeys: {
              hybridAnalysisApiKey: "test",
              urlscanApiKey: "test",
              virusTotalApiKey: "test",
            },
          },
        ],
      ]);
    });
  });

  describe("#saveSearcherStates", function () {
    beforeEach(() => {
      const dom = new JSDOM();
      root.document = dom.window.document;

      const radio1 = root.document.createElement("input") as HTMLInputElement;
      radio1.name = "test1";
      radio1.type = "checkbox";
      radio1.checked = true;
      const radio2 = root.document.createElement("input") as HTMLInputElement;
      radio2.name = "test2";
      radio2.type = "checkbox";
      radio2.checked = true;
      const element = root.document.createElement("div") as HTMLElement;
      element.appendChild(radio1);
      element.appendChild(radio2);

      const stub: sinon.SinonStub = sandbox.stub(
        root.document,
        "getElementById"
      );
      stub.withArgs("searcher-list").returns(element);
    });

    it("should save searcherStates via chrome.storage.sync.set", async function () {
      await saveSearcherStates();
      browserMock.storage.sync.set.assertCalls([
        [
          {
            searcherStates: {
              test1: true,
              test2: true,
            },
          },
        ],
      ]);
    });
  });

  describe("#saveGeneralSettings", function () {
    beforeEach(() => {
      const dom = new JSDOM();
      root.document = dom.window.document;

      const input = root.document.createElement("input") as HTMLInputElement;
      input.type = "checkbox";
      input.checked = true;

      const stub: sinon.SinonStub = sandbox.stub(
        root.document,
        "getElementById"
      );
      stub.withArgs("enable-idn").returns(input);
      stub.withArgs("strict-tld").returns(input);
    });

    it("should save generalSettings via chrome.storage.sync.set", async function () {
      await saveGeneralSettings();
      browserMock.storage.sync.set.assertCalls([
        [
          {
            generalSettings: {
              enableIDN: true,
              strictTLD: true,
            },
          },
        ],
      ]);
    });
  });

  describe("#restoreApiKeys", function () {
    beforeEach(() => {
      const dom = new JSDOM();
      root.document = dom.window.document;

      const hybridAanalysisApiKey = root.document.createElement(
        "input"
      ) as HTMLInputElement;
      hybridAanalysisApiKey.value = "test";
      const urlscanApiKey = root.document.createElement(
        "input"
      ) as HTMLInputElement;
      urlscanApiKey.value = "test";
      const virusTotalApiKey = root.document.createElement(
        "input"
      ) as HTMLInputElement;
      virusTotalApiKey.value = "test";

      const stub: sinon.SinonStub = sandbox.stub(
        root.document,
        "getElementById"
      );
      stub.withArgs("hybridanalysis-api-key").returns(hybridAanalysisApiKey);
      stub.withArgs("urlscan-api-key").returns(urlscanApiKey);
      stub.withArgs("virustotal-api-key").returns(virusTotalApiKey);
    });

    it("should restore apiKeys via chrome.storage.sync.get", async function () {
      sandbox
        .stub(browserMock.storage.sync, "get")
        .withArgs("apiKeys")
        .resolves({
          apiKeys: {
            hybridAanalysisApiKey: "test",
            urlscanApiKey: "test1",
            virusTotalApiKey: "test2",
          },
        });

      await restoreApiKeys();

      const hybridAanalysisApiKey = root.document.getElementById(
        "hybridanalysis-api-key"
      ) as HTMLInputElement;
      expect(hybridAanalysisApiKey.value).to.equal("test");
      const urlscanApiKey = root.document.getElementById(
        "urlscan-api-key"
      ) as HTMLInputElement;
      expect(urlscanApiKey.value).to.equal("test1");
      const virusTotalApiKey = root.document.getElementById(
        "virustotal-api-key"
      ) as HTMLInputElement;
      expect(virusTotalApiKey.value).to.equal("test2");
    });
  });

  describe("#restoreSearcherStates", function () {
    beforeEach(() => {
      const dom = new JSDOM();
      root.document = dom.window.document;

      const searcherList = root.document.createElement("div") as HTMLElement;
      searcherList.id = "searcher-list";

      const stub: sinon.SinonStub = sandbox.stub(
        root.document,
        "getElementById"
      );
      stub.withArgs("searcher-list").returns(searcherList);
      stub.withArgs("check-template").returns({
        innerHTML: `
        <div class="field has-addons">
          <div class="control is-expanded">
            <div>
              <label class="label">{{name}}</label>
              <span>Supported types: {{supportedTypes}}</span>
            </div>
          </div>
          <div class="control">
            <input name="{{name}}" type="checkbox" {{#isEnabled}}checked="checked" {{/isEnabled}}>
            <label>Enable</label>
          </div>
        </div>`,
      });
    });

    it("should compose a searcerList based on searcherStates via chrome.storage.sync.get", async function () {
      sandbox
        .stub(browserMock.storage.sync, "get")
        .withArgs("searcherStates")
        .resolves({
          searcherStates: {
            Censys: false,
          },
        });

      await restoreSearcherStates();

      const searcherList = root.document.getElementById(
        "searcher-list"
      ) as HTMLElement;
      const censys = searcherList.querySelector("[name=Censys]");
      expect((censys as HTMLInputElement).checked).to.be.false;
      const shodan = searcherList.querySelector("[name=Shodan]");
      expect((shodan as HTMLInputElement).checked).to.be.true;
    });
  });

  describe("#restoreApiKeys", function () {
    beforeEach(() => {
      const dom = new JSDOM();
      root.document = dom.window.document;

      const hybridAanalysisApiKey = root.document.createElement(
        "input"
      ) as HTMLInputElement;
      hybridAanalysisApiKey.value = "test";
      const urlscanApiKey = root.document.createElement(
        "input"
      ) as HTMLInputElement;
      urlscanApiKey.value = "test";
      const virusTotalApiKey = root.document.createElement(
        "input"
      ) as HTMLInputElement;
      virusTotalApiKey.value = "test";

      const stub: sinon.SinonStub = sandbox.stub(
        root.document,
        "getElementById"
      );
      stub.withArgs("hybridanalysis-api-key").returns(hybridAanalysisApiKey);
      stub.withArgs("urlscan-api-key").returns(urlscanApiKey);
      stub.withArgs("virustotal-api-key").returns(virusTotalApiKey);
    });

    it("should restore apiKeys via chrome.storage.sync.get", async function () {
      sandbox
        .stub(browserMock.storage.sync, "get")
        .withArgs("apiKeys")
        .resolves({
          apiKeys: {
            hybridAanalysisApiKey: "test",
            urlscanApiKey: "test1",
            virusTotalApiKey: "test2",
          },
        });

      await restoreApiKeys();

      const hybridAanalysisApiKey = root.document.getElementById(
        "hybridanalysis-api-key"
      ) as HTMLInputElement;
      expect(hybridAanalysisApiKey.value).to.equal("test");
      const urlscanApiKey = root.document.getElementById(
        "urlscan-api-key"
      ) as HTMLInputElement;
      expect(urlscanApiKey.value).to.equal("test1");
      const virusTotalApiKey = root.document.getElementById(
        "virustotal-api-key"
      ) as HTMLInputElement;
      expect(virusTotalApiKey.value).to.equal("test2");
    });
  });

  describe("#restoreGeneralSettings", function () {
    beforeEach(() => {
      const dom = new JSDOM();
      root.document = dom.window.document;

      const wrapper = root.document.createElement("div") as HTMLElement;
      wrapper.id = "general-settings";

      const stub: sinon.SinonStub = sandbox.stub(
        root.document,
        "getElementById"
      );
      stub.withArgs("general-settings").returns(wrapper);
      stub.withArgs("general-settings-template").returns({
        innerHTML: `<input id="enable-idn" type="checkbox" {{#enableIDN}}checked="checked"{{/enableIDN}}><input id="strict-tld" type="checkbox" {{#strictTLD}}checked="checked"{{/strictTLD}}>`,
      });
    });

    it("should compose general-settings based on generalSettings via chrome.storage.sync.get", async function () {
      sandbox
        .stub(browserMock.storage.sync, "get")
        .withArgs("generalSettings")
        .resolves({
          generalSettings: {
            enableIDN: true,
            strictTLD: true,
          },
        });

      await restoreGeneralSettings();

      const generalSettings = root.document.getElementById(
        "general-settings"
      ) as HTMLElement;

      const enableIDN = generalSettings.querySelector(
        "input#enable-idn"
      ) as HTMLInputElement;
      expect(enableIDN.checked).to.equal(true);

      const strictTLD = generalSettings.querySelector(
        "input#strict-tld"
      ) as HTMLInputElement;
      expect(strictTLD.checked).to.equal(true);
    });
  });
});
