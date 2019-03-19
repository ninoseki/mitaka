import { expect } from "chai";
import "mocha";
import sinon = require("sinon");
import SinonChrome = require("sinon-chrome");
import * as root from "window-or-global";

import {
  createContextMenuErrorHandler,
  createContextMenus,
  scan,
  search,
  showNotification,
} from "../background";
import { Command } from "../lib/command";

describe("Background script", () => {
  beforeEach(() => {
    root.chrome = SinonChrome;
  });

  afterEach(() => {
    root.chrome.flush();
    delete root.chrome;
  });

  describe("#showNotification", () => {
    it("should call chrome.notifications.create()", () => {
      expect(root.chrome.notifications.create.notCalled).to.be.true;
      showNotification("test");
      expect(root.chrome.notifications.create.called).to.be.true;
      expect(
        root.chrome.notifications.create.withArgs({
          iconUrl: "./icons/48.png",
          message: "test",
          title: "Mitaka",
          type: "basic",
        }).calledOnce
      ).to.be.true;
    });
  });

  describe("#search", () => {
    context("when given a valid input", () => {
      it("should call chrome.tabs.create()", () => {
        const command = new Command(
          "Search https://github.com as a url on Urlscan"
        );
        expect(root.chrome.tabs.create.notCalled).to.be.true;
        search(command);
        expect(root.chrome.tabs.create.called).to.be.true;
        expect(
          root.chrome.tabs.create.withArgs({
            url: "https://urlscan.io/search/#%22https%3A%2F%2Fgithub.com%22",
          }).calledOnce
        ).to.be.true;
      });
    });
  });

  describe("#scan", () => {
    context("when chrome.storage.sync.get returns a valid config", () => {
      it("should call chrome.tabs.create()", async () => {
        root.chrome.storage.sync.get.withArgs("apiKeys").yieldsAsync({
          apiKeys: {
            urlscanApiKey: "test",
            virusTotalApiKey: "test",
          },
        });
        const command = new Command(
          "Scan https://www.wikipedia.org/ as a url on Urlscan"
        );
        const stub: sinon.SinonStub = sinon.stub(command, "scan").withArgs({
          urlscanApiKey: "test",
          virusTotalApiKey: "test",
        });
        stub.returns(
          "https://urlscan.io/entry/ac04bc14-4efe-439d-b356-8384843daf75/"
        );

        expect(root.chrome.tabs.create.notCalled).to.be.true;
        await scan(command);
        expect(root.chrome.tabs.create.called).to.be.true;
        expect(
          root.chrome.tabs.create.withArgs({
            url:
              "https://urlscan.io/entry/ac04bc14-4efe-439d-b356-8384843daf75/",
          }).calledOnce
        ).to.be.true;
      });
    });

    context("when chrome.storage.sync.get returns an invalid config", () => {
      it("should call chrome.tabs.create()", async () => {
        root.chrome.storage.sync.get.withArgs("apiKeys").yieldsAsync({
          apiKeys: {},
        });
        const command = new Command(
          "Scan https://www.wikipedia.org/ as a url on Urlscan"
        );

        expect(root.chrome.tabs.create.notCalled).to.be.true;
        await scan(command);
        expect(root.chrome.tabs.create.notCalled).to.be.true;
      });
    });
  });

  describe("#createContextMenuErrorHandler", () => {
    beforeEach(() => {
      const stub = sinon.stub(console, "error");
      stub.withArgs("test");
    });

    afterEach(() => {
      (console.error as sinon.SinonStub).restore();
    });

    context("when set an error in chrome.runtime.lastError", () => {
      it("should output via console.error", () => {
        root.chrome.runtime.lastError = {
          message: "test",
        };
        createContextMenuErrorHandler();
        expect((console.error as sinon.SinonStub).withArgs("test").calledOnce)
          .to.be.true;
      });
    });

    context("when not set an error in chrome.runtime.lastError", () => {
      it("should not output via console.error", () => {
        createContextMenuErrorHandler();
        expect((console.error as sinon.SinonStub).notCalled).to.be.true;
      });
    });
  });

  describe("#createContextMenus", () => {
    beforeEach(() => {
      root.chrome.contextMenus.removeAll.yieldsAsync();
    });

    context("when not given a searcherState", () => {
      it("should call chrome.contextMenus.create", async () => {
        expect(root.chrome.contextMenus.create.notCalled).to.be.true;
        await createContextMenus({ selection: "test" }, {});
        expect(root.chrome.contextMenus.create.called).to.be.true;
        expect(
          root.chrome.contextMenus.create.withArgs({
            contexts: ["selection"],
            id: "Search test as a text on Censys",
            title: "Search this text on Censys",
          }).calledOnce
        ).to.be.true;
        expect(
          root.chrome.contextMenus.create.withArgs({
            contexts: ["selection"],
            id: "Search test as a text on PublicWWW",
            title: "Search this text on PublicWWW",
          }).calledOnce
        ).to.be.true;
      });
    });

    context("when given a searcherState", () => {
      it("should call chrome.contextMenus.create", async () => {
        expect(root.chrome.contextMenus.create.notCalled).to.be.true;
        await createContextMenus(
          { selection: "test" },
          {
            Censys: false,
          }
        );
        expect(root.chrome.contextMenus.create.called).to.be.true;
        expect(
          root.chrome.contextMenus.create.withArgs({
            contexts: ["selection"],
            id: "Search test as a text on Censys",
            title: "Search this text on Censys",
          }).calledOnce
        ).to.be.false;
        expect(
          root.chrome.contextMenus.create.withArgs({
            contexts: ["selection"],
            id: "Search test as a text on PublicWWW",
            title: "Search this text on PublicWWW",
          }).calledOnce
        ).to.be.true;
      });
    });
  });
});
