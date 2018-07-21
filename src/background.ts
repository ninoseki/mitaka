import { Command } from "./lib/command";
import { ApiKeys } from "./lib/scanner";
import { AnalyzerEntry, Selector } from "./lib/selector";

function showNotification(message: string) {
  chrome.notifications.create({
    iconUrl: "./icons/48.png",
    message,
    title: "Mitaka",
    type: "basic",
  });
}

function search(command: Command) {
  try {
    const url = command.search();
    if (url !== undefined && url !== "") {
      chrome.tabs.create({ url });
    }
  } catch (err) {
    showNotification(err.message);
  }
}

function scan(command: Command) {
  chrome.storage.sync.get("apiKeys", async (config) => {
    const apiKeys: ApiKeys = {
      urlscanApiKey: config.apiKeys.urlscanApiKey,
      virusTotalApiKey: config.apiKeys.virusTotalApiKey,
    };
    try {
      const url = await command.scan(apiKeys);
      if (url !== undefined && url !== "") {
        chrome.tabs.create({ url });
      }
    } catch (err) {
      showNotification(err.message);
    }
  });
}

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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.request === "removeContextMenu") {
    chrome.contextMenus.removeAll();
  }

  if (message.request === "updateContextMenu") {
    // search searchers based on a type of the input
    const text: string = message.selection;
    const selector: Selector = new Selector(text);
    const searcherEntries: AnalyzerEntry[] = selector.getSearcherEntries();
    for (const entry of searcherEntries) {
      const name = entry.analyzer.name;
      // it tells action/query/type/target to the listner
      const id = `Search ${entry.query} as a ${entry.type} on ${name}`;
      const title = `Search this ${entry.type} on ${name}`;
      const options = {
        contexts: ["selection"],
        id,
        title,
      };
      chrome.contextMenus.create(options);
    }
    // search scanners based on a type of the input
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
      chrome.contextMenus.create(options);
    }
  }
});
