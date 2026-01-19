// Grammar Guardian - Background Service Worker
// Handles extension lifecycle and manages permissions

chrome.runtime.onInstalled.addListener(() => {
  console.log("Grammar Guardian extension installed successfully!");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkGrammar") {
    // Can be extended for additional processing
    sendResponse({ status: "ok" });
  }
});
