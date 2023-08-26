import { throttle } from "@github/mini-throttle";

import { getOptions } from "~/storage";
import type { Message } from "~/types";

export {};

export async function onSelectionChange(): Promise<void> {
  const selection = window.getSelection();
  const text: string = selection ? selection.toString().trim() : "";
  let link: string | null = null;

  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0).startContainer.parentElement;
    if (range && range.hasAttribute("href")) {
      link = range.getAttribute("href");
    }
  }

  const selected: string = link || text;

  if (selected !== "") {
    const message: Message = {
      link: link,
      text: text,
    };
    await chrome.runtime.sendMessage(message);
  }

  const options = await getOptions();
  if (options.enableDebugLog) {
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
      { middle: false },
    ),
  );
}
