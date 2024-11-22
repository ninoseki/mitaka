import { defineExtensionMessaging } from "@webext-core/messaging";

import { Message } from "~/types";

interface ProtocolMap {
  createContextMenus(message: Message): void;
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
