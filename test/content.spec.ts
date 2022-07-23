/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import "mocha";

import { JSDOM } from "jsdom";
import root from "window-or-global";

import { onSelectionChange } from "@/content";

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
        await onSelectionChange();
        browserMock.runtime.sendMessage.assertCalls([
          [
            {
              request: "updateContextMenu",
              text: "test",
              link: null,
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
          getRangeAt: (_idx) => {
            return {
              startContainer: {
                parentElement: {
                  getAttribute: (_attr) => {
                    return "https://example.com";
                  },
                  hasAttribute: (_attr) => {
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
      it("should call chrome.runtime.sendMessage", async function () {
        await onSelectionChange();
        browserMock.runtime.sendMessage.assertCalls([
          [
            {
              request: "updateContextMenu",
              link: "https://example.com",
              text: "test",
            },
          ],
        ]);
      });
    });
  });
});
