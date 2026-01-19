// Grammar Guardian - Content Script
// This script finds text areas and input fields, injects UI for error highlighting

const LANGUAGETOOL_API = "https://api.languagetoolplus.com/v2/check";

// Store for current errors
let currentErrors = new Map();
let activeElement = null;

// Initialize content script
function initContentScript() {
  injectErrorOverlay();
  addEventListeners();
}

// Add event listeners to text fields
function addEventListeners() {
  document.addEventListener("focusin", handleFieldFocus);
  document.addEventListener("focusout", handleFieldFocusOut);
  document.addEventListener("input", debounce(handleTextInput, 1500));
}

// Handle when user focuses on a text field
function handleFieldFocus(e) {
  if (isEditableField(e.target)) {
    activeElement = e.target;
    checkGrammarInField(activeElement);
  }
}

// Handle when user loses focus
function handleFieldFocusOut(e) {
  if (isEditableField(e.target)) {
    // Keep overlay visible but ready for next focus
  }
}

// Check if element is a text field
function isEditableField(element) {
  return (
    element.tagName === "TEXTAREA" ||
    (element.tagName === "INPUT" &&
      ["text", "email", "url", "search", "tel", ""].includes(element.type))
  );
}

// Handle text input with debouncing
function handleTextInput(e) {
  if (isEditableField(e.target)) {
    activeElement = e.target;
    checkGrammarInField(e.target);
  }
}

// Check grammar using LanguageTool API
async function checkGrammarInField(element) {
  const text = element.value;

  if (text.trim().length < 3) {
    clearHighlights(element);
    return;
  }

  try {
    const response = await fetch(LANGUAGETOOL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text: text,
        language: "en-US",
      }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    const matches = data.matches || [];

    if (matches.length > 0) {
      displayErrors(element, matches);
      currentErrors.set(element, matches);
    } else {
      clearHighlights(element);
      currentErrors.delete(element);
    }
  } catch (error) {
    console.error("Grammar check error:", error);
  }
}

// Display errors with highlighting
function displayErrors(element, matches) {
  clearHighlights(element);

  // Create a container to show errors
  let container = element.nextElementSibling;
  if (
    !container ||
    !container.classList.contains("grammar-suggestions-container")
  ) {
    container = document.createElement("div");
    container.className = "grammar-suggestions-container";
    element.parentNode.insertBefore(container, element.nextSibling);
  }

  let html = '<div class="suggestions-header">⚠️ Grammar Issues Found:</div>';

  matches.forEach((match, index) => {
    const offset = match.offset;
    const length = match.length;
    const suggestions = (match.replacements || [])
      .slice(0, 3)
      .map((r) => r.value);

    html += `
      <div class="suggestion-item" data-index="${index}">
        <div class="error-text">
          <strong>"${element.value.substring(offset, offset + length)}"</strong>
          → ${match.message}
        </div>
        <div class="suggestion-options">
          ${suggestions
            .map(
              (s, i) =>
                `<button class="suggestion-btn" data-index="${index}" data-replacement="${i}">
              ${s}
            </button>`,
            )
            .join("")}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  container.style.display = "block";

  // Add click handlers for suggestions
  container.querySelectorAll(".suggestion-btn").forEach((btn) => {
    btn.addEventListener("click", () => applySuggestion(element, matches, btn));
  });
}

// Apply suggestion replacement
function applySuggestion(element, matches, btn) {
  const errorIndex = parseInt(btn.dataset.index);
  const replacementIndex = parseInt(btn.dataset.replacement);
  const match = matches[errorIndex];
  const replacement = match.replacements[replacementIndex].value;

  const offset = match.offset;
  const length = match.length;

  const text = element.value;
  element.value =
    text.substring(0, offset) + replacement + text.substring(offset + length);

  // Trigger input event to refresh checks
  element.dispatchEvent(new Event("input", { bubbles: true }));
}

// Clear highlights
function clearHighlights(element) {
  const container = element.nextElementSibling;
  if (
    container &&
    container.classList.contains("grammar-suggestions-container")
  ) {
    container.style.display = "none";
  }
}

// Inject styles and overlay
function injectErrorOverlay() {
  // Styles are loaded via manifest.json
}

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContentScript);
} else {
  initContentScript();
}
