import { Urlscan } from './urlscan';
import { removeSquareBrackets } from './util';
import { VirusTotal } from './virustotal';

function showNotification(message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: './icons/48.png',
    title: 'Mitaka',
    message,
  });
}

function listner(info, tab) {
  const query = removeSquareBrackets(info.linkUrl || info.selectionText);
  switch (info.menuItemId) {
    case 'mitaka-search':
      {
        search(query);
        break;
      }
    case 'mitaka-submit':
      {
        submit(query);
        break;
      }
    case 'mitaka-search-publicwww':
      {
        searchPublicWWW(query);
        break;
      }
    case 'mitaka-search-urlquery':
      {
        searchUrlquery(query);
        break;
      }
    case 'mitaka-search-virustotal':
      {
        searchVirusTotal(query);
        break;
      }
  }
}

function searchVirusTotal(query) {
  const vt = new VirusTotal(query);
  const url = vt.search_url();
  chrome.tabs.create({
    url,
  });
}

function searchPublicWWW(query) {
  const encoded = encodeURIComponent(query);
  const url = `https://publicwww.com/websites/${encoded}/`;
  chrome.tabs.create({
    url,
  });
}

function searchUrlquery(query) {
  const encoded = encodeURIComponent(query);
  const url = `http://urlquery.net/search?q=${encoded}`;
  chrome.tabs.create({
    url,
  });
}

function search(query) {
  const urlscan = new Urlscan('dummy');
  const url = urlscan.search_url(query);
  chrome.tabs.create({
    url,
  });
}

function submit(query) {
  chrome.storage.sync.get('apiKey', async (config) => {
    const urlscan = new Urlscan(config.apiKey);
    const res = await urlscan.submit(query).catch((e) => {
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

chrome.contextMenus.onClicked.addListener(listner);

chrome.runtime.onInstalled.addListener(() => {
  const contexts = ['selection', 'link'];
  interface Menu {
    title: string;
    name: string;
  }
  const menus: Menu[] = [
    { title: 'Search it on urlscan.io', name: 'mitaka-search' },
    { title: 'Scan it on urlscan.io', name: 'mitaka-submit' },
    { title: 'Search it on PublicWWW', name: 'mitaka-search-publicwww' },
    { title: 'Search it on Urlquery', name: 'mitaka-search-urlquery' },
    { title: 'Search it on VirusTotal', name: 'mitaka-search-virustotal' },
  ];
  for (const menu of menus) {
    chrome.contextMenus.create({
      title: menu.title,
      id: menu.name,
      contexts,
    });
  }
});
