import { scan } from "~/background/scan";
import { search, searchAll } from "~/background/search";
import { commandToID, commandToMessage } from "~/command/packer";
import { CommandRunner } from "~/command/runner";
import type { CommandActionType, OptionsType } from "~/schemas";
import { CommandSchema } from "~/schemas";
import { Selector } from "~/selector";
import { getOptions } from "~/storage";
import type { Command, Message } from "~/types";
import { isSearcher } from "~/utils";

export function createContextMenuErrorHandler(): void {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError.message);
  }
}

export function createContextMenus(text: string, options: OptionsType): void {
  const selector: Selector = new Selector(text, options);
  const contexts: chrome.contextMenus.ContextType[] = ["selection"];

  const slots = selector.getSlots();
  for (const slot of slots) {
    const name = slot.analyzer.name;

    const action: CommandActionType = (() => {
      if (isSearcher(slot.analyzer)) {
        return "search";
      }
      return "scan";
    })();

    const command: Command = {
      action,
      name,
      query: slot.query,
      type: slot.type,
    };

    // it tells action, query, type and target to the listener
    const id = commandToID(command);
    const title = commandToMessage(command);
    const options = { contexts, id, title };
    chrome.contextMenus.create(options, createContextMenuErrorHandler);
  }
}

// set onMessage lister
chrome.runtime.onMessage.addListener((message: Message) => {
  // remove all context menus as an initialization
  chrome.contextMenus.removeAll(() => {
    createContextMenus(message.text, message.options);
  });
});

// set contextMenu onClicked lister
chrome.contextMenus.onClicked.addListener(async (info) => {
  // id is JSON string represents command
  const id: string = info.menuItemId.toString();
  const command = CommandSchema.parse(JSON.parse(id));
  const options = await getOptions();

  const runner = new CommandRunner(command, options);
  switch (runner.command.action) {
    case "search":
      if (runner.command.name === "all") {
        await searchAll(runner);
        break;
      }
      await search(runner);
      break;
    case "scan":
      await scan(runner);
      break;
  }

  // tear down all the context menus
  chrome.contextMenus.removeAll();
});
