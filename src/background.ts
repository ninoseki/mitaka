import { browser, ContextMenus, Extension } from "webextension-polyfill-ts";

import { Command } from "@/command";
import { Selector } from "@/selector";
import { truncate } from "@/truncate";
import {
  AnalyzerEntry,
  GeneralSettings,
  SearcherStates,
  UpdateContextMenuMessage,
} from "@/types";
import { getApiKeys, getConfig, getSearcherStates } from "@/utility";

export async function showNotification(message: string): Promise<void> {
  await browser.notifications.create({
    iconUrl: "./icons/48.png",
    message,
    title: "Mitaka",
    type: "basic",
  });
}

export async function search(command: Command): Promise<void> {
  try {
    const url: string = command.search();
    if (url !== "") {
      await browser.tabs.create({ url });
    }
  } catch (e) {
    const err = <Extension.PropertyLastErrorType>e;
    await showNotification(err.message);
  }
}

export async function searchAll(command: Command): Promise<void> {
  try {
    const states: SearcherStates = await getSearcherStates();
    const urls = command.searchAll(states);
    for (const url of urls) {
      await browser.tabs.create({ url });
    }
  } catch (e) {
    const err = <Extension.PropertyLastErrorType>e;
    await showNotification(err.message);
  }
}

export async function scan(command: Command): Promise<void> {
  const apiKeys = await getApiKeys();
  try {
    const url: string = await command.scan(apiKeys);
    if (url !== "") {
      await browser.tabs.create({ url });
    }
  } catch (e) {
    const err = <Extension.PropertyLastErrorType>e;
    await showNotification(err.message);
  }
}

export function createContextMenuErrorHandler(): void {
  if (browser.runtime.lastError) {
    console.error(browser.runtime.lastError.message);
  }
}

export async function createContextMenus(
  message: UpdateContextMenuMessage,
  searcherStates: SearcherStates,
  generalSettings: GeneralSettings
): Promise<void> {
  await browser.contextMenus.removeAll();

  console.debug("Mitaka: removed the previous context menus.");

  const text: string = message.selection;
  const selector: Selector = new Selector(
    text,
    generalSettings.enableIDN,
    generalSettings.strictTLD
  );
  // create searchers context menus based on a type of the input
  const searcherEntries: AnalyzerEntry[] = selector.getSearcherEntries();
  let firstEntry: AnalyzerEntry | undefined = undefined;
  const contexts: ContextMenus.ContextType[] = ["selection"];

  for (const entry of searcherEntries) {
    const name = entry.analyzer.name;
    // continue if a searcher is disabled by options
    if (name in searcherStates && !searcherStates[name]) {
      continue;
    }

    if (firstEntry === undefined) {
      firstEntry = entry;
    }

    // it tells action, query, type and target to the listener
    const id = `Search ${entry.query} as a ${entry.type} on ${name}`;
    const title = `Search ${truncate(entry.query)} on ${name}`;
    const options = { contexts, id, title };
    browser.contextMenus.create(options, createContextMenuErrorHandler);
  }

  // search it on all services
  if (firstEntry !== undefined) {
    const query = firstEntry.query;
    const type = firstEntry.type;
    const id = `Search ${query} as a ${type} on all`;
    const title = `Search ${truncate(query)} on all`;
    const options = { contexts, id, title };
    browser.contextMenus.create(options, createContextMenuErrorHandler);
  }

  // create scanners context menus based on a type of the input
  const scannerEntries: AnalyzerEntry[] = selector.getScannerEntries();
  for (const entry of scannerEntries) {
    const name = entry.analyzer.name;
    // it tells action/query/type/target to the listener
    const id = `Scan ${entry.query} as a ${entry.type} on ${name}`;
    const title = `Scan ${truncate(entry.query)} on ${name}`;
    const options = { contexts, id, title };
    browser.contextMenus.create(options, createContextMenuErrorHandler);
  }

  console.debug("Mitaka: created context menus.");
}

if (typeof browser !== "undefined" && browser.runtime !== undefined) {
  browser.runtime.onMessage.addListener(
    async (message: UpdateContextMenuMessage): Promise<void> => {
      console.debug(
        `Mitaka: received message. selection = ${message.selection}. request = ${message.request}.`
      );

      if (message.request === "updateContextMenu") {
        const config = await getConfig();

        await createContextMenus(
          message,
          config.searcherStates,
          config.generalSettings
        );
      }
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  browser.contextMenus.onClicked.addListener(async (info, tab_) => {
    const id: string = info.menuItemId.toString();
    const command = new Command(id);
    switch (command.action) {
      case "search":
        if (command.target === "all") {
          await searchAll(command);
        } else {
          await search(command);
        }
        break;
      case "scan":
        await scan(command);
        break;
    }
  });
}
