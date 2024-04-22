<script lang="ts">
export default {
  name: "IndexView",
};
</script>

<script setup lang="ts">
import "bulma/css/bulma.css";

import { onMounted, reactive, ref, watch } from "vue";

import { Scanners } from "../scanner";
import type { OptionsType, SearchableType } from "../schemas";
import { Searchers } from "../searcher";
import { getOptions, setOptions } from "../storage";
import type { ScannableType, Scanner, Searcher } from "../types";
import { SCANNABLE_TYPES, SEARCHABLE_TYPES } from "../types";
import { getFaviconURL } from "../utils";

const isInitialized = ref(false);
const synchedAt = ref<string>();

const searchableType = ref<SearchableType | undefined>(undefined);
const scannableType = ref<ScannableType | undefined>(undefined);

const options = reactive<OptionsType>({
  debug: false,
  href: true,
  punycode: false,
  refang: true,
  strict: true,
  hybridAnalysisAPIKey: undefined,
  urlscanAPIKey: undefined,
  virusTotalAPIKey: undefined,
  disabledScannerNames: [],
  disabledSearcherNames: [],
});

onMounted(async () => {
  const storageOptions = await getOptions();
  Object.assign(options, { ...storageOptions });
});

const isEnabledSearcher = (name: string): boolean => {
  return !options.disabledSearcherNames.includes(name);
};

const isEnabledScanner = (name: string): boolean => {
  return !options.disabledScannerNames.includes(name);
};

const disableOrEnableSearcher = (name: string): void => {
  if (options.disabledSearcherNames.includes(name)) {
    options.disabledSearcherNames = options.disabledSearcherNames.filter(
      (n) => n !== name,
    );
  } else {
    options.disabledSearcherNames.push(name);
  }
};

const disableOrEnableScanner = (name: string): void => {
  if (options.disabledScannerNames.includes(name)) {
    options.disabledScannerNames = options.disabledScannerNames.filter(
      (n) => n !== name,
    );
  } else {
    options.disabledScannerNames.push(name);
  }
};

const selectSearchableType = (selected: SearchableType): void => {
  if (selected === searchableType.value) {
    searchableType.value = undefined;
  } else {
    searchableType.value = selected;
  }
};

const selectScannableType = (selected: ScannableType): void => {
  if (selected === scannableType.value) {
    scannableType.value = undefined;
  } else {
    scannableType.value = selected;
  }
};

const isSelectedSearcher = (searcher: Searcher): boolean => {
  if (searchableType.value) {
    return searcher.supportedTypes.includes(searchableType.value);
  }
  return true;
};

const isSelectedScanner = (scanner: Scanner): boolean => {
  if (scannableType.value) {
    return scanner.supportedTypes.includes(scannableType.value);
  }
  return true;
};

watch(options, async (newOptions) => {
  // don't sync for the first time (this event is invoked through onMounted)
  if (isInitialized.value) {
    await setOptions(newOptions);
  }

  synchedAt.value = new Date().toISOString();
  isInitialized.value = true;
});
</script>

