
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

## Module Exchange

In Clipio v2.0.0, we introduced the Module Exchange, an online repository that lets you download and use modules developed by the community. The Module Exchange is a centralized hub where Clipio users can discover, share, and collaborate on modules that enhance Clipio's functionality. By leveraging the collective expertise and creativity of the community, the Module Exchange empowers users to extend Clipio's capabilities beyond its core features.

Visit the [Clipio Module Exchange](https://github.com/pTinosq/clipio-modules) to explore the wide range of modules contributed by the community. You can download and install modules of your choice to tailor Clipio according to your specific needs. Contribute your own modules to share your innovative ideas and solutions with other Clipio users.

## Features

- Unintrusive interface
- Auto URL detection
- Clipboard length and spaces counter
- Intuitive developer window
- [Online module exchange](https://github.com/pTinosq/clipio-modules)

## How it works

Clipio listens to clipboard activity and creates a popup whenever the clipboard changes. There are unique popups for when users copy different types of data (URLs, folder paths, text).

When you click on the clipio edit popup, it opens a small panel with multiple options. You are able to select different options to edit the text you just copied and by holding shift you are able to layer edits without the popup closing.

---

## Development

### **Prerequisites**

- NodeJS v15+
- Electron v25+

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
