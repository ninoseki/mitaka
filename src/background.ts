import { Command } from './lib/command';
import { SearcherResult, Selector } from './lib/selector';
import { Urlscan } from './lib/urlscan';

function showNotification(message: string) {
  chrome.notifications.create({
    iconUrl: './icons/48.png',
    message,
    title: 'Mitaka',
    type: 'basic',
  });
}

function listner(info, tab) {
  const id: string = info.menuItemId;
  const command = new Command(id);
  switch (command.action) {
    case 'search':
      try {
        const url = command.search();
        if (url !== undefined && url !== '') {
          chrome.tabs.create({ url });
        }
      } catch (err) {
        showNotification(err.message);
      }
      break;
    case 'scan':
      scan(command.query);
      break;
  }
}

function scan(query) {
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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.request === 'updateContextMenu') {
    chrome.contextMenus.removeAll(() => {
      // search searchers based on a type of the input
      const text: string = message.selection;
      const selector: Selector = new Selector(text);
      const results: SearcherResult[] = selector.getSearcherResults();
      for (const result of results) {
        const name = result.searcher.name;
        // it tells action/query/type/target to the listner
        const id = `Search ${result.query} as a ${result.type} on ${name}`;
        const title = `Search this ${result.type} on ${name}`;
        const options = {
          contexts: ['selection'],
          id,
          onclick: listner,
          title,
        };
        chrome.contextMenus.create(options);
      }
      // if there is a url in the ioc, show the scan option
      if (selector.getUrl() !== null) {
        const id = `Scan ${selector.getUrl()} as a url on Urlscan`;
        const title = `Scan this url on Urlscan`;
        const options = {
          contexts: ['selection'],
          id,
          onclick: listner,
          title,
        };
        chrome.contextMenus.create(options);
      }
    });
  }
});

chrome.contextMenus.onClicked.addListener(() => {
  chrome.contextMenus.removeAll();
});
