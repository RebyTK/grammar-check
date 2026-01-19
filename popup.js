// Grammar Guardian - Popup Script
// Handles popup interactions and settings

document.addEventListener("DOMContentLoaded", () => {
  const autoCheckCheckbox = document.getElementById("autoCheck");
  const advancedCheckbox = document.getElementById("showAdvanced");

  // Load saved settings
  chrome.storage.sync.get(["autoCheck", "showAdvanced"], (items) => {
    if (items.autoCheck !== undefined) {
      autoCheckCheckbox.checked = items.autoCheck;
    }
    if (items.showAdvanced !== undefined) {
      advancedCheckbox.checked = items.showAdvanced;
    }
  });

  // Save settings when changed
  autoCheckCheckbox.addEventListener("change", () => {
    chrome.storage.sync.set({ autoCheck: autoCheckCheckbox.checked });
  });

  advancedCheckbox.addEventListener("change", () => {
    chrome.storage.sync.set({ showAdvanced: advancedCheckbox.checked });
  });
});
