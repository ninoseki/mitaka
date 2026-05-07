<script lang="ts">
export default {
  name: 'AppView',
}
</script>

<script setup lang="ts">
import '~/assets/tailwind.css'

import { onMounted, reactive, ref, watch } from 'vue'

import { Scanners } from '~/scanner'
import type { OptionsType, SearchableType } from '~/schemas'
import { Searchers } from '~/searcher'
import { getOptions, setOptions } from '~/storage'
import type { ScannableType, Scanner, Searcher } from '~/types'
import { SCANNABLE_TYPES, SEARCHABLE_TYPES } from '~/types'
import { getFaviconURL } from '~/utils'

const isInitialized = ref(false)
const synchedAt = ref<string>()

const searchableType = ref<SearchableType>()
const scannableType = ref<ScannableType>()

const options = reactive<OptionsType>({
  debug: false,
  href: true,
  punycode: false,
  refang: true,
  strict: true,
  hybridAnalysisAPIKey: undefined,
  urlscanAPIKey: undefined,
  urlscanVisibility: 'public',
  virusTotalAPIKey: undefined,
  disabledScannerNames: [],
  disabledSearcherNames: [],
})

onMounted(async () => {
  const storageOptions = await getOptions()
  Object.assign(options, { ...storageOptions })
})

const isEnabledSearcher = (name: string): boolean => {
  return !options.disabledSearcherNames.includes(name)
}

const isEnabledScanner = (name: string): boolean => {
  return !options.disabledScannerNames.includes(name)
}

const disableOrEnableSearcher = (name: string): void => {
  if (options.disabledSearcherNames.includes(name)) {
    options.disabledSearcherNames = options.disabledSearcherNames.filter((n) => n !== name)
  } else {
    options.disabledSearcherNames.push(name)
  }
}

const disableOrEnableScanner = (name: string): void => {
  if (options.disabledScannerNames.includes(name)) {
    options.disabledScannerNames = options.disabledScannerNames.filter((n) => n !== name)
  } else {
    options.disabledScannerNames.push(name)
  }
}

const selectSearchableType = (selected: SearchableType): void => {
  if (selected === searchableType.value) {
    searchableType.value = undefined
  } else {
    searchableType.value = selected
  }
}

const selectScannableType = (selected: ScannableType): void => {
  if (selected === scannableType.value) {
    scannableType.value = undefined
  } else {
    scannableType.value = selected
  }
}

const isSelectedSearcher = (searcher: Searcher): boolean => {
  if (searchableType.value) {
    return searcher.supportedTypes.includes(searchableType.value)
  }
  return true
}

const isSelectedScanner = (scanner: Scanner): boolean => {
  if (scannableType.value) {
    return scanner.supportedTypes.includes(scannableType.value)
  }
  return true
}

watch(options, async (newOptions) => {
  // don't sync for the first time (this event is invoked through onMounted)
  if (isInitialized.value) {
    await setOptions(newOptions)
  }

  synchedAt.value = new Date().toISOString()
  isInitialized.value = true
})
</script>

