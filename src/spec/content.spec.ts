import { expect } from "chai";
import { JSDOM } from "jsdom";
import "mocha";
import * as sinon from "sinon";
import SinonChrome = require("sinon-chrome");
import * as root from "window-or-global";
import { onsSlectionChange } from "../content"

describe("Context script", () => {
  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><p>Just a stub</p>`);
    root.window = dom.window;
    root.global.chrome = SinonChrome;
  });
  afterEach(() => {
    root.global.chrome.flush();
    delete root.global.chrome;
  });
  context("when selected a non anchor element", () => {
    beforeEach(() => {
      const obj = {};
      obj.toString = () => { return "test" }
      obj["rangeCount"] = 0;
      root.window.getSelection = () => {
        return {
          toString: () => {
            return "test";
          },
          rangeCount: 0
        }
      }
    });
    afterEach(() => {
      delete root.window.getSelection;
    });
    describe("#onSelectionChange", () => {
      it("should call chrome.runtime.sendMessage()", () => {
        expect(root.global.chrome.runtime.sendMessage.notCalled).to.equal(true);
        onsSlectionChange();
        expect(root.global.chrome.runtime.sendMessage.notCalled).to.equal(false);
        expect(root.global.chrome.runtime.sendMessage.withArgs({
          request: "updateContextMenu",
          selection: "test"
        }).calledOnce).to.equal(true);
      });
    })
  });
  context("when selected an anchor element", () => {
    beforeEach(() => {
      root.window.getSelection = () => {
        return {
          toString: () => {
            return "test";
          },
          rangeCount: 1,
          getRangeAt: (idx) => {
            return {
              startContainer: {
                parentElement: {
                  hasAttribute: (attr) => {
                    return true;
                  },
                  getAttribute: (attr) => {
                    return "https://example.com"
                  }
                }
              }
            }
          }
        }
      }
    });
    afterEach(() => {
      delete root.window.getSelection
    });
    describe("#onSelectionChange", () => {
      it("should call chrome.runtime.sendMessage()", () => {
        expect(root.global.chrome.runtime.sendMessage.notCalled).to.equal(true);
        onsSlectionChange();
        expect(root.global.chrome.runtime.sendMessage.notCalled).to.equal(false);
        expect(root.global.chrome.runtime.sendMessage.withArgs({
          request: "updateContextMenu",
          selection: "https://example.com"
        }).calledOnce).to.equal(true);
      });
    })
  });
});
