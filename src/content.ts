import { throttle } from "throttle-debounce";

export function onSelctionChange(): void {
  const selection = window.getSelection();
  const text: string = selection.toString().trim();
  let link: string | null = null;
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0).startContainer.parentElement;
    if (range !== null && range.hasAttribute("href")) {
      link = range.getAttribute("href");
    }
  }
  const selected: string = link || text;
  if (selected !== "") {
    chrome.runtime.sendMessage({
      request: "updateContextMenu",
      selection: selected,
    });
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("selectionchange", throttle(100, onSelctionChange));
}
