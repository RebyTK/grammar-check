# Contributing to Grammar Guardian

Thank you for your interest in contributing! Here's how you can help make Grammar Guardian better.

## Ways to Contribute

### 1. Report Bugs

Found a bug? Please create an issue with:

- Browser and OS version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if helpful

### 2. Suggest Features

Ideas for improvements? Open an issue with the "enhancement" label:

- Description of the feature
- Use case / why it's useful
- Potential implementation approach

### 3. Submit Code Changes

Want to code? Here's the process:

#### Setup Development Environment

```bash
git clone https://github.com/YOUR-USERNAME/grammar-guardian.git
cd grammar-guardian
```

#### Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

#### Make Your Changes

- Edit relevant files
- Follow existing code style
- Test thoroughly
- Update README if needed

#### Commit & Push

```bash
git add .
git commit -m "Brief description of changes"
git push origin feature/your-feature-name
```

#### Create a Pull Request

- Go to GitHub
- Click "Compare & pull request"
- Describe your changes
- Wait for review and feedback

## Code Style Guide

### JavaScript

- Use vanilla JavaScript (no frameworks)
- Use const/let instead of var
- Use arrow functions where appropriate
- Add comments for complex logic

### Example

```javascript
// Good: clear, documented, uses modern syntax
const checkGrammar = async (text) => {
  // Check if text is valid
  if (text.trim().length < 3) return;

  try {
    const response = await fetch(API_URL, {
      /* ... */
    });
    const data = await response.json();
    return data.matches;
  } catch (error) {
    console.error("API error:", error);
  }
};
```

### CSS

- Use logical property names
- Include vendor prefixes where needed
- Support dark mode with `@media (prefers-color-scheme: dark)`
- Group related rules

## Testing Before Submit

1. **Manual Testing**
   - Load extension locally
   - Test on various websites (Gmail, Twitter, Reddit, etc.)
   - Test with different text lengths
   - Test error scenarios

2. **Browser Compatibility**
   - Test on Chrome
   - Test on Chromium-based browsers (Edge, Brave, etc.)
   - Note any browser-specific issues

3. **Code Quality**
   - Check for console errors (F12)
   - Check for memory leaks
   - Verify performance

## Areas We Need Help

- [ ] Support for contentEditable elements
- [ ] Multiple language support
- [ ] Custom dictionary feature
- [ ] Performance optimizations
- [ ] Additional grammar/style checkers
- [ ] Better error handling
- [ ] Unit tests
- [ ] More comprehensive documentation

## Questions?

- Check existing issues for similar questions
- Comment on related issues
- Open a new "question" issue if needed

## Code of Conduct

- Be respectful to all contributors
- Provide constructive feedback
- Help others learn and grow
- No harassment or discrimination

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping improve Grammar Guardian! 🙏**
