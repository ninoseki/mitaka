import "mocha";
import { browserMock } from "./browserMock";
import { JSDOM } from "jsdom";
import { onSelctionChange } from "../src/content";
import * as root from "window-or-global";

describe("Context script", () => {
  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><p>Just a stub</p>`);
    root.window = dom.window;
  });

  afterEach(() => {
    browserMock.reset();
  });

  context("when selected a non anchor element", () => {
    beforeEach(() => {
      root.window.getSelection = () => {
        return {
          rangeCount: 0,
          toString: () => {
            return "test";
          },
        };
      };
    });

    afterEach(() => {
      delete root.window.getSelection;
    });

    describe("#onSelectionChange", () => {
      it("should call chrome.runtime.sendMessage()", () => {
        onSelctionChange();
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

  context("when selected an anchor element", () => {
    beforeEach(() => {
      root.window.getSelection = () => {
        return {
          getRangeAt: idx => {
            return {
              startContainer: {
                parentElement: {
                  getAttribute: attr => {
                    return "https://example.com";
                  },
                  hasAttribute: attr => {
                    return true;
                  },
                },
              },
            };
          },
          rangeCount: 1,
          toString: () => {
            return "test";
          },
        };
      };
    });

    afterEach(() => {
      delete root.window.getSelection;
    });

    describe("#onSelectionChange", () => {
      it("should call chrome.runtime.sendMessage()", () => {
        onSelctionChange();
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
