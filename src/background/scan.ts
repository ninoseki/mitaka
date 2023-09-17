import { showNotification } from "~/background/notification";
import type { CommandRunner } from "~/command/runner";

export async function scan(runner: CommandRunner): Promise<void> {
  const res = await runner.scan();
  if (res.isOk()) {
    await chrome.tabs.create({ url: res.value });
  } else {
    showNotification(res.error);
  }
}
