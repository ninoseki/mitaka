export function showNotification(message: string): void {
  chrome.notifications.create({
    iconUrl: "./assets/icon.png",
    message,
    title: "Mitaka",
    type: "basic",
  });
}
