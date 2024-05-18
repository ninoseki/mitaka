import { showNotification } from "~/background/notification";
import type { CommandRunner } from "~/command/runner";

export async function scan(runner: CommandRunner): Promise<void> {
  const resultAsync = runner.scan();
  const result = await resultAsync;

  if (result.isOk()) {
    await chrome.tabs.create({ url: result.value });
    return;
  }

  showNotification(result.error);
}
