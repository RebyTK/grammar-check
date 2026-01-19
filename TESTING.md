# Deployment & Testing Guide

## Local Testing (Before Publishing)

### Step 1: Verify All Files

```
grammar-guardian/
├── manifest.json          ✓ Manifest v3
├── content.js             ✓ Core logic
├── background.js          ✓ Service worker
├── popup.html             ✓ Popup UI
├── popup.js               ✓ Popup script
├── styles.css             ✓ Overlay styles
├── popup-styles.css       ✓ Popup styles
├── icons/
│   ├── icon-16.png        ✓
│   ├── icon-48.png        ✓
│   └── icon-128.png       ✓
├── README.md              ✓
├── INSTALLATION.md        ✓
├── TECHNICAL.md           ✓
├── CONTRIBUTING.md        ✓
├── LICENSE                ✓
├── package.json           ✓
└── .gitignore             ✓
```

### Step 2: Load in Chrome (Developer Mode)

**For testers:**

1. Open `chrome://extensions/`
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked"
4. Select the `grammar-guardian` folder
5. The extension should now appear in your toolbar

### Step 3: Manual Testing Plan

#### Test Case 1: Basic Functionality

**Website**: https://www.gmail.com
**Steps**:

1. Open Gmail
2. Click "Compose" button
3. Click in the compose area
4. Type: "I hav a greate day today"
5. Wait 2 seconds
6. **Expected**: Yellow box appears with suggestions
7. Click a suggestion button
8. **Expected**: Text is corrected, overlay updates

#### Test Case 2: Multiple Errors

**Website**: https://www.reddit.com
**Steps**:

1. Go to any subreddit
2. Click on a post comment box
3. Type: "their are many mispelled words in this sentance"
4. Wait for analysis
5. **Expected**: Multiple errors highlighted
6. Try different suggestions
7. **Expected**: All corrections apply correctly

#### Test Case 3: No Errors

**Website**: https://www.wikipedia.org
**Steps**:

1. Find a search box
2. Type: "The quick brown fox jumps"
3. Wait 2 seconds
4. **Expected**: No overlay appears (text is correct)

#### Test Case 4: Short Text

**Website**: Any website with search
**Steps**:

1. Click search box
2. Type: "ab"
3. Wait 2 seconds
4. **Expected**: No overlay (too short to check)

#### Test Case 5: Text Area Clearing

**Website**: https://www.twitter.com (or X.com)
**Steps**:

1. Start composing a tweet
2. Type: "teh quick fox"
3. Wait for overlay
4. Select all and delete
5. **Expected**: Overlay disappears

#### Test Case 6: Multiple Text Fields

**Website**: https://github.com (comment section)
**Steps**:

1. Open any issue
2. Click in comment field
3. Type with errors
4. Wait for suggestions
5. Click another field
6. **Expected**: Each field checked independently

### Step 4: Browser Compatibility Testing

```
Browser                    Status
├── Chrome (Latest)        [ ] Tested ✓
├── Edge (Latest)          [ ] Tested ✓
├── Brave (Latest)         [ ] Tested ✓
└── Chrome Beta            [ ] Tested ✓
```

### Step 5: Device Testing

```
Device Type               Status
├── Desktop Windows       [ ] Tested ✓
├── Desktop macOS         [ ] Tested ✓
├── Desktop Linux         [ ] Tested ✓
└── Chromebook           [ ] Tested ✓
```

## Performance Testing

### Memory Usage

**How to check**:

1. Open DevTools (F12)
2. Go to "Performance" tab
3. Record while typing in a text field
4. **Target**: <10MB memory increase

### API Response Time

**Expected timings**:

- Network latency: 200-500ms
- API processing: 500-1000ms
- Display overlay: 50-100ms
- **Total**: 1-2 seconds

### Console Errors

**What to look for**:

1. Open DevTools (F12)
2. Go to "Console" tab
3. While using the extension, check for:
   - Red error messages
   - CORS issues
   - Network failures
