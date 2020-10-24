import "mocha";

import { expect } from "chai";
import { browser } from "webextension-polyfill-ts";

import {
  createContextMenuErrorHandler,
  createContextMenus,
  scan,
  search,
  searchAll,
  showNotification,
} from "../src/background";
import { Command } from "../src/lib/command";
import { browserMock } from "./browserMock";
import sinon = require("sinon");

const sandbox = sinon.createSandbox();

describe("Background script", function () {
  afterEach(() => {
    browserMock.reset();
    sandbox.restore();
  });

  describe("#showNotification", function () {
    it("should call chrome.notifications.create", async function () {
      await showNotification("test");
      browserMock.notifications.create.assertCalls([
        [
          {
            iconUrl: "./icons/48.png",
            message: "test",
            title: "Mitaka",
            type: "basic",
          },
        ],
      ]);
    });
  });

  describe("#search", function () {
    context("when given a valid input", function () {
      it("should call chrome.tabs.create()", async function () {
        const command = new Command(
          "Search https://github.com as a url on Urlscan"
        );
        await search(command);
        browserMock.tabs.create.assertCalls([
          [
            {
              url:
                "https://urlscan.io/search/#page.url%3A%22https%3A%2F%2Fgithub.com%22%20OR%20task.url%3A%22https%3A%2F%2Fgithub.com%22",
            },
          ],
        ]);
      });
    });
  });

  describe("#searchAll", function () {
    context("when given a valid input", function () {
      this.beforeEach(() => {
        sandbox
          .stub(browserMock.storage.sync, "get")
          .withArgs("searcherStates")
          .resolves({
            searcherStates: {
              SpyOnWeb: true,
            },
          });
      });
      it("should call chrome.tabs.create", async function () {
        const command = new Command(
          "Search pub-9383614236930773 as a gaPubID on all"
        );
        await searchAll(command);
        browserMock.tabs.create.assertCalls([
          [
            {
              url: "http://spyonweb.com/pub-9383614236930773",
            },
          ],
        ]);
      });
    });
  });

  describe("#scan", function () {
    context("when chrome.storage.sync.get returns a valid config", function () {
      beforeEach(() => {
        sandbox
          .stub(browserMock.storage.sync, "get")
          .withArgs("apiKeys")
          .resolves({
            apiKeys: {
              hybridAnalysisApiKey: "test",
              urlscanApiKey: "test",
              virusTotalApiKey: "test",
            },
          });
      });

      it("should call chrome.tabs.create()", async function () {
        const command = new Command(
          "Scan https://www.wikipedia.org/ as a url on Urlscan"
        );
        const commandStub: sinon.SinonStub<any, any> = sandbox
          .stub(command, "scan")
          .withArgs({
            hybridAnalysisApiKey: "test",
            urlscanApiKey: "test",
            virusTotalApiKey: "test",
          });
        commandStub.returns(
          "https://urlscan.io/entry/ac04bc14-4efe-439d-b356-8384843daf75/"
        );

        await scan(command);
        browserMock.tabs.create.assertCalls([
          [
            {
              url:
                "https://urlscan.io/entry/ac04bc14-4efe-439d-b356-8384843daf75/",
            },
          ],
        ]);
      });
    });

    context(
      "when chrome.storage.sync.get returns an invalid config",
      function () {
        beforeEach(() => {
          sandbox
            .stub(browserMock.storage.sync, "get")
            .withArgs("apiKeys")
            .resolves({ apiKeys: {} });
        });

        it("should not call chrome.tabs.create()", async function () {
          const command = new Command(
            "Scan https://www.wikipedia.org/ as a url on Urlscan"
          );

          await scan(command);
          browserMock.tabs.create.assertCalls([]);
        });
      }
    );
  });

  describe("#createContextMenuErrorHandler", function () {
    beforeEach(() => {
      const stub = sandbox.stub(console, "error");
      stub.withArgs("test");
    });

    context("when chrome.runtime.lastError raises an error", function () {
      it("should output via console.error", function () {
        browser.runtime.lastError = {
          message: "test",
        };

        createContextMenuErrorHandler();
        expect(
          (console.error as sinon.SinonStub).withArgs("test").calledOnce
        ).to.be.true;
      });
    });

    context("when not set an error in chrome.runtime.lastError", function () {
      it("should not output via console.error", function () {
        browser.runtime.lastError = undefined;

        createContextMenuErrorHandler();
        expect((console.error as sinon.SinonStub).notCalled).to.be.true;
      });
    });
  });

  describe("#createContextMenus", function () {
    context("when not given a searcherStates", function () {
      it("should call chrome.contextMenus.create", async function () {
        await createContextMenus(
          { request: "updateContextMenu", selection: "test" },
          {},
          { enableIDN: true }
        );

        browserMock.contextMenus.create.assertCalls([
          [
            {
              contexts: ["selection"],
              id: "Search test as a text on Censys",
              title: "Search this text on Censys",
            },
            createContextMenuErrorHandler,
          ],
          [
            {
              contexts: ["selection"],
              id: "Search test as a text on PublicWWW",
              title: "Search this text on PublicWWW",
            },
            createContextMenuErrorHandler,
          ],
        ]);
      });
    });

    context("when given a searcherStates", function () {
      it("should call chrome.contextMenus.create", async function () {
        await createContextMenus(
          { request: "updateContextMenu", selection: "test" },
          {
            Censys: false,
          },
          { enableIDN: true }
        );

        browserMock.contextMenus.create.assertCalls([
          [
            {
              contexts: ["selection"],
              id: "Search test as a text on PublicWWW",
              title: "Search this text on PublicWWW",
            },
            createContextMenuErrorHandler,
          ],
        ]);
      });
    });
  });
});
