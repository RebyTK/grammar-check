# GitHub Setup Guide - Grammar Guardian

## 📍 Step-by-Step GitHub Deployment

### Prerequisites

- GitHub account (create one at https://github.com if you don't have)
- Git installed on your machine
- The Grammar Guardian code (already in `c:\Users\Admin\Desktop\Assignment3`)

---

## Phase 1: Local Git Setup (5 minutes)

### Step 1: Open PowerShell in Project Folder

```powershell
# Navigate to project
cd "c:\Users\Admin\Desktop\Assignment3"

# Verify you're in the right location
dir  # Should see all the extension files
```

### Step 2: Initialize Git Repository

```powershell
# Initialize git
git init

# Verify it worked
git status  # Should show untracked files
```

### Step 3: Configure Git (First time only)

```powershell
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"
```

### Step 4: Create First Commit

```powershell
# Add all files
git add .

# Create commit
git commit -m "Initial commit: Grammar Guardian Chrome extension"

# Verify commit was created
git log
```

### Step 5: Rename Branch to Main (if needed)

```powershell
# Check current branch name
git branch

# If it's "master", rename to "main"
git branch -M main
```

---

## Phase 2: GitHub Repository Setup (5 minutes)

### Step 1: Create GitHub Repository

Go to: **https://github.com/new**

Fill in these details:

```
Repository name:        grammar-guardian
Description:            Chrome extension for detecting grammar and spelling
                        mistakes with suggestions (like Grammarly)
Public / Private:       ◉ Public  ○ Private

☐ Initialize with README (UNCHECK - we have our own)
☐ Add .gitignore (UNCHECK - we have our own)
☐ Choose a license (UNCHECK - we have MIT license)

[Create repository]
```

### Step 2: Copy Repository URL

After creation, you'll see a page with:

```
https://github.com/YOUR-USERNAME/grammar-guardian.git
```

Copy this URL (the green "Code" button shows it)

### Step 3: Connect Local to Remote

```powershell
# Add remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/grammar-guardian.git

# Verify it worked
git remote -v  # Should show origin URL
```

### Step 4: Push Code to GitHub

```powershell
# Push to main branch
git push -u origin main

# Verify it worked
git log  # Should show your commits
```

**It might ask for credentials:**

- For personal access token authentication (recommended):
  1. Go to https://github.com/settings/tokens
  2. Generate new token
  3. Copy the token
  4. Paste when prompted

---

## Phase 3: Verify on GitHub (2 minutes)

### Step 1: Check Repository Online

Visit: **https://github.com/YOUR-USERNAME/grammar-guardian**

You should see:

- ✅ All project files listed
- ✅ README.md displayed nicely
- ✅ Folder structure visible
- ✅ "1 commit" or more in commit history

### Step 2: Verify File Structure

Your GitHub should show:

```
📁 grammar-guardian
├── manifest.json
├── content.js
├── background.js
├── popup.html
├── popup.js
├── styles.css
├── popup-styles.css
├── icons/
├── README.md              ← Shows by default
├── QUICK_REFERENCE.md
├── SETUP.md
├── INSTALLATION.md
├── TECHNICAL.md
├── TESTING.md
├── CONTRIBUTING.md
├── PROJECT_SUMMARY.md
├── LICENSE
├── package.json
└── .gitignore
```

### Step 3: Verify README Displays

- The README.md should automatically display on your repository page
- It should be nicely formatted with all sections visible
- Links and code blocks should render properly

---

## Phase 4: Testing Your GitHub (5 minutes)

### Test 1: Clone Your Own Repository

```powershell
# Create a test folder
mkdir c:\test-clone
cd c:\test-clone

# Clone your repository
git clone https://github.com/YOUR-USERNAME/grammar-guardian.git

# Verify files are there
cd grammar-guardian
dir  # Should see all files

# Check Git history
git log  # Should show your commit
```

### Test 2: Verify Manifest

```powershell
# View manifest content
Get-Content .\manifest.json

# Should see "manifest_version": 3
# and other extension config
```

### Test 3: Check File Counts

```powershell
# Count total files
(Get-ChildItem -Recurse | Measure-Object).Count

# Should be around 20+ files (including icons)
```

---

## Phase 5: Make Your Repository Perfect (Optional)

### Add a Stars Badge

Add this to your README:

```markdown
[![GitHub stars](https://img.shields.io/github/stars/YOUR-USERNAME/grammar-guardian?style=social)](https://github.com/YOUR-USERNAME/grammar-guardian)
```

### Enable Issues

1. Go to repository settings
2. Scroll to "Features"
3. Ensure "Issues" is checked

### Enable Discussions

1. Go to repository settings
2. Scroll to "Features"
3. Check "Discussions"

### Add Topics

1. Go to "About" (right side)
2. Click the gear icon
3. Add topics:
   - chrome-extension
   - grammar
   - spelling-checker
   - languagetool
   - javascript

---

## Phase 6: Prepare for Demo Video

Your GitHub repo is now ready! Now you need to:

### Recording Demo (see TESTING.md for details):

1. Load extension locally
2. Test on different websites
3. Record 2-3 minute video
4. Upload to YouTube or GitHub Releases

### Add Demo Link to README:

After recording, update your README:

```markdown
## Demo Video

Watch the 2-3 minute demo here: [Link to YouTube or GitHub Releases]
```

---

## Troubleshooting GitHub Push

| Error                                                      | Solution                                       |
| ---------------------------------------------------------- | ---------------------------------------------- |
| "fatal: not a git repository"                              | Run `git init` first                           |
| "fatal: The current branch main has no upstream branch"    | Use `git push -u origin main` (with -u flag)   |
| "fatal: 'origin' does not appear to be a 'git' repository" | Run `git remote add origin https://...`        |
| "remote: Repository not found"                             | Check your GitHub username is correct          |
| "fatal: could not read Username"                           | GitHub now uses tokens, see auth section above |
| Files not showing on GitHub                                | Verify `git push` completed successfully       |

---

## Quick Commands Reference

```powershell
# Navigate to folder
cd "c:\Users\Admin\Desktop\Assignment3"

# Initialize git (first time)
git init

# Check status
git status

# Add files
git add .

# Commit
git commit -m "Your message"

# Add remote (first time, replace URL)
git remote add origin https://github.com/YOU/grammar-guardian.git

# Push to GitHub (first time)
git push -u origin main

# Push later commits (subsequent times)
git push

# Pull latest from GitHub
git pull

# Check commit history
git log
```

---

## GitHub Links for Your Assignment

After setup, you'll have these links ready:

```
GitHub Repository:    https://github.com/YOUR-USERNAME/grammar-guardian
GitHub Code Files:    https://github.com/YOUR-USERNAME/grammar-guardian/tree/main
README:               https://github.com/YOUR-USERNAME/grammar-guardian#readme
```

---

## Final Checklist

- [ ] Git initialized locally
- [ ] GitHub account created
- [ ] Repository created on GitHub (PUBLIC)
- [ ] Remote origin added locally
- [ ] Code pushed to GitHub
- [ ] README displays on GitHub page
- [ ] All files visible on GitHub
- [ ] File structure matches documentation
- [ ] No sensitive info in code
- [ ] Ready for demo video

---

## 🎉 You're Done with GitHub Setup!

Next steps:

1. ✅ Test extension locally (use SETUP.md)
2. ✅ Record demo video (use TESTING.md)
3. ✅ Submit GitHub repo link + demo video

---

**Version**: 1.0.0 | **Status**: Ready for Implementation ✅
