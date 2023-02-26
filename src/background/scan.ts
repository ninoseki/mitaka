import { showNotification } from "@/background/notification";
import type { CommandRunner } from "@/command/runner";
import { ErrorMessageSchema } from "@/schemas";

export async function scan(runner: CommandRunner): Promise<void> {
  try {
    const url = await runner.scan();
    if (url) {
      await chrome.tabs.create({ url });
    }
  } catch (e) {
    const errorMessage = ErrorMessageSchema.parse(e);
    showNotification(errorMessage.message);
  }
}
