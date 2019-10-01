import { ApiKeys } from "./lib/scanner";
import { browser } from "webextension-polyfill-ts";
import { Searchers } from "./lib/searcher";

export interface SearcherState {
  name: string;
  supportedTypes: string[];
  isEnabled: boolean;
}

export async function getApiKeys(): Promise<ApiKeys> {
  const config = await browser.storage.sync.get("apiKeys");

  const apiKeys: ApiKeys = {
    urlscanApiKey: undefined,
    virusTotalApiKey: undefined,
  };
  if ("apiKeys" in config) {
    apiKeys.urlscanApiKey = config.apiKeys.urlscanApiKey;
    apiKeys.virusTotalApiKey = config.apiKeys.virusTotalApiKey;
  }
  return apiKeys;
}

export async function getSearcherStates(): Promise<SearcherState[]> {
  const config = await browser.storage.sync.get("searcherStates");
  const hasSearcherStates: boolean = "searcherStates" in config;
  const states: SearcherState[] = [];

  for (const searcher of Searchers) {
    let isEnabled = true;
    if (hasSearcherStates && searcher.name in config.searcherStates) {
      isEnabled = config.searcherStates[searcher.name];
    }
    states.push({
      isEnabled,
      name: searcher.name,
      supportedTypes: searcher.supportedTypes,
    });
  }
  return states;
}
