# Grammar Guardian 📝

A Chrome extension that detects grammar and spelling mistakes in real-time across websites, providing instant corrections and suggestions—similar to Grammarly.

## Features

✨ **Real-time Grammar Checking**

- Automatically detects grammar and spelling errors as you type
- Works on any text area or input field across the web

🎯 **Intelligent Suggestions**

- Provides multiple correction options for each error
- Click to apply corrections instantly
- Covers spelling, grammar, punctuation, and style issues

⚡ **Fast & Lightweight**

- Minimal performance impact
- Uses free LanguageTool API (no API keys needed)
- Works offline on static content

🎨 **Clean UI**

- Beautiful overlay with suggestions
- Dark mode support
- Accessible and easy to use

## How It Works

1. **Detection**: Content script monitors all text fields on web pages
2. **Analysis**: Text is sent to LanguageTool API for grammar checking (free, no registration)
3. **Feedback**: Errors are displayed with suggestions in an overlay below the text field
4. **Application**: Users can click suggestions to apply corrections

## Installation

### Option 1: Manual Installation (Development)

1. **Download the Extension**

   ```bash
   git clone https://github.com/YOUR-USERNAME/grammar-guardian.git
   cd grammar-guardian
   ```

2. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/` in your browser
   - Or: Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle "Developer mode" in the top-right corner

4. **Load Unpacked Extension**
   - Click "Load unpacked"
   - Navigate to the cloned `grammar-guardian` folder
   - Select the folder and click "Select Folder"

5. **Start Using**
   - The extension is now active!
   - Click on any text field on any website
   - Grammar issues will appear in a yellow overlay

### Option 2: Using npm (Optional)

```bash
# Install dependencies (if any are added in future)
npm install

# Lint code (optional)
npm run lint
```

## Usage

1. **Open any website** with text fields (Gmail, Twitter, Reddit, Medium, etc.)
2. **Click in a text field** to start typing
3. **Wait for analysis** (~1.5 seconds after you stop typing)
4. **See suggestions** in the yellow overlay below the field
5. **Click a suggestion** to apply the correction
6. Continue typing with real-time feedback

## Project Structure

```
grammar-guardian/
├── manifest.json          # Extension configuration (v3)
├── content.js            # Content script for text detection
├── background.js         # Background service worker
├── popup.html            # Extension popup UI
├── popup.js              # Popup script
├── styles.css            # Styles for error overlay
├── popup-styles.css      # Styles for popup
├── icons/                # Extension icons
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
└── README.md            # This file
```

## Technical Details

### Technologies Used

- **Manifest V3**: Latest Chrome extension standard
- **LanguageTool API**: Free, open-source grammar checking
- **Vanilla JavaScript**: No dependencies, lightweight
- **HTML5 & CSS3**: Clean, accessible UI

### Key Files

**manifest.json**

- Defines extension permissions and structure
- Specifies content script and background worker
- Manifest v3 compatible

**content.js**

- Listens for focus events on text fields
- Sends text to LanguageTool API
- Displays errors and handles user interactions
- Applies corrections when user clicks suggestions

**background.js**

- Service worker for extension lifecycle
- Ready for future enhancements

**popup.html/popup.js**

- Provides settings and information
- Allows users to control extension behavior

## API Used

### LanguageTool API (Free)

- **Endpoint**: `https://api.languagetoolplus.com/v2/check`
- **Method**: POST
- **Parameters**:
  - `text`: The text to check
  - `language`: Language code (default: en-US)
- **Rate Limit**: Generous for personal use
- **Cost**: Free ✓
- **No API Key Required**: Free tier available

No API keys or secrets are stored in the code.

## Known Limitations

- Requires internet connection for API calls (LanguageTool)
- Works only on text fields and text areas (not on contentEditable elements yet)
- First check may take 1-2 seconds while API responds
- Limited to English (en-US) by default - can be extended to other languages

## Future Enhancements

- [ ] Support for contentEditable elements
- [ ] Multiple language support
- [ ] Custom dictionary for domain-specific terms
- [ ] Offline mode with embedded rules
- [ ] Performance metrics and statistics
- [ ] Integration with more grammar APIs
- [ ] Keyboard shortcuts for quick corrections

## Troubleshooting

### Extension not showing suggestions?

- Make sure you're typing in a text field (textarea or input type="text")
- Check if Developer mode is enabled (orange text field)
- Reload the extension: Go to `chrome://extensions`, find Grammar Guardian, click the refresh icon

### Suggestions not appearing?

- Wait 1-2 seconds after typing
- Check your internet connection (LanguageTool API requires connection)
- Open DevTools (F12) and check Console for errors

### Extension won't load?

- Ensure you're using Chrome/Chromium-based browser
- Check that manifest.json is in the root folder
- Try reloading the extension from `chrome://extensions`

## Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Privacy & Security

✅ **No data collection** - All processing is done locally in your browser
✅ **No user tracking** - We don't track your activity
✅ **No ads** - Completely ad-free
⚠️ **Text is sent to LanguageTool API** - Required for grammar checking (check LanguageTool's privacy policy)

## Credits

- **LanguageTool**: Free open-source grammar checker (https://languagetool.org)
- Built with ❤️ for better writing

## Demo

Check out the demo video here: [Demo Link - Will be updated]

## Support

Found a bug or have a suggestion? Open an issue on GitHub!

---

**Happy Writing! 📝**

Made with ❤️ | Grammar Guardian v1.0.0