<template>
  <section class="section">
    <div class="container">
      <nav class="navbar is-fixed-top">
        <div class="navbar-brand">
          <span class="navbar-item title">Mitaka</span>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="#general"> General </a>
            <a class="navbar-item" href="#scanners"> Scanners </a>
            <a class="navbar-item" href="#searchers"> Searchers </a>
          </div>
          <div class="navbar-end">
            <span class="navbar-item" v-if="synchedAt">
              (Synced at: {{ synchedAt }})
            </span>
          </div>
        </div>
      </nav>
      <div class="columns mt-4 is-centered" v-if="isInitialized">
        <div class="column is-half">
          <div class="box" id="general">
            <h2 class="title is-2">General</h2>
            <div class="field has-addons">
              <div class="control is-expanded">
                <label class="label"> Strict </label>
                <p class="help">Whether to do strict TLD matching or not.</p>
              </div>
              <div class="control">
                <input type="checkbox" v-model="options.strict" />
              </div>
            </div>
            <div class="field has-addons">
              <div class="control is-expanded">
                <label class="label"> Punycode </label>
                <p class="help">
                  Whether to enable Punycode conversion or not.
                </p>
                <p class="help is-danger">(Punycode conversion can be lossy)</p>
              </div>
              <div class="control">
                <input type="checkbox" v-model="options.punycode" />
              </div>
            </div>
            <div class="field has-addons mt-1">
              <div class="control is-expanded">
                <label class="label"> Refang </label>
                <p class="help">
                  Whether to do refang (e.g. <code>example[.]com</code> to
                  <code>example.com</code>) or not.
                </p>
              </div>
              <div class="control">
                <input type="checkbox" v-model="options.refang" />
              </div>
            </div>
            <div class="field has-addons mt-1">
              <div class="control is-expanded">
                <label class="label"> Prefer href value </label>
                <p class="help">Prefer a href value to a text or not.</p>
              </div>
              <div class="control">
                <input type="checkbox" v-model="options.href" />
              </div>
            </div>
            <div class="field has-addons mt-1">
              <div class="control is-expanded">
                <label class="label"> Debug </label>
                <p class="help">Whether to enable debug logs or not.</p>
              </div>
              <div class="control">
                <input type="checkbox" v-model="options.debug" />
              </div>
            </div>
          </div>
          <div class="box" id="scanners">
            <h2 class="title is-2">Scanners</h2>
            <div class="tags">
              <span
                class="tag is-info is-light"
                @click="selectScannableType(tag)"
                v-for="tag in SCANNABLE_TYPES"
                :key="tag"
              >
                {{ tag }}
                <span
                  class="delete is-small"
                  v-if="scannableType === tag"
                ></span>
              </span>
            </div>
            <hr />
            <div
              class="block"
              v-for="(scanner, index) in Scanners"
              :key="index"
            >
              <div
                class="item field has-addons"
                v-if="isSelectedScanner(scanner)"
              >
                <div class="control is-expanded">
                  <label class="label">
                    <span class="icon">
                      <img :src="getFaviconURL(scanner.baseURL)" />
                    </span>
                    <span
                      ><a :href="scanner.baseURL" target="_blank">{{
                        scanner.name
                      }}</a></span
                    >
                  </label>
                  <p class="tags">
                    <strong class="mr-1">Supported types:</strong>
                    <span
                      class="tag is-info is-light"
                      v-for="(supportedType, index) in scanner.supportedTypes"
                      :key="index"
                    >
                      {{ supportedType }}
                    </span>
                  </p>
                </div>
                <div class="control">
                  <input
                    type="checkbox"
                    :checked="isEnabledScanner(scanner.name)"
                    @click="disableOrEnableScanner(scanner.name)"
                  />
                </div>
              </div>
              <div class="field">
                <div
                  class="control"
                  v-if="scanner.hasAPIKey && isSelectedScanner(scanner)"
                >
                  <input
                    type="text"
                    class="input"
                    v-model="options.virusTotalAPIKey"
                    placeholder="VirusTotal API key"
                    v-if="scanner.name === 'VirusTotal'"
                  />
                  <input
                    type="text"
                    class="input"
                    v-model="options.urlscanAPIKey"
                    placeholder="urlscan.io key"
                    v-if="scanner.name === 'urlscan.io'"
                  />
                  <input
                    type="text"
                    class="input"
                    v-model="options.hybridAnalysisAPIKey"
                    placeholder="HybridAnalysis API key"
                    v-if="scanner.name === 'HybridAnalysis'"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="box" id="searchers">
            <h2 class="title is-2">Searchers</h2>
            <div class="tags">
              <span
                class="tag is-info is-light"
                @click="selectSearchableType(tag)"
                v-for="tag in SEARCHABLE_TYPES"
                :key="tag"
              >
                {{ tag }}
                <span
                  class="delete is-small"
                  v-if="searchableType === tag"
                ></span>
              </span>
            </div>
            <hr />
            <div
              class="block"
              v-for="(searcher, index) in Searchers"
              :key="index"
            >
              <div
                class="item field has-addons"
                v-if="isSelectedSearcher(searcher)"
              >
                <div class="control is-expanded">
                  <label class="label">
                    <span class="icon">
                      <img :src="getFaviconURL(searcher.baseURL)" />
                    </span>
                    <span
                      ><a :href="searcher.baseURL" target="_blank">{{
                        searcher.name
                      }}</a></span
                    >
                  </label>
                  <p class="tags">
                    <strong class="mr-1">Supported types:</strong>
                    <span
                      class="tag is-info is-light"
                      v-for="(supportedType, index) in searcher.supportedTypes"
                      :key="index"
                    >
                      {{ supportedType }}
                    </span>
                  </p>
                </div>
                <div class="control">
                  <input
                    type="checkbox"
                    :checked="isEnabledSearcher(searcher.name)"
                    @click="disableOrEnableSearcher(searcher.name)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.navbar {
  border-bottom: 1px solid lightgray;
}
.tags .tag {
  margin-bottom: 0px;
}
</style>
