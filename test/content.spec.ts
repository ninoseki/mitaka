import "mocha";

import { JSDOM } from "jsdom";
import root from "window-or-global";

import { onSelctionChange } from "../src/content";
import { browserMock } from "./browserMock";

describe("Context script", function () {
  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><p>Just a stub</p>`);
    root.window = dom.window;
  });

  afterEach(() => {
    browserMock.reset();
  });

  context("when selected a non anchor element", function () {
    beforeEach(() => {
      root.window.getSelection = function () {
        return {
          rangeCount: 0,
          toString: function () {
            return "test";
          },
        };
      };
    });

    afterEach(() => {
      delete root.window.getSelection;
    });

    describe("#onSelectionChange", function () {
      it("should call chrome.runtime.sendMessage()", async function () {
        await onSelctionChange();
        browserMock.runtime.sendMessage.assertCalls([
          [
            {
              request: "updateContextMenu",
              selection: "test",
            },
          ],
        ]);
      });
    });
  });

  context("when selected an anchor element", function () {
    beforeEach(() => {
      root.window.getSelection = function () {
        return {
          getRangeAt: (idx_) => {
            return {
              startContainer: {
                parentElement: {
                  getAttribute: (attr_) => {
                    return "https://example.com";
                  },
                  hasAttribute: (attr_) => {
                    return true;
                  },
                },
              },
            };
          },
          rangeCount: 1,
          toString: function () {
            return "test";
          },
        };
      };
    });

    afterEach(() => {
      delete root.window.getSelection;
    });

    describe("#onSelectionChange", function () {
      it("should call chrome.runtime.sendMessage()", async function () {
        await onSelctionChange();
        browserMock.runtime.sendMessage.assertCalls([
          [
            {
              request: "updateContextMenu",
              selection: "https://example.com",
            },
          ],
        ]);
      });
    });
  });
});
