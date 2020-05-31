import Mustache from "mustache";
import { browser } from "webextension-polyfill-ts";

import { ApiKeys, SearcherStates } from "./lib/types";
import { getApiKeys, getSearcherStates } from "./utility";

require("./options/bulma.scss");

export async function saveApiKeys(): Promise<void> {
  const hybridAnalysisApiKey = document.getElementById(
    "hybridanalysis-api-key"
  ) as HTMLInputElement;
  const urlscanApiKey = document.getElementById(
    "urlscan-api-key"
  ) as HTMLInputElement;
  const virusTotalApiKey = document.getElementById(
    "virustotal-api-key"
  ) as HTMLInputElement;

  const apiKeys: ApiKeys = {
    hybridAnalysisApiKey: hybridAnalysisApiKey.value,
    urlscanApiKey: urlscanApiKey.value,
    virusTotalApiKey: virusTotalApiKey.value,
  };
  if (apiKeys) {
    await browser.storage.sync.set({ apiKeys });
    const status = document.getElementById("status");
    if (status) {
      status.textContent = "Settings are saved.";
    }
  }
}

export async function saveSearcherStates(): Promise<void> {
  const searcherStates: SearcherStates = {};
  const searcherList = document.getElementById("searcherList") as HTMLElement;
  const radios = searcherList.querySelectorAll<HTMLInputElement>(
    '[type="checkbox"]'
  );
  for (const radio of radios) {
    const name = radio.getAttribute("name");
    if (name === null) {
      continue;
    }
    searcherStates[name] = radio.checked;
  }
  await browser.storage.sync.set({ searcherStates });
}

// Saves options to chrome.storage.sync.
export async function saveOptions(): Promise<void> {
  await saveApiKeys();
  await saveSearcherStates();
}

export async function restoreApiKeys(): Promise<void> {
  const hybridAnalysisApiKey = document.getElementById(
    "hybridanalysis-api-key"
  ) as HTMLInputElement;
  const urlscanApiKey = document.getElementById(
    "urlscan-api-key"
  ) as HTMLInputElement;
  const virusTotalApiKey = document.getElementById(
    "virustotal-api-key"
  ) as HTMLInputElement;

  const apiKeys = await getApiKeys();
  if (apiKeys.hybridAnalysisApiKey) {
    hybridAnalysisApiKey.value = apiKeys.hybridAnalysisApiKey;
  }
  if (apiKeys.urlscanApiKey) {
    urlscanApiKey.value = apiKeys.urlscanApiKey;
  }
  if (apiKeys.virusTotalApiKey) {
    virusTotalApiKey.value = apiKeys.virusTotalApiKey;
  }
}

export async function restoreSearcherStates(): Promise<void> {
  const states = await getSearcherStates();

  const searcherList = document.getElementById("searcherList") as HTMLElement;
  const fragment: DocumentFragment = document.createDocumentFragment();
  const template = (document.getElementById("checkTemplate") as HTMLElement)
    .innerHTML;

  for (const state of states) {
    const elem = document.createElement("div");
    elem.innerHTML = Mustache.render(template, state);
    fragment.appendChild(elem);
  }
  searcherList.appendChild(fragment);
}

export async function restoreOptions(): Promise<void> {
  await restoreApiKeys();
  await restoreSearcherStates();
}

export async function onDOMContentLoaded(): Promise<void> {
  await restoreOptions();
  const save = document.getElementById("save");
  if (save) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    save.addEventListener("click", async () => {
      await saveOptions();
    });
  }
}

if (typeof document !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  document.addEventListener("DOMContentLoaded", async () => {
    await onDOMContentLoaded();
  });
}
