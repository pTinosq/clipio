<br>

<p align="center">
  <img alt="Clipdit logo" width="400" src="https://raw.githubusercontent.com/pTinosq/clipdit/main/content/clipdit-banner.png" />
</p>

# Rapid clipboard management

![GitHub top language](https://img.shields.io/github/languages/top/ptinosq/clipdit)
![GitHub repo size](https://img.shields.io/github/repo-size/ptinosq/clipdit)
![GitHub all releases](https://img.shields.io/github/downloads/ptinosq/clipdit/total)
![GitHub](https://img.shields.io/github/license/ptinosq/clipdit)
![GitHub issues](https://img.shields.io/github/issues/ptinosq/clipdit)
![GitHub last commit](https://img.shields.io/github/last-commit/ptinosq/clipdit)

Clipdit is a fast and easy way to manage your clipboard. The idea came about when I was working on a project and needed to manually edit the names of certain files to include underscores instead of spaces. I quickly realized that a tool capable of converting spaces to underscores would also be capable of delivering plenty of other useful features.

## Features

- Unintrusive interface
- Auto URL detection
- Clipboard length counter
- Clipboard spaces counter
- Character/text replacement
- Spaces to underscores conversion
- Lowercase/uppercase conversion
- Base64 encoding/decoding
- Trailing spaces removal
- Text formatting removal
- Intuitive developer window

## How it works

Clipdit listens to clipboard activity and creates a popup whenever the clipboard changes. There are multiple popups for when users copy different types of data. For example, copying a URL will show a popup which allows you to immediately open the URL in a browser.

When a user clicks on the clipdit edit popup, it opens a small panel with multiple options. Once an option is clicked the panel immediately closes and the clipboard is updated with the edited version.

---

## Development

<br>

### **Prerequisites**

- NodeJS v15+
- ElectronJS v17+

<br>

### **Getting Started**

```bash
npm install
npm start
```

<br>

### **Testing**

```bash
npm test
```

<br>

### **Building**

```bash
npm run app:dist
```

---

<p align="center">
  Made by <a target="_blank" href="https://www.tinosps.com/">Tinos</a> ❤️
</p>
