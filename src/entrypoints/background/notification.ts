export async function showNotification(message: string): Promise<string> {
  return await chrome.notifications.create({
    iconUrl: chrome.runtime.getURL('icons/128.png'),
    message,
    title: 'Mitaka',
    type: 'basic',
  })
}
