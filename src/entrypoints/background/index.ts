import * as v from "valibot";

import { commandToID, commandToMessage } from "~/command/packer";
import { CommandRunner } from "~/command/runner";
import { onMessage } from "~/messaging";
import {
  type CommandActionType,
  CommandSchema,
  type CommandType,
  type OptionsType,
} from "~/schemas";
import { Selector } from "~/selector";
import { getOptions } from "~/storage";
import { isSearcher } from "~/utils";

import { scan } from "./scan";
import { search, searchAll } from "./search";

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
    const command: CommandType = {
      action,
      name,
      query: slot.query,
      type: slot.type,
    };
    // it tells action, query, type and target to the listener
    const id = commandToID(command);
    const title = commandToMessage(command);
    chrome.contextMenus.create({ contexts, id, title }, () => {
      if (options.debug) {
        // eslint-disable-next-line no-console
        console.debug(`Mitaka: context menu:${id} created`);
      }
    });
  }
}

export default defineBackground(() => {
  // message handler
  onMessage("createContextMenus", (message) => {
    // remove old context menus before creating new ones
    chrome.contextMenus.removeAll(() => {
      createContextMenus(message.data.text, message.data.options);
    });
  });

  // context menus on-clicked handler
  chrome.contextMenus.onClicked.addListener(async (info) => {
    // id is JSON string represents command
    const id: string = info.menuItemId.toString();
    const command = v.parse(CommandSchema, JSON.parse(id));
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
});
