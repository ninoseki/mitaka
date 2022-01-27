import { browser, ContextMenus, Extension } from "webextension-polyfill-ts";

import { CommandPacker } from "@/command/packer";
import { CommandRunner } from "@/command/runner";
import { Selector } from "@/selector";
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

export async function search(runner: CommandRunner): Promise<void> {
  try {
    const url: string = runner.search();
    if (url !== "") {
      await browser.tabs.create({ url });
    }
  } catch (e) {
    const err = <Extension.PropertyLastErrorType>e;
    await showNotification(err.message);
  }
}

export async function searchAll(runner: CommandRunner): Promise<void> {
  try {
    const states: SearcherStates = await getSearcherStates();
    const urls = runner.searchAll(states);
    for (const url of urls) {
      await browser.tabs.create({ url });
    }
  } catch (e) {
    const err = <Extension.PropertyLastErrorType>e;
    await showNotification(err.message);
  }
}

export async function scan(runner: CommandRunner): Promise<void> {
  const apiKeys = await getApiKeys();
  try {
    const url: string = await runner.scan(apiKeys);
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
  const selector: Selector = new Selector(text, {
    enableIDN: generalSettings.enableIDN,
    strictTLD: generalSettings.strictTLD,
    enableRefang: generalSettings.enableRefang,
  });
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

    const command: CommandPacker = new CommandPacker(
      "search",
      entry.query,
      entry.type,
      name
    );

    // it tells action, query, type and target to the listener
    const id = command.getJSON();
    const title = command.getMessage();
    const options = { contexts, id, title };
    browser.contextMenus.create(options, createContextMenuErrorHandler);
  }

  // search it on all services
  if (firstEntry !== undefined) {
    const query = firstEntry.query;
    const type = firstEntry.type;

    const command: CommandPacker = new CommandPacker(
      "search",
      query,
      type,
      "all"
    );
    const id = command.getJSON();
    const title = command.getMessage();
    const options = { contexts, id, title };
    browser.contextMenus.create(options, createContextMenuErrorHandler);
  }

  // create scanners context menus based on a type of the input
  const scannerEntries: AnalyzerEntry[] = selector.getScannerEntries();
  for (const entry of scannerEntries) {
    const name = entry.analyzer.name;

    const command = new CommandPacker("scan", entry.query, entry.type, name);
    const id = command.getJSON();
    const title = command.getMessage();
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
    const runner = new CommandRunner(id);
    switch (runner.command.action) {
      case "search":
        if (runner.command.target === "all") {
          await searchAll(runner);
        } else {
          await search(runner);
        }
        break;
      case "scan":
        await scan(runner);
        break;
    }
  });
}
