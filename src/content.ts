import { throttle } from "@github/mini-throttle";
import { browser } from "webextension-polyfill-ts";

import { UpdateContextMenuMessage } from "@/types";
import { getGeneralSettings } from "@/utility";

export async function onSelectionChange(): Promise<void> {
  const selection = window.getSelection();
  const text: string = selection !== null ? selection.toString().trim() : "";
  let link: string | null = null;

  if (selection !== null && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0).startContainer.parentElement;
    if (range !== null && range.hasAttribute("href")) {
      link = range.getAttribute("href");
    }
  }

  const selected: string = link || text;

  if (selected !== "") {
    const message: UpdateContextMenuMessage = {
      request: "updateContextMenu",
      link: link,
      text: text,
    };
    await browser.runtime.sendMessage(message);
  }

  const settings = await getGeneralSettings();
  if (settings.enableDebugLog) {
    console.debug(`Mitaka: selected = ${selected}`);
  }
}

if (typeof document !== "undefined") {
  document.addEventListener(
    "selectionchange",
    throttle(
      async () => {
        await onSelectionChange();
      },
      250,
      { middle: false }
    )
  );
}
