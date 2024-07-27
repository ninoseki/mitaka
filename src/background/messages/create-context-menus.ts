import type { PlasmoMessaging } from "@plasmohq/messaging";

import { commandToID, commandToMessage } from "~/command/packer";
import { type CommandActionType, type OptionsType } from "~/schemas";
import { Selector } from "~/selector";
import type { Command, Message } from "~/types";
import { isSearcher } from "~/utils";

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
    chrome.contextMenus.create({ contexts, id, title }, () => {
      if (options.debug) {
        // eslint-disable-next-line no-console
        console.debug(`Mitaka: context menu:${id} created`);
      }
    });
  }
}

const handler: PlasmoMessaging.MessageHandler<Message, unknown> = async (
  req,
) => {
  if (!req.body) {
    return;
  }

  const message: Message = req.body;
  if (message.options.debug) {
    // eslint-disable-next-line no-console
    console.debug(`Mitaka: "${message.text}" received`);
  }

  // remove all context menus as an initialization
  chrome.contextMenus.removeAll(() => {
    createContextMenus(message.text, message.options);
  });
};

export default handler;
