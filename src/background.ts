import { Command } from "./lib/command";
import { ApiKeys } from "./lib/scanner";
import { AnalyzerEntry, Selector } from "./lib/selector";

export function showNotification(message: string) {
  chrome.notifications.create({
    iconUrl: "./icons/48.png",
    message,
    title: "Mitaka",
    type: "basic",
  });
}

export function search(command: Command) {
  try {
    const url: string = command.search();
    if (url !== "") {
      chrome.tabs.create({ url });
    }
  } catch (err) {
    showNotification(err.message);
  }
}

export async function scan(command: Command) {
  chrome.storage.sync.get("apiKeys", async (config) => {
    const apiKeys: ApiKeys = {
      urlscanApiKey: ("apiKeys" in config && "urlscanApiKey" in config.apiKeys) ?
        config.apiKeys.urlscanApiKey : undefined,
      virusTotalApiKey: ("apiKeys" in config && "virusTotalApiKey" in config.apiKeys) ?
        config.apiKeys.virusTotalApiKey : undefined,
    };
    try {
      const url: string = await command.scan(apiKeys);
      if (url !== "") {
        chrome.tabs.create({ url });
      }
    } catch (err) {
      showNotification(err.message);
    }
  });
}

export function createContextMenuErrorHandler() {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError.message);
  }
}

export async function createContextMenus(message, searcherStates) {
  chrome.contextMenus.removeAll(() => {
    const text: string = message.selection;
    const selector: Selector = new Selector(text);
    // create searchers context menus based on a type of the input
    const searcherEntries: AnalyzerEntry[] = selector.getSearcherEntries();
    for (const entry of searcherEntries) {
      const name = entry.analyzer.name;
      // continue if a searcher is disabled in options
      if (name in searcherStates && !searcherStates[name]) {
        continue;
      }
      // it tells action/query/type/target to the listner
      const id = `Search ${entry.query} as a ${entry.type} on ${name}`;
      const title = `Search this ${entry.type} on ${name}`;
      const options = {
        contexts: ["selection"],
        id,
        title,
      };
      chrome.contextMenus.create(options, createContextMenuErrorHandler);
    }

    // create scanners context menus based on a type of the input
    const scannerEntries: AnalyzerEntry[] = selector.getScannerEntries();
    for (const entry of scannerEntries) {
      const name = entry.analyzer.name;
      // it tells action/query/type/target to the listner
      const id = `Scan ${entry.query} as a ${entry.type} on ${name}`;
      const title = `Scan this ${entry.type} on ${name}`;
      const options = {
        contexts: ["selection"],
        id,
        title,
      };
      chrome.contextMenus.create(options, createContextMenuErrorHandler);
    }
  });
}

if (typeof chrome !== "undefined") {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.request === "updateContextMenu") {
      chrome.storage.sync.get("searcherStates", (config) => {
        if ("searcherStates" in config) {
          createContextMenus(message, config.searcherStates);
        } else {
          createContextMenus(message, {});
        }
      });
    }
  });
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    const id: string = info.menuItemId;
    const command = new Command(id);
    switch (command.action) {
      case "search":
        search(command);
        break;
      case "scan":
        scan(command);
        break;
    }
  });
}