4. **Expected**: No errors (or only expected API warnings)

## Testing with Different Languages

### English Variants

```
Language     Code     Test Phrase
├── US       en-US    "Color is grate"
├── UK       en-GB    "Colour is grate"
└── AU       en-AU    "G'day mate, how's the weathre?"
```

### Browser Settings

To test different languages:

1. Chrome Settings → Language and input
2. Add language to "Languages"
3. Reload extension
4. Modify `content.js` language parameter

## Checklist Before Publishing

### Code Quality

- [ ] No console errors or warnings
- [ ] All functionality works as described
- [ ] Code is readable and documented
- [ ] No hardcoded API keys or secrets
- [ ] Follows Chrome Extension best practices

### UI/UX

- [ ] Overlay appears correctly positioned
- [ ] Text is readable (good contrast)
- [ ] Buttons are clickable
- [ ] Works in light and dark modes
- [ ] Mobile friendly (if applicable)

### Documentation

- [ ] README.md is complete and clear
- [ ] INSTALLATION.md has step-by-step instructions
- [ ] TECHNICAL.md explains architecture
- [ ] CONTRIBUTING.md welcomes contributors
- [ ] No outdated information

### Security

- [ ] No API keys in code
- [ ] No personal information collected
- [ ] No tracking or analytics
- [ ] Privacy policy mentioned
- [ ] Third-party dependencies noted

### GitHub

- [ ] Repository is public
- [ ] README visible and well-formatted
- [ ] Code is properly organized
- [ ] .gitignore excludes sensitive files
- [ ] LICENSE file included
- [ ] Issues and discussions enabled

## Publishing to Chrome Web Store

### Note: Current Plan

The current release is for **development/testing only**. For Chrome Web Store publication:

1. **Create Developer Account**
   - Visit chromewebstore.google.com
   - Create Google developer account
   - Pay one-time $5 developer fee

2. **Prepare Assets**
   - High-quality icons (128x128 minimum)
   - Screenshots (1280x800)
   - Promotional image (440x280)
   - Description (keep under 132 characters)

3. **Submit for Review**
   - Upload extension zip
   - Fill in store details
   - Add screenshots and description
   - Submit for review (1-3 days)

4. **Update Version**
   - Increment version in manifest.json
   - Update changelog
   - Re-submit for review

## Demo Video Checklist

### Setup

- [ ] Have 2-3 websites ready (Gmail, Twitter, Reddit)
- [ ] Have some test texts with intentional errors
- [ ] Ensure good lighting and clear audio
- [ ] Record at 1080p or higher

### Content to Show (3 minutes)

1. **Installation** (30 seconds)
   - Opening chrome://extensions
   - Loading unpacked extension
   - Extension appearing in toolbar

2. **Basic Demo** (1 minute)
   - Opening Gmail/Twitter
   - Typing text with errors
   - Grammar Guardian detecting errors
   - Clicking suggestions to fix

3. **Different Websites** (1 minute)
   - Show it works on Reddit
   - Show it works on Medium
   - Show multiple errors handling
   - Show dark mode support

4. **Features** (30 seconds)
   - Explain it's free
   - Explain LanguageTool API
   - Mention it works on all websites
   - Show popup settings

## Troubleshooting During Testing

| Issue                          | Solution                          |
| ------------------------------ | --------------------------------- |
| Extension won't load           | Check manifest.json syntax        |
| Suggestions don't appear       | Check Console for CORS errors     |
| API not responding             | Check internet connection         |
| Overlay appears in wrong place | Check CSS z-index and positioning |
| Text not updating              | Check applySuggestion() function  |
| Performance slow               | Check debounce timing (1500ms)    |

## Sign-Off Checklist

- [ ] All tests passed
- [ ] No critical bugs found
- [ ] Documentation complete
- [ ] Code reviewed
- [ ] Ready for GitHub publication
- [ ] Ready for demo video
- [ ] Ready for Chrome Web Store (future)

---

**Last Updated**: 2026-01-19 | **Version**: 1.0.0
