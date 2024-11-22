import type { CommandRunner } from "~/command/runner";

import { showNotification } from "./notification";

export async function searchAll(runner: CommandRunner): Promise<void> {
  const results = runner.searchAll();
  for (const result of results) {
    result.match(
      async (url) => {
        await chrome.tabs.create({ url });
      },
      (err) => showNotification(err),
    );
  }
}

export async function search(runner: CommandRunner): Promise<void> {
  const result = runner.search();
  result.match(
    async (url) => {
      await chrome.tabs.create({ url });
    },
    (err) => showNotification(err),
  );
}
