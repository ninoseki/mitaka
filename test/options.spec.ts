import "mocha";

import { expect } from "chai";
import { JSDOM } from "jsdom";
import root from "window-or-global";

import {
  restoreApiKeys,
  restoreSearcherStates,
  saveApiKeys,
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

    it("should save apiKeys via chrome.storage.sync.set()", function () {
      saveApiKeys();
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
      stub.withArgs("searcherList").returns(element);
    });

    it("should save searcherStates via chrome.storage.sync.set()", function () {
      saveSearcherStates();
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

    it("should restore via chrome.storage.sync.get()", async function () {
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
      searcherList.id = "searcherList";

      const stub: sinon.SinonStub = sandbox.stub(
        root.document,
        "getElementById"
      );
      stub.withArgs("searcherList").returns(searcherList);
      stub.withArgs("checkTemplate").returns({
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

    it("should compose searcerList based on searcherStates via chrome.storage.sync.get()", async function () {
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
        "searcherList"
      ) as HTMLElement;
      const censys = searcherList.querySelector("[name=Censys]");
      expect((censys as HTMLInputElement).checked).to.be.false;
      const shodan = searcherList.querySelector("[name=Shodan]");
      expect((shodan as HTMLInputElement).checked).to.be.true;
    });
  });
});
