import { showNotification } from "@/background/notification";
import type { CommandRunner } from "@/command/runner";
import { isErrorMessage } from "@/utils";

export async function scan(runner: CommandRunner): Promise<void> {
  try {
    const url = await runner.scan();
    if (url) {
      await chrome.tabs.create({ url });
    }
  } catch (e) {
    if (isErrorMessage(e)) {
      showNotification(e.message);
    }
  }
}
