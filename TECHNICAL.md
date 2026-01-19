# Technical Documentation - Grammar Guardian

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Chrome Browser                        │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────┐  ┌──────────────────────────────┐ │
│  │  Content Script  │  │   Background Service Worker │ │
│  │  (content.js)    │  │   (background.js)           │ │
│  │                  │  │                              │ │
│  │ • Find elements  │  │ • Lifecycle management      │ │
│  │ • Monitor input  │  │ • Message routing           │ │
│  │ • Display errors │  │ • State management          │ │
│  └────────┬─────────┘  └──────────────────────────────┘ │
│           │                                               │
│           └──────────────┬───────────────────────────────┘│
│                          │                                 │
│                   ┌──────▼──────────────────────┐         │
│                   │   Popup UI (popup.html)     │         │
│                   │ • Settings                  │         │
│                   │ • Status display            │         │
│                   │ • Information               │         │
│                   └──────────────────────────────┘         │
│                                                           │
│  ┌──────────────────────────────────────────────┐         │
│  │            DOM Elements                      │         │
│  │  • <textarea>                                │         │
│  │  • <input type="text">                       │         │
│  │  • Grammar Suggestions Overlay               │         │
│  └──────────────────────────────────────────────┘         │
│                                                           │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTP POST
                          │
        ┌─────────────────▼────────────────┐
        │  LanguageTool API                │
        │  https://api.languagetoolplus.com│
        │                                  │
        │ Returns:                         │
        │ • Error locations                │
        │ • Error messages                 │
        │ • Suggestions                    │
        └────────────────────────────────┘
```

## File Structure & Responsibilities

### 1. manifest.json

**Purpose**: Extension configuration and permissions
**Key Sections**:

- `manifest_version`: 3 (latest standard)
- `permissions`: scripting, activeTab
- `host_permissions`: <all_urls> (access to all websites)
- `content_scripts`: Load content.js + styles.css on all pages
- `background.service_worker`: Load background.js
- `action.default_popup`: Show popup.html when icon clicked

### 2. content.js

**Purpose**: Core extension logic - detects errors in real-time

**Key Functions**:

```javascript
initContentScript()
├── injectErrorOverlay()          // Setup UI
└── addEventListeners()           // Listen for text input
    ├── focusin  → handleFieldFocus()
    ├── focusout → handleFieldFocusOut()
    └── input    → handleTextInput() [debounced 1500ms]

checkGrammarInField(element)
├── Get text from field
└── POST to LanguageTool API
    └── displayErrors() or clearHighlights()

displayErrors(element, matches)
├── Create suggestions container
├── Build HTML with errors and buttons
└── Attach click handlers

applySuggestion(element, matches, btn)
├── Get selected replacement
├── Replace text in field
└── Trigger input event for re-check

handleFieldFocus/Input/FocusOut()
└── Update activeElement reference
```

**Data Flow**:

1. User types in field → input event fires
2. Debounce timer (1500ms) → prevents too many API calls
3. Text extracted from element.value
4. POST to LanguageTool API
5. Response parsed into matches array
6. HTML overlay created with suggestions
7. Click handlers attached to suggestion buttons
8. User clicks suggestion → text replaced → re-check triggered

### 3. background.js

**Purpose**: Extension lifecycle and message handling

**Current Functions**:

- `onInstalled`: Runs on first installation
- `onMessage`: Listens for messages from content script (future expansion)

**Extensible for**:

- Storage management
- Cross-tab communication
- API rate limiting
- Analytics

### 4. popup.html / popup.js

**Purpose**: Extension popup UI and settings

**Features**:

- Extension info
- Usage instructions
- Settings toggles (auto-check, advanced mode)
- Status indicator
- Links to documentation

**Data Stored** (via chrome.storage.sync):

- autoCheck: boolean
- showAdvanced: boolean

### 5. styles.css

**Purpose**: Styling for error overlay in web pages

**Key Classes**:

- `.grammar-suggestions-container`: Main overlay container
- `.suggestions-header`: Header with warning
- `.suggestion-item`: Individual error item
- `.suggestion-btn`: Clickable suggestion buttons
- Dark mode support via `@media (prefers-color-scheme: dark)`

### 6. popup-styles.css

**Purpose**: Styling for popup interface

## API Integration: LanguageTool

### Endpoint

```
POST https://api.languagetoolplus.com/v2/check
```

### Request Format

```javascript
{
  "text": "The qwick brown fox",
  "language": "en-US"
}
```

### Response Format

```json
{
  "matches": [
    {
      "message": "Possible spelling mistake",
      "offset": 4,
      "length": 5,
      "replacements": [
        {"value": "quick"},
        {"value": "quack"}
      ],
      "rule": {...}
    }
  ],
  "language": "en-US"
}
```

### Key Response Fields

- `offset`: Character position where error starts
- `length`: Number of characters in the error
- `message`: Human-readable error description
- `replacements[].value`: Suggested correction
- We use up to 3 suggestions per error

## Communication Flow

### Content Script → API

```javascript
const response = await fetch(LANGUAGETOOL_API, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    text: fieldText,
    language: "en-US",
  }),
});
```

### API Response → UI Update

```javascript
const data = await response.json();
const matches = data.matches || [];

