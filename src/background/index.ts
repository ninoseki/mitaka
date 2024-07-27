import * as v from "valibot";

import { scan } from "~/background/scan";
import { search, searchAll } from "~/background/search";
import { CommandRunner } from "~/command/runner";
import { CommandSchema } from "~/schemas";
import { getOptions } from "~/storage";

// set contextMenus onClicked lister
chrome.contextMenus.onClicked.addListener(async (info) => {
  // id is JSON string represents command
  const id: string = info.menuItemId.toString();
  const command = v.parse(CommandSchema, JSON.parse(id));
  const options = await getOptions();

  const runner = new CommandRunner(command, options);
  switch (runner.command.action) {
    case "search":
      if (runner.command.name === "all") {
        await searchAll(runner);
        break;
      }
      await search(runner);
      break;
    case "scan":
      await scan(runner);
      break;
  }

  // tear down all the context menus
  chrome.contextMenus.removeAll();
});
