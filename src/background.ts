import { Censys } from './lib/censys';
import { PublicWWW } from './lib/publicwww';
import { SecurityTrails } from './lib/securitytrails';
import { Shodan } from './lib/shodan';
import { Urlquery } from './lib/urlquery';
import { Urlscan } from './lib/urlscan';
import { removeSquareBrackets } from './lib/util';
import { VirusTotal } from './lib/virustotal';

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
    case 'mitaka-search-securitytrails':
      {
        searchSecurityTrails(query);
        break;
      }
  }
}

function searchShodan(query) {
  const shodan = new Shodan();
  const url = shodan.searchUrl(query);
  chrome.tabs.create({
    url,
  });
}

function searchCensys(query) {
  const censys = new Censys();
  const url = censys.searchUrl(query);
  chrome.tabs.create({
    url,
  });
}

function searchVirusTotal(query) {
  const vt = new VirusTotal();
  const url = vt.searchUrl(query);
  chrome.tabs.create({
    url,
  });
}

function searchSecurityTrails(query) {
  const st = new SecurityTrails();
  const url = st.searchUrl(query);
  chrome.tabs.create({
    url,
  });
}

function searchPublicWWW(query) {
  const publicwwww = new PublicWWW();
  const url = publicwwww.searchUrl(query);
  chrome.tabs.create({
    url,
  });
}

function searchUrlquery(query) {
  const urlquery = new Urlquery();
  const url = urlquery.searchUrl(query);
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
    { title: 'Search it on SecurityTrails', name: 'mitaka-search-securitytrails' },
  ];
  for (const menu of menus) {
    chrome.contextMenus.create({
      title: menu.title,
      id: menu.name,
      contexts,
    });
  }
});
