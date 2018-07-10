import { getIOC, IOC } from 'ioc-extractor';
import { SearcherResult, Selector } from './lib/selector';
import { Urlscan } from './lib/urlscan';

function showNotification(message) {
  chrome.notifications.create({
    iconUrl: './icons/48.png',
    message,
    title: 'Mitaka',
    type: 'basic',
  });
}

function listner(info, tab) {
  const id: string = info.menuItemId;
  const arr = id.split(' ');
  const name = arr[arr.length - 1];
  const query = arr.slice(1, arr.length - 5).join(' ');
  const selector: Selector = new Selector(query);
  const results: SearcherResult[] = selector.getSearcherResults();
  const result = results.find((r) => r.searcher.name === name);
  let target = '';
  if (result !== undefined) {
    switch (result.type) {
      case 'raw':
        target = result.searcher.searchByRaw!(result.query);
        break;
      case 'ip':
        target = result.searcher.searchByIP!(result.query);
        break;
      case 'domain':
        target = result.searcher.searchByDomain!(result.query);
        break;
      case 'url':
        target = result.searcher.searchByURL!(result.query);
        break;
      case 'hash':
        target = result.searcher.searchByHash!(result.query);
        break;
    }
  }
  if (target !== undefined && target !== '') {
    chrome.tabs.create({ url: target });
  }
}

function submit(query) {
  chrome.storage.sync.get('apiKey', async (config) => {
    const urlscan = new Urlscan(config.apiKey);
    const res = await urlscan.scanByUrl(query).catch((e) => {
      let message;
      if (e.response.status === 401) {
        message = 'Please set your API key via the option';
      } else {
        message = e.response.data.description;
      }
      showNotification(message);
    });
    if (res) {
      chrome.tabs.create({
        url: res.data.result,
      });
    }
  });
}

interface Menu {
  title: string;
  id: string;
}
const menus: Menu[] = [
  { title: 'Scan it on urlscan.io',       id: 'Urlscan-scan' },
  { title: 'Search it on Censys',         id: 'Censys-search' },
  { title: 'Search it on PublicWWW',      id: 'PublicWWW-search' },
  { title: 'Search it on SecurityTrails', id: 'SecurityTrails-search' },
  { title: 'Search it on Shodan',         id: 'Shodan-search' },
  { title: 'Search it on urlscan.io',     id: 'Urlscan-search' },
  { title: 'Search it on VirusTotal',     id: 'VirusTotal-search' },
];

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.request === 'updateContextMenu') {
    await chrome.contextMenus.removeAll();
    const text: string = message.selection;    const selector: Selector = new Selector(text);
    const results: SearcherResult[] = selector.getSearcherResults();
    for (const result of results) {
      const name = result.searcher.name;
      const id = `${name}-search`;
      const title = `Search ${result.query} as a ${result.type} on ${name}`;
      const options = {
        contexts: ['selection'],
        id: title,
        onclick: listner,
        title,
      };
      chrome.contextMenus.create(options);
    }
  }
});