<template>
  <div class="navbar bg-base-100 fixed top-0 left-0 right-0 z-50 border-b border-base-300">
    <div class="flex-1">
      <span class="text-2xl font-bold px-4">Mitaka</span>
      <a class="btn btn-ghost btn-sm" href="#general">General</a>
      <a class="btn btn-ghost btn-sm" href="#scanners">Scanners</a>
      <a class="btn btn-ghost btn-sm" href="#searchers">Searchers</a>
    </div>
    <div class="flex-none px-4 text-sm opacity-70">
      <span v-if="synchedAt">(Synced at: {{ synchedAt }})</span>
    </div>
  </div>

  <section class="pt-24 pb-12 px-6">
    <div class="container mx-auto" v-if="isInitialized">
      <div class="flex justify-center">
        <div class="w-full max-w-2xl space-y-6">
          <div class="card bg-base-100 shadow border border-base-300" id="general">
            <div class="card-body">
              <h2 class="card-title text-3xl mb-4">General</h2>

              <div class="flex items-start gap-2 py-2">
                <div class="flex-1">
                  <div class="font-semibold">Strict</div>
                  <p class="text-sm opacity-70">Whether to do strict TLD matching or not.</p>
                </div>
                <input type="checkbox" class="checkbox" v-model="options.strict" />
              </div>

              <div class="flex items-start gap-2 py-2">
                <div class="flex-1">
                  <div class="font-semibold">Punycode</div>
                  <p class="text-sm opacity-70">Whether to enable Punycode conversion or not.</p>
                  <p class="text-sm text-error">(Punycode conversion can be lossy)</p>
                </div>
                <input type="checkbox" class="checkbox" v-model="options.punycode" />
              </div>

              <div class="flex items-start gap-x-28 py-2">
                <div class="flex-1">
                  <div class="font-semibold">Refang</div>
                  <p class="text-sm opacity-70">
                    Whether to do refang (e.g. <code>example[.]com</code> to
                    <code>example.com</code>) or not.
                  </p>
                </div>
                <input type="checkbox" class="checkbox" v-model="options.refang" />
              </div>

              <div class="flex items-start gap-2 py-2">
                <div class="flex-1">
                  <div class="font-semibold">Prefer href value</div>
                  <p class="text-sm opacity-70">Prefer a href value to a text or not.</p>
                </div>
                <input type="checkbox" class="checkbox" v-model="options.href" />
              </div>

              <div class="flex items-start gap-2 py-2">
                <div class="flex-1">
                  <div class="font-semibold">Debug</div>
                  <p class="text-sm opacity-70">Whether to enable debug logs or not.</p>
                </div>
                <input type="checkbox" class="checkbox" v-model="options.debug" />
              </div>
            </div>
          </div>

          <div class="card bg-base-100 shadow border border-base-300" id="scanners">
            <div class="card-body">
              <h2 class="card-title text-3xl mb-4">Scanners</h2>

              <div class="flex flex-wrap gap-2">
                <span
                  class="badge badge-info badge-soft cursor-pointer"
                  @click="selectScannableType(tag)"
                  v-for="tag in SCANNABLE_TYPES"
                  :key="tag"
                >
                  {{ tag }}
                  <span v-if="scannableType === tag" class="ml-1 font-bold">×</span>
                </span>
              </div>
              <div class="divider"></div>

              <div class="space-y-4" v-for="(scanner, index) in Scanners" :key="index">
                <div class="flex items-start gap-2" v-if="isSelectedScanner(scanner)">
                  <div class="flex-1">
                    <div class="font-semibold flex items-center gap-2">
                      <img class="w-4 h-4" :src="getFaviconURL(scanner.baseURL)" />
                      <a class="link link-hover" :href="scanner.baseURL" target="_blank">
                        {{ scanner.name }}
                      </a>
                    </div>
                    <p class="flex flex-wrap items-center gap-2 mt-2">
                      <strong class="text-sm">Supported types:</strong>
                      <span
                        class="badge badge-info badge-soft"
                        v-for="(supportedType, idx) in scanner.supportedTypes"
                        :key="idx"
                      >
                        {{ supportedType }}
                      </span>
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    class="checkbox"
                    :checked="isEnabledScanner(scanner.name)"
                    @click="disableOrEnableScanner(scanner.name)"
                  />
                </div>

                <div v-if="isSelectedScanner(scanner)">
                  <input
                    type="text"
                    class="input w-full"
                    v-model="options.virusTotalAPIKey"
                    placeholder="VirusTotal API key"
                    v-if="scanner.name === 'VirusTotal'"
                  />
                  <input
                    type="text"
                    class="input w-full"
                    v-model="options.urlscanAPIKey"
                    placeholder="urlscan.io key"
                    v-if="scanner.name === 'urlscan.io'"
                  />
                  <input
                    type="text"
                    class="input w-full"
                    v-model="options.hybridAnalysisAPIKey"
                    placeholder="HybridAnalysis API key"
                    v-if="scanner.name === 'HybridAnalysis'"
                  />
                </div>

                <div v-if="isSelectedScanner(scanner) && scanner.name === 'urlscan.io'">
                  <label class="block font-semibold mb-1">Visibility</label>
                  <select class="select w-full" v-model="options.urlscanVisibility">
                    <option>public</option>
                    <option>unlisted</option>
                    <option>private</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="card bg-base-100 shadow border border-base-300" id="searchers">
            <div class="card-body">
              <h2 class="card-title text-3xl mb-4">Searchers</h2>

              <div class="flex flex-wrap gap-2">
                <span
                  class="badge badge-info badge-soft cursor-pointer"
                  @click="selectSearchableType(tag)"
                  v-for="tag in SEARCHABLE_TYPES"
                  :key="tag"
                >
                  {{ tag }}
                  <span v-if="searchableType === tag" class="ml-1 font-bold">×</span>
                </span>
              </div>
              <div class="divider"></div>

              <div class="space-y-4" v-for="(searcher, index) in Searchers" :key="index">
                <div class="flex items-start gap-2" v-if="isSelectedSearcher(searcher)">
                  <div class="flex-1">
                    <div class="font-semibold flex items-center gap-2">
                      <img class="w-4 h-4" :src="getFaviconURL(searcher.baseURL)" />
                      <a class="link link-hover" :href="searcher.baseURL" target="_blank">
                        {{ searcher.name }}
                      </a>
                    </div>
                    <p class="flex flex-wrap items-center gap-2 mt-2">
                      <strong class="text-sm">Supported types:</strong>
                      <span
                        class="badge badge-info badge-soft"
                        v-for="(supportedType, idx) in searcher.supportedTypes"
                        :key="idx"
                      >
                        {{ supportedType }}
                      </span>
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    class="checkbox"
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
