import { expect } from "chai";
import { JSDOM } from "jsdom";
import "mocha";
import sinon = require("sinon");
import SinonChrome = require("sinon-chrome");
import * as root from "window-or-global";

import {
  restoreApiKeys,
  restoreSearcherStates,
  saveApiKeys,
  saveSearcherStates,
} from "../options";

describe("Options script", () => {
  beforeEach(() => {
    root.chrome = SinonChrome;
  });
  afterEach(() => {
    root.chrome.flush();
    delete root.chrome;
  });
  describe("#saveApiKeys", () => {
    beforeEach(() => {
      const dom = new JSDOM();
      root.document = dom.window.document;

      const input = root.document.createElement("input") as HTMLInputElement;
      input.value = "test";

      const stub: sinon.SinonStub = sinon.stub(root.document, "getElementById");
      stub.withArgs("urlscan-api-key").returns(input);
      stub.withArgs("virustotal-api-key").returns(input);
    });
    afterEach(() => {
      (root.document.getElementById as sinon.SinonStub).restore();
    });
    it("should save apiKeys via chrome.storage.sync.set()", () => {
      expect(root.chrome.storage.sync.set.notCalled).to.be.true;
      saveApiKeys();
      expect(root.chrome.storage.sync.set.withArgs({
        apiKeys: {
          urlscanApiKey: "test",
          virusTotalApiKey: "test",
        },
      }).calledOnce).to.be.true;
    });
  });
  describe("#saveSearcherStates", () => {
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

      const stub: sinon.SinonStub = sinon.stub(root.document, "getElementById");
      stub.withArgs("searcherList").returns(element);
    });
    afterEach(() => {
      (root.document.getElementById as sinon.SinonStub).restore();
    });
    it("should save searcherStates via chrome.storage.sync.set()", () => {
      expect(root.chrome.storage.sync.set.notCalled).to.be.true;
      saveSearcherStates();
      expect(root.chrome.storage.sync.set.withArgs({
        searcherStates: {
          test1: true,
          test2: true,
        },
      }).calledOnce).to.be.true;
    });
  });
  describe("#restoreApiKeys", () => {
    beforeEach(() => {
      const dom = new JSDOM();
      root.document = dom.window.document;

      const urlscanApiKey = root.document.createElement("input") as HTMLInputElement;
      urlscanApiKey.value = "test";
      const virusTotalApiKey = root.document.createElement("input") as HTMLInputElement;
      virusTotalApiKey.value = "test";

      const stub: sinon.SinonStub = sinon.stub(root.document, "getElementById");
      stub.withArgs("urlscan-api-key").returns(urlscanApiKey);
      stub.withArgs("virustotal-api-key").returns(virusTotalApiKey);
    });
    afterEach(() => {
      (root.document.getElementById as sinon.SinonStub).restore();
    });
    it("should restore via chrome.storage.sync.get()", async () => {
      root.chrome.storage.sync.get.withArgs("apiKeys").yieldsAsync({
        apiKeys: {
          urlscanApiKey: "test1",
          virusTotalApiKey: "test2",
        },
      });

      expect(root.chrome.storage.sync.get.notCalled).to.be.true;
      await restoreApiKeys();
      expect(root.chrome.storage.sync.get.calledOnce).to.be.true;
      const urlscanApiKey = root.document.getElementById("urlscan-api-key") as HTMLInputElement;
      expect(urlscanApiKey.value).to.equal("test1");
      const virusTotalApiKey = root.document.getElementById("virustotal-api-key") as HTMLInputElement;
      expect(virusTotalApiKey.value).to.equal("test2");
    });
  });
  describe("#restoreSearcherStates", () => {
    beforeEach(() => {
      const dom = new JSDOM();
      root.document = dom.window.document;

      const searcherList = root.document.createElement("div") as HTMLElement;;
      searcherList.id = "searcherList";

      const stub: sinon.SinonStub = sinon.stub(root.document, "getElementById");
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
    afterEach(() => {
      (root.document.getElementById as sinon.SinonStub).restore();
    });
    it("should compose searcerList based on searcherStates via chrome.storage.sync.get()", async () => {
      root.chrome.storage.sync.get.withArgs("searcherStates").yieldsAsync({
        searcherStates: {
          Censys: false,
        },
      });
      expect(root.chrome.storage.sync.get.notCalled).to.be.true;
      await restoreSearcherStates();
      expect(root.chrome.storage.sync.get.calledOnce).to.be.true;
      const searcherList = root.document.getElementById("searcherList") as HTMLElement;
      const censys = searcherList.querySelector("[name=Censys]");
      expect((censys as HTMLInputElement).checked).to.be.false;
      const shodan = searcherList.querySelector("[name=Shodan]");
      expect((shodan as HTMLInputElement).checked).to.be.true;
    });
  });
});
