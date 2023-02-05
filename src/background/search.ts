import { showNotification } from "@/background/notification";
import type { CommandRunner } from "@/command/runner";
import { isErrorMessage } from "@/utils";

export async function searchAll(runner: CommandRunner): Promise<void> {
  try {
    const urls = runner.searchAll();
    for (const url of urls) {
      chrome.tabs.create({ url });
    }
  } catch (e) {
    if (isErrorMessage(e)) {
      showNotification(e.message);
    }
  }
}

export async function search(runner: CommandRunner): Promise<void> {
  try {
    const url = runner.search();
    if (url) {
      await chrome.tabs.create({ url });
    }
  } catch (e) {
    if (isErrorMessage(e)) {
      showNotification(e.message);
    }
  }
}
