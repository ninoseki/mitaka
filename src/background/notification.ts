export function showNotification(message: string): void {
  chrome.notifications.create({
    iconUrl:
      "https://raw.githubusercontent.com/ninoseki/mitaka/master/assets/icon.png",
    message,
    title: "Mitaka",
    type: "basic",
  });
}
