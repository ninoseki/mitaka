import { showNotification } from "@/background/notification";
import type { CommandRunner } from "@/command/runner";
import { ErrorMessageSchema } from "@/schemas";

export async function searchAll(runner: CommandRunner): Promise<void> {
  try {
    const urls = runner.searchAll();
    for (const url of urls) {
      chrome.tabs.create({ url });
    }
  } catch (e) {
    const errorMessage = ErrorMessageSchema.parse(e);
    showNotification(errorMessage.message);
  }
}

export async function search(runner: CommandRunner): Promise<void> {
  try {
    const url = runner.search();
    if (url) {
      await chrome.tabs.create({ url });
    }
  } catch (e) {
    const errorMessage = ErrorMessageSchema.parse(e);
    showNotification(errorMessage.message);
  }
}
