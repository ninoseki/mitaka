<script lang="ts">
import "bulma/css/bulma.css";

import { defineComponent, onMounted, ref, watchEffect } from "vue";

import { Scanners } from "../scanner";
import { Searchers } from "../searcher";
import { getOptions, setOptions } from "../storage";
import type {
  Options,
  ScannableType,
  Scanner,
  SearchableType,
  Searcher,
} from "../types";
import { SCANNABLE_TYPES, SEARCHABLE_TYPES } from "../types";
import { getFaviconURL } from "../utils";

export default defineComponent({
  name: "OptionsView",
  setup() {
    const isInitialized = ref(false);

    const enableIDN = ref(true);
    const strictTLD = ref(true);
    const enableRefang = ref(true);
    const preferHrefValue = ref(true);
    const enableDebugLog = ref(false);

    const hybridAnalysisAPIKey = ref<string | undefined>(undefined);
    const urlscanAPIKey = ref<string | undefined>(undefined);
    const virusTotalAPIKey = ref<string | undefined>(undefined);

    const disabledSearcherNames = ref<string[]>([]);
    const disabledScannerNames = ref<string[]>([]);

    const searchableType = ref<SearchableType | undefined>(undefined);
    const scannableType = ref<ScannableType | undefined>(undefined);

    onMounted(async () => {
      const options = await getOptions();

      enableIDN.value = options.enableIDN;
      strictTLD.value = options.strictTLD;
      enableRefang.value = options.enableRefang;
      preferHrefValue.value = options.preferHrefValue;
      enableDebugLog.value = options.enableDebugLog;

      hybridAnalysisAPIKey.value = options.hybridAnalysisAPIKey;
      urlscanAPIKey.value = options.urlscanAPIKey;
      virusTotalAPIKey.value = options.virusTotalAPIKey;

      disabledSearcherNames.value = options.disabledSearcherNames;
      disabledScannerNames.value = options.disabledScannerNames;

      isInitialized.value = true;
    });

    const isEnabledSearcher = (name: string): boolean => {
      return !disabledSearcherNames.value.includes(name);
    };

    const isEnabledScanner = (name: string): boolean => {
      return !disabledScannerNames.value.includes(name);
    };

    const disableOrEnableSearcher = (name: string): void => {
      if (disabledSearcherNames.value.includes(name)) {
        disabledSearcherNames.value = disabledSearcherNames.value.filter(
          (n) => n !== name,
        );
      } else {
        disabledSearcherNames.value.push(name);
      }
    };

    const disableOrEnableScanner = (name: string): void => {
      if (disabledScannerNames.value.includes(name)) {
        disabledScannerNames.value = disabledScannerNames.value.filter(
          (n) => n !== name,
        );
      } else {
        disabledScannerNames.value.push(name);
      }
    };

    const selectSearchableType = (selected: SearchableType): void => {
      if (selected == searchableType.value) {
        searchableType.value = undefined;
      } else {
        searchableType.value = selected;
      }
    };

    const selectScannableType = (selected: ScannableType): void => {
      if (selected == scannableType.value) {
        scannableType.value = undefined;
      } else {
        scannableType.value = selected;
      }
    };

    const isSelectedSearcher = (searcher: Searcher): boolean => {
      if (searchableType.value !== undefined) {
        return searcher.supportedTypes.includes(searchableType.value);
      }
      return true;
    };

    const isSelectedScanner = (scanner: Scanner): boolean => {
      if (scannableType.value !== undefined) {
        return scanner.supportedTypes.includes(scannableType.value);
      }
      return true;
    };

    watchEffect(async () => {
      if (!isInitialized.value) {
        // do nothing if it is not initialized
        return;
      }

      const options: Options = {
        enableDebugLog: enableDebugLog.value,
        strictTLD: strictTLD.value,
        enableIDN: enableIDN.value,
        enableRefang: enableRefang.value,
        preferHrefValue: preferHrefValue.value,
        disabledSearcherNames: disabledSearcherNames.value.map((n) => n),
        disabledScannerNames: disabledScannerNames.value.map((n) => n),
        hybridAnalysisAPIKey: hybridAnalysisAPIKey.value,
        urlscanAPIKey: urlscanAPIKey.value,
        virusTotalAPIKey: virusTotalAPIKey.value,
      };
      await setOptions(options);
    });

    return {
      enableDebugLog,
      enableIDN,
      enableRefang,
      hybridAnalysisAPIKey,
      isInitialized,
      preferHrefValue,
      SCANNABLE_TYPES,
      scannableType,
      Scanners,
      SEARCHABLE_TYPES,
      searchableType,
      Searchers,
      strictTLD,
      urlscanAPIKey,
      virusTotalAPIKey,
      disableOrEnableScanner,
      disableOrEnableSearcher,
      getFaviconURL,
      isEnabledScanner,
      isEnabledSearcher,
      isSelectedScanner,
      isSelectedSearcher,
      selectScannableType,
      selectSearchableType,
    };
  },
});
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered" v-if="isInitialized">
        <div class="column is-half">
          <h1 class="title is-1">Mitaka</h1>

          <div class="content">
            <ul>
              <li><a href="#general">General</a></li>
              <li><a href="#scanners">Scanners</a></li>
              <li><a href="#searchers">Searchers</a></li>
            </ul>
          </div>

          <div class="box" id="general">
            <h2 class="title is-2">General settings</h2>
            <article class="message is-warning">
              <div class="message-body">
                <strong>Warning</strong>: Enabling IDN extraction, strict TLD
                validation and refang option may cause a performance issue
              </div>
            </article>

            <div class="field has-addons">
              <div class="control is-expanded">
                <label class="label"> Enable IDN extraction </label>
                <p class="help">IDN: Internationalized Domain Name</p>
              </div>
              <div class="control">
                <input type="checkbox" v-model="enableIDN" />
                <label>Enable</label>
              </div>
            </div>

            <div class="field has-addons">
              <div class="control is-expanded">
                <label class="label"> Enable strict TLD validation </label>
                <p class="help">TLD: Top Level Domain</p>
              </div>
              <div class="control">
                <input type="checkbox" v-model="strictTLD" />
                <label>Enable</label>
              </div>
            </div>

            <div class="field has-addons mt-1">
              <div class="control is-expanded">
                <label class="label"> Enable refang </label>
                <p class="help">
                  Enable a transformation like <code>example[.]com</code> to
                  <code>example.com</code>
                </p>
              </div>
              <div class="control">
                <input type="checkbox" v-model="enableRefang" />
                <label>Enable</label>
              </div>
            </div>

            <div class="field has-addons mt-1">
              <div class="control is-expanded">
                <label class="label"> Prefer href value </label>
                <p class="help">Prefer a href value to a text</p>
              </div>
              <div class="control">
                <input type="checkbox" v-model="preferHrefValue" />
                <label>Enable</label>
              </div>
            </div>

            <div class="field has-addons mt-1">
              <div class="control is-expanded">
                <label class="label"> Enable debug log </label>
              </div>
              <div class="control">
                <input type="checkbox" v-model="enableDebugLog" />
                <label>Enable</label>
              </div>
            </div>
          </div>

          <div class="box" id="scanners">
            <h2 class="title is-2">Scanner settings</h2>
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
            <div v-for="(scanner, index) in Scanners" :key="index">
              <div
                class="searcher field has-addons"
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
                  <label>Enable</label>
                </div>
              </div>
              <div class="field">
                <div class="control" v-if="scanner.hasAPIKey">
                  <input
                    type="text"
                    class="input"
                    v-model="virusTotalAPIKey"
                    v-if="scanner.name === 'VirusTotal'"
                  />
                  <input
                    type="text"
                    class="input"
                    v-model="urlscanAPIKey"
                    v-if="scanner.name === 'urlscan.io'"
                  />
                  <input
                    type="text"
                    class="input"
                    v-model="hybridAnalysisAPIKey"
                    v-if="scanner.name === 'HybridAnalysis'"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="box" id="searchers">
            <h2 class="title is-2">Searcher settings</h2>

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
            <div v-for="(searcher, index) in Searchers" :key="index">
              <div
                class="searcher field has-addons"
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
                  <label>Enable</label>
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
.tags .tag {
  margin-bottom: 0px;
}

.searcher {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
}

.searcher:nth-child(even) {
  background-color: #fafafa;
}

article.message .message-body {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
