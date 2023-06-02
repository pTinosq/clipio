const { clipboard } = require("electron");

export class ClickableFactory {
  constructor(clickable) {
    this.clickable = clickable;
  }

  buildOnclickMethod() {
    // Construct onclick method from clickableBuilder
    return () => {
      let clipboardContent = localStorage.getItem("clipboard");
      clipboardContent = this.clickable.run(clipboardContent);

      localStorage.setItem("clipboard", clipboardContent);
      clipboard.writeText(clipboardContent);

      // Close window
      window.close();
    };
  }

  buildHTML() {
    // Construct HTML data from clickableBuilder
    const module = document.createElement("div");
    module.className = "module";

    const moduleTitleContainer = document.createElement("div");
    moduleTitleContainer.className = "module-title";

    const moduleTitleContent = document.createElement("h1");
    console.log(this.clickable);
    moduleTitleContent.textContent = this.clickable.title;
    let onClickMethod = this.buildOnclickMethod();
    moduleTitleContent.addEventListener("click", onClickMethod);

    moduleTitleContainer.appendChild(moduleTitleContent);
    module.appendChild(moduleTitleContainer);

    return module;
  }
}
