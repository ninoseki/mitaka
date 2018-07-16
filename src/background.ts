import { Command } from "./lib/command";
import { ApiKeys } from "./lib/scanner";
import { ScannerResult, SearcherResult, Selector } from "./lib/selector";

function showNotification(message: string) {
  chrome.notifications.create({
    iconUrl: "./icons/48.png",
    message,
    title: "Mitaka",
    type: "basic",
  });
}

function listner(info, tab) {
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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.request === "updateContextMenu") {
    chrome.contextMenus.removeAll(() => {
      // search searchers based on a type of the input
      const text: string = message.selection;
      const selector: Selector = new Selector(text);
      const results: SearcherResult[] = selector.getSearcherResults();
      for (const result of results) {
        const name = result.searcher.name;
        // it tells action/query/type/target to the listner
        const id = `Search ${result.query} as a ${result.type} on ${name}`;
        const title = `Search this ${result.type} on ${name}`;
        const options = {
          contexts: ["selection"],
          id,
          onclick: listner,
          title,
        };
        chrome.contextMenus.create(options);
      }
      // search scanners based on a type of the input
      const scannerResults: ScannerResult[] = selector.getScannerResults();
      for (const result of scannerResults) {
        const name = result.scanner.name;
        // it tells action/query/type/target to the listner
        const id = `Scan ${result.query} as a ${result.type} on ${name}`;
        const title = `Scan this ${result.type} on ${name}`;
        const options = {
          contexts: ["selection"],
          id,
          onclick: listner,
          title,
        };
        chrome.contextMenus.create(options);
      }
    });
  }
});
