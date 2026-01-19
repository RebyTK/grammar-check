# Quick Start Guide - Grammar Guardian

## Installation Steps (1 minute)

### Step 1: Get the Code
```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/grammar-guardian.git
cd grammar-guardian
```

### Step 2: Open Chrome Extensions
- In Chrome, type in address bar: `chrome://extensions/`
- Or go to Menu → More Tools → Extensions

### Step 3: Enable Developer Mode
Look in the top-right corner of the Extensions page, you'll see a toggle switch labeled "Developer mode"
- Click it to turn it ON (it should turn blue/purple)

### Step 4: Load the Extension
- Click the button "Load unpacked" (appears after enabling Developer mode)
- Navigate to your `grammar-guardian` folder
- Select it and click "Select Folder"

### Step 5: Verify Installation
- You should see "Grammar Guardian" listed on the extensions page
- The extension icon (purple checkmark) should appear in your Chrome toolbar

## First Use (30 seconds)

1. Go to any website with text fields:
   - Gmail.com
   - Twitter.com
   - Reddit.com
   - Medium.com
   - Or any website with a text area

2. Click in a text field and start typing with intentional errors:
   ```
   I hav a great time writing grammer.
   ```

3. **Wait 1-2 seconds** after you stop typing

4. A **yellow overlay** will appear below the text field showing:
   - The error (red highlighted text)
   - The problem (e.g., "Possible spelling mistake")
   - Suggestions (green buttons)

5. **Click a green suggestion button** to apply the correction

## Example

**Before:**
```
The qwick brown fox jumps over the lazy dog
```

**Grammar Guardian shows:**
```
"qwick" → Did you mean?
  ○ quick
  ○ quack
```

**After clicking "quick":**
```
The quick brown fox jumps over the lazy dog
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Extension doesn't load | Reload page (Ctrl+R or Cmd+R) |
| No suggestions appear | Wait 1-2 seconds after typing |
| Text fields are ignored | Make sure you're in a `<textarea>` or `<input type="text">` |
| "Developer mode" missing | You might be on a Chrome OS device - reinstall if needed |
| API errors in console | Check internet connection; LanguageTool API needs connectivity |

## What Gets Checked

✅ **Works on:**
- Email composition (Gmail, Outlook)
- Social media posts (Twitter, Facebook, Reddit)
- Form fields (text input)
- Text areas (larger text fields)
- Blog post editors (Medium, Blogger, etc.)

❌ **Doesn't work on:**
- PDF files
- Images
- contentEditable divs (coming soon)
- Password fields

## Features You Can Use

### 1. Auto-Check (Default: ON)
Text is automatically checked 1.5 seconds after you stop typing

### 2. Multiple Suggestions
Each error shows up to 3 correction options
- Click any to apply

### 3. Click to Fix
One-click corrections - no copy-paste needed

### 4. Dark Mode
Overlay automatically adapts to your system's dark mode

## Getting Help

**Questions?** Open an issue on GitHub
**Want to contribute?** See CONTRIBUTING.md
**Found a bug?** Please report it!

---

**That's it! You're ready to improve your writing! 📝**
