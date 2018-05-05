import { Censys } from './censys';
import { PublicWWW } from './publicwww';
import { Shodan } from './shodan';
import { Urlquery } from './urlquery';
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
    case 'mitaka-search-censys':
      {
        searchCensys(query);
        break;
      }
    case 'mitaka-search-shodan':
      {
        searchShodan(query);
        break;
      }
  }
}

function searchShodan(query) {
  const shodan = new Shodan(query);
  const url = shodan.searchUrl();
  chrome.tabs.create({
    url,
  })
}

function searchCensys(query) {
  const censys = new Censys(query);
  const url = censys.searchUrl();
  chrome.tabs.create({
    url,
  });
}

function searchVirusTotal(query) {
  const vt = new VirusTotal(query);
  const url = vt.searchUrl();
  chrome.tabs.create({
    url,
  });
}

function searchPublicWWW(query) {
  const publicwwww = new PublicWWW(query);
  const url = publicwwww.searchUrl();
  chrome.tabs.create({
    url,
  });
}

function searchUrlquery(query) {
  const urlquery = new Urlquery(query);
  const url = urlquery.searchUrl();
  chrome.tabs.create({
    url,
  });
}

function search(query) {
  const urlscan = new Urlscan('dummy');
  const url = urlscan.searchUrl(query);
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
    { title: 'Search it on Censys', name: 'mitaka-search-censys' },
    { title: 'Search it on Shodan', name: 'mitaka-search-shodan' },
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