if (matches.length > 0) {
  displayErrors(element, matches); // Show overlay
} else {
  clearHighlights(element); // Hide overlay
}
```

### User Interaction → Text Update

```javascript
// User clicks suggestion button
suggestion_btn.addEventListener("click", () => {
  applySuggestion(element, matches, btn);
  // Text in field is updated
  // Input event triggered
  // Grammar check runs again
});
```

## Performance Optimizations

### 1. Debouncing

```javascript
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
// Usage: input event debounced for 1500ms
// Prevents sending API request for every keystroke
```

### 2. Text Length Check

```javascript
if (text.trim().length < 3) {
  clearHighlights(element);
  return; // Don't send tiny snippets to API
}
```

### 3. Error Limiting

We only show up to 3 suggestions per error to keep UI clean

### 4. Element Type Checking

```javascript
function isEditableField(element) {
  return (
    element.tagName === "TEXTAREA" ||
    (element.tagName === "INPUT" &&
      ["text", "email", "url", "search", "tel", ""].includes(element.type))
  );
}
// Prevents checking on password fields, file inputs, etc.
```

## Error Handling

### API Errors

```javascript
try {
  const response = await fetch(LANGUAGETOOL_API, {...});
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  // Process matches...
} catch (error) {
  console.error('Grammar check error:', error);
  // Silently fail - overlay won't show
}
```

### Missing Elements

```javascript
let container = element.nextElementSibling;
if (
  !container ||
  !container.classList.contains("grammar-suggestions-container")
) {
  container = document.createElement("div");
  container.className = "grammar-suggestions-container";
  element.parentNode.insertBefore(container, element.nextSibling);
}
// Creates container if it doesn't exist
```

## Browser Compatibility

| Feature         | Chrome | Edge | Brave | Chromium |
| --------------- | ------ | ---- | ----- | -------- |
| Manifest v3     | ✓      | ✓    | ✓     | ✓        |
| Content Scripts | ✓      | ✓    | ✓     | ✓        |
| Service Workers | ✓      | ✓    | ✓     | ✓        |
| Fetch API       | ✓      | ✓    | ✓     | ✓        |
| DOM APIs        | ✓      | ✓    | ✓     | ✓        |

## Limitations & Future Work

### Current Limitations

1. **No contentEditable support** - Only works on <textarea> and <input>
2. **English only** - Can be extended to support other languages
3. **Requires internet** - API calls need connection
4. **No offline mode** - Can add local rule engine later

### Future Enhancements

1. **contentEditable Elements**
   - Handle rich text editors (Medium, Gmail compose)
   - More complex DOM manipulation

2. **Multiple Languages**
   - Language detection
   - User language preference
   - Support for any LanguageTool language

3. **Offline Mode**
   - Embed lightweight grammar rules
   - Work without internet connection

4. **Custom Dictionary**
   - Allow users to add domain-specific terms
   - Store in chrome.storage

5. **Performance Metrics**
   - Track correction suggestions used
   - Show writing statistics

6. **Advanced Features**
   - Keyboard shortcuts (Ctrl+Shift+G to check)
   - Style checking (not just grammar)
   - Tone detection

## Security Considerations

✅ **What we do right**:

- No API keys stored in code
- No user data collection
- All text sent to trusted third-party API (LanguageTool)
- No tracking or analytics

⚠️ **Potential concerns**:

- Text is sent to LanguageTool API (check their privacy policy)
- API responses are trusted (could implement validation)
- No verification of API certificate (handled by browser)

## Testing Checklist

- [ ] Load unpacked extension successfully
- [ ] Extension appears in toolbar
- [ ] Popup opens and shows correctly
- [ ] Works on Gmail compose
- [ ] Works on Twitter/X compose
- [ ] Works on Reddit comment boxes
- [ ] Works on form text fields
- [ ] Suggestions apply correctly
- [ ] Multiple checks in sequence work
- [ ] Clearing field clears suggestions
- [ ] No console errors
- [ ] Dark mode overlay looks good
- [ ] Mobile compatibility (if applicable)

---

**Version**: 1.0.0 | **Last Updated**: 2026-01-19
