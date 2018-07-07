import { getIOC, IOC } from 'ioc-extractor';

function showNotification(message) {
  chrome.notifications.create({
    iconUrl: './icons/48.png',
    message,
    title: 'Mitaka',
    type: 'basic',
  });
}

function listner(info, tab) {
  const query = (info.linkUrl || info.selectionText);
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
      contexts,
      id: menu.name,
      title: menu.title,
    });
  }
});

interface Menu {
  title: string;
  id: string;
}
const menus: Menu[] = [
  { title: 'Search it on Censys',     id: 'censys-search' },
  { title: 'Search it on Shodan',     id: 'shodan-search' },
  { title: 'Search it on urlscan.io', id: 'urlscan-search' },
  { title: 'Scan it on urlscan.io',   id: 'urlscan-scan' },
  { title: 'Search it on PublicWWW',  id: 'publicwww-scan' },
  { title: 'Search it on Urlquery',   id: 'urlquery-scan' },
  { title: 'Search it on VirusTotal', id: 'virustotal-scan' },
];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.request === 'updateContextMenu') {
    for (const menu of menus) {
      chrome.contextMenus.remove(menu.id);
    }
    const text: string = message.selection;
    const ioc: IOC = getIOC(text);

    const options = {
      contexts: ['selection'],
      id: type,
      onclick: cmClickHandler,
      title: type,
    };
    const cmid = chrome.contextMenus.create(options);
    contextMenuIds.push(type);
  }
});
