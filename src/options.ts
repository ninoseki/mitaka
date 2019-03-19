import * as Mustache from "mustache";
import { ApiKeys } from "./lib/scanner";
import { Searchers } from "./lib/searcher";

export interface SearcherState {
  name: string;
  supportedTypes: string[];
  isEnabled: boolean;
}

export function saveApiKeys() {
  const urlscanApiKey = document.getElementById(
    "urlscan-api-key"
  ) as HTMLInputElement;
  const virusTotalApiKey = document.getElementById(
    "virustotal-api-key"
  ) as HTMLInputElement;
  const apiKeys: ApiKeys = {
    urlscanApiKey: urlscanApiKey.value,
    virusTotalApiKey: virusTotalApiKey.value,
  };
  if (apiKeys) {
    chrome.storage.sync.set({ apiKeys }, () => {
      const status = document.getElementById("status");
      if (status) {
        status.textContent = "Options saved.";
      }
    });
  }
}

export function saveSearcherStates() {
  const searcherStates = {};
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
  chrome.storage.sync.set({ searcherStates });
}

// Saves options to chrome.storage.sync.
export function saveOptions() {
  saveApiKeys();
  saveSearcherStates();
}

export async function restoreApiKeys() {
  const urlscanApiKey = document.getElementById(
    "urlscan-api-key"
  ) as HTMLInputElement;
  const virusTotalApiKey = document.getElementById(
    "virustotal-api-key"
  ) as HTMLInputElement;
  chrome.storage.sync.get("apiKeys", config => {
    if ("apiKeys" in config) {
      if (urlscanApiKey && "urlscanApiKey" in config.apiKeys) {
        urlscanApiKey.value = config.apiKeys.urlscanApiKey;
      }
      if (virusTotalApiKey && "virusTotalApiKey" in config.apiKeys) {
        virusTotalApiKey.value = config.apiKeys.virusTotalApiKey;
      }
    }
  });
}

export function restoreSearcherStates() {
  chrome.storage.sync.get("searcherStates", config => {
    const states: SearcherState[] = [];

    for (const searcher of Searchers) {
      let isEnabled: boolean = true;
      if (
        "searcherStates" in config &&
        searcher.name in config.searcherStates
      ) {
        isEnabled = config.searcherStates[searcher.name];
      }
      states.push({
        isEnabled,
        name: searcher.name,
        supportedTypes: searcher.supportedTypes,
      });
    }

    const searcherList = document.getElementById("searcherList") as HTMLElement;
    for (const state of states) {
      const template = (document.getElementById("checkTemplate") as HTMLElement)
        .innerHTML;
      const rendered = Mustache.render(template, state);
      searcherList.insertAdjacentHTML("beforeend", rendered);
    }
  });
}

export function restoreOptions() {
  restoreApiKeys();
  restoreSearcherStates();
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    restoreOptions();
    const save = document.getElementById("save");
    if (save) {
      save.addEventListener("click", saveOptions);
    }
  });
}
