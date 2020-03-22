/**
 * Credit: Santo Pfingsten (https://github.com/Lusito/forget-me-not)
 */

import { browser, Runtime } from "webextension-polyfill-ts";
import { createSpy, clone, SpyData } from "./testHelpers";

type ListenerCallback = (...args: any[]) => any;
// tslint:disable-next-line:ban-types
class ListenerMock<T extends Function> {
  private listeners: ListenerCallback[] = [];
  public emit: T;
  public readonly mock: { [s: string]: SpyData };
  public constructor() {
    // @ts-ignore
    this.emit = (...args) => {
      const results: any[] = [];
      for (const listener of this.listeners) {
        results.push(listener.apply(null, args));
      }
      return results;
    };

    this.mock = {
      addListener: createSpy((listener: ListenerCallback) => {
        this.listeners.push(listener);
      }),
      removeListener: createSpy((listener: ListenerCallback) => {
        this.listeners = this.listeners.filter((cb) => listener !== cb);
      }),
      hasListener: createSpy((listener: ListenerCallback) => {
        return this.listeners.indexOf(listener) >= 0;
      }),
      hasListeners: createSpy(() => {
        return this.listeners.length > 0;
      }),
    };
  }

  public reset() {
    this.listeners.length = 0;
    for (const key in this.mock) this.mock[key].reset();
  }
}

class BrowserNotificationsMock {
  public create = createSpy();

  public reset() {
    this.create.reset();
  }
}

class BrowserTabsMock {
  public create = createSpy();

  public reset() {
    this.create.reset();
  }
}

class BrowserContextMenusMock {
  public create = createSpy();
  public removeAll() {}

  public reset() {
    this.create.reset();
  }
}

class BrowserRuntimeMock {
  public onMessage = new ListenerMock<
    (
      message: any | undefined,
      sender: Runtime.MessageSender,
      sendResponse: () => void
    ) => void
  >();

  public sendMessage = createSpy();

  public reset() {
    this.onMessage.reset();
    this.sendMessage.reset();
  }
}

class StorageAreaMock {
  private readonly data: any = {};

  public get(keys?: null | string | string[] | { [s: string]: any }) {
    return Promise.resolve(clone(this.data));
  }

  public set = createSpy();

  public reset() {
    this.set.reset();
  }
}

export const browserMock = {
  notifications: new BrowserNotificationsMock(),
  tabs: new BrowserTabsMock(),
  contextMenus: new BrowserContextMenusMock(),
  runtime: new BrowserRuntimeMock(),
  storage: {
    sync: new StorageAreaMock(),
  },
  reset: () => {
    browserMock.contextMenus.reset();
    browserMock.notifications.reset();
    browserMock.tabs.reset();
    browserMock.runtime.reset();
    browserMock.storage.sync.reset();
  },
};

function bindMocks<DT>(destination: DT, source: any, keys: Array<keyof DT>) {
  if (!destination) {
    destination = {} as any;
  }
  for (const key of keys) {
    let mock = source[key];

    if (typeof mock === "function") {
      mock = mock.bind(source);
    } else if (mock.constructor.name === "ListenerMock") {
      mock = mock.mock;
    }

    (destination as any)[key] = mock;
  }
  return destination;
}

browser.notifications = bindMocks(
  browser.notifications,
  browserMock.notifications,
  ["create"]
);
browser.tabs = bindMocks(browser.tabs, browserMock.tabs, ["create"]);
browser.contextMenus = bindMocks(
  browser.contextMenus,
  browserMock.contextMenus,
  ["create", "removeAll"]
);
browser.runtime = bindMocks(browser.runtime, browserMock.runtime, [
  "onMessage",
  "sendMessage",
]);
browser.storage = bindMocks(browser.storage, browserMock.storage, ["sync"]);
