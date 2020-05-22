import { browser } from "webextension-polyfill-ts";

import { Searchers } from "./lib/searcher";
import { ApiKeys, SearcherState } from "./lib/types";

export async function getApiKeys(): Promise<ApiKeys> {
  const config = await browser.storage.sync.get("apiKeys");

  const apiKeys: ApiKeys = {
    hybridAnalysisApiKey: undefined,
    urlscanApiKey: undefined,
    virusTotalApiKey: undefined,
  };
  if ("apiKeys" in config) {
    apiKeys.hybridAnalysisApiKey = config.apiKeys.hybridAnalysisApiKey;
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
      baseURL: searcher.baseURL,
      supportedTypes: searcher.supportedTypes,
    });
  }
  return states;
}
