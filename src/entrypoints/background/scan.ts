import type { CommandRunner } from "~/command/runner";

import { showNotification } from "./notification";

export async function scan(runner: CommandRunner): Promise<void> {
  const resultAsync = runner.scan();
  const result = await resultAsync;

  result.match(
    async (url) => {
      await chrome.tabs.create({ url });
    },
    (err) => showNotification(err),
  );
}
