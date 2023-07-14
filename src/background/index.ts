import { scan } from "~/background/scan";
import { search, searchAll } from "~/background/search";
import { commandToID, commandToMessage } from "~/command/packer";
import { CommandRunner } from "~/command/runner";
import { CommandSchema } from "~/schemas";
import { Selector } from "~/selector";
import { getOptions } from "~/storage";
import type { Command, CommandAction, Message, Options } from "~/types";
import { isSearcher } from "~/utils";

export function createContextMenuErrorHandler(): void {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError.message);
  }
}

export function createContextMenus(message: Message, options: Options): void {
  let text: string = message.text;
  if (options.preferHrefValue && message.link !== null) {
    text = message.link;
  }

  const selector: Selector = new Selector(text, options);

  const contexts: chrome.contextMenus.ContextType[] = ["selection"];

  const slots = selector.getSlots();
  for (const slot of slots) {
    const name = slot.analyzer.name;

    const action: CommandAction = (() => {
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
chrome.runtime.onMessage.addListener(
  async (message: Message): Promise<void> => {
    chrome.contextMenus.removeAll(async () => {
      const options = await getOptions();

      if (options.enableDebugLog) {
        console.debug("Removed all context menus");
        console.debug(message);
      }

      createContextMenus(message, options);
    });
  },
);

// set contextMenu onClicked lister
// eslint-disable-next-line @typescript-eslint/no-unused-vars
chrome.contextMenus.onClicked.addListener(async (info, _tab) => {
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

  chrome.contextMenus.removeAll();

  if (options.enableDebugLog) {
    console.debug("Removed all context menus (onClicked)");
  }
});
