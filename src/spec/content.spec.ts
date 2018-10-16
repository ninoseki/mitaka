import { expect } from "chai";
import { JSDOM } from "jsdom";
import "mocha";
import SinonChrome = require("sinon-chrome");
import * as root from "window-or-global";
import { onsSlectionChange } from "../content"

describe("Context script", () => {
  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><p>Just a stub</p>`);
    root.window = dom.window;
    root.chrome = SinonChrome;
  });
  afterEach(() => {
    root.chrome.flush();
    delete root.chrome;
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
          rangeCount: 0,
        }
      };
    });
    afterEach(() => {
      delete root.window.getSelection;
    });
    describe("#onSelectionChange", () => {
      it("should call chrome.runtime.sendMessage()", () => {
        expect(root.chrome.runtime.sendMessage.notCalled).to.be.true;
        onsSlectionChange();
        expect(root.chrome.runtime.sendMessage.called).to.be.true;
        expect(root.chrome.runtime.sendMessage.withArgs({
          request: "updateContextMenu",
          selection: "test",
        }).calledOnce).to.be.true;
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
                    return "https://example.com";
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
        expect(root.chrome.runtime.sendMessage.notCalled).to.be.true;
        onsSlectionChange();
        expect(root.chrome.runtime.sendMessage.called).to.be.true;
        expect(root.chrome.runtime.sendMessage.withArgs({
          request: "updateContextMenu",
          selection: "https://example.com"
        }).calledOnce).to.be.true;
      });
    })
  });
});
