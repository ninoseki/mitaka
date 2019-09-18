import { throttle } from "throttle-debounce";
import { browser } from "webextension-polyfill-ts";

export function onSelctionChange(): void {
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
    browser.runtime.sendMessage({
      request: "updateContextMenu",
      selection: selected,
    });
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("selectionchange", throttle(100, onSelctionChange));
}
