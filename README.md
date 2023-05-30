
# Clipio

![Clipio banner](https://raw.githubusercontent.com/pTinosq/clipio/main/content/clipio-banner.png)

# Rapid clipboard management

![GitHub top language](https://img.shields.io/github/languages/top/ptinosq/clipio)
![GitHub repo size](https://img.shields.io/github/repo-size/ptinosq/clipio)
![GitHub all releases](https://img.shields.io/github/downloads/ptinosq/clipio/total)
![GitHub](https://img.shields.io/github/license/ptinosq/clipio)
![GitHub issues](https://img.shields.io/github/issues/ptinosq/clipio)
![GitHub last commit](https://img.shields.io/github/last-commit/ptinosq/clipio)

Clipio is a fast and easy way to manage your clipboard. The idea came about when I was working on a project and needed to manually edit the names of certain files to include underscores instead of spaces. I quickly realized that a tool capable of converting spaces to underscores would also be capable of delivering plenty of other useful features.

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

Clipio listens to clipboard activity and creates a popup whenever the clipboard changes. There are multiple popups for when users copy different types of data. For example, copying a URL will show a popup which allows you to immediately open the URL in a browser.

When a user clicks on the clipio edit popup, it opens a small panel with multiple options. Once an option is clicked the panel immediately closes and the clipboard is updated with the edited version.

---

## Development

### **Prerequisites**

- NodeJS v15+
- ElectronJS v17+

### **Getting Started**

```bash
npm install
npm start
```

### **Testing**

```bash
npm test
```


### **Building**

```bash
npm run app:dist
```

---

Made with ❤️ by [Tinos](https://github.com/pTinosq)
