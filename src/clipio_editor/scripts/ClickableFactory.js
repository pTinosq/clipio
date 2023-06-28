const { clipboard } = require("electron");

export class ClickableFactory {
  buildOnclickMethod(clickable) {
    // Construct onclick method from clickableBuilder
    return (event) => {
      let clipboardContent = clipboard.readText();

      clipboardContent = clickable.run(clipboardContent);

      clipboard.writeText(clipboardContent);

      // When shift-clicked, don't close the window
      if (!event.shiftKey) {
        window.close();
      }
    };
  }

  buildClickable(clickable) {
    clickable.onClick = this.buildOnclickMethod(clickable);
    return clickable;
  }

  buildHTML(clickable) {
    // Construct HTML data from clickableBuilder
    const module = document.createElement("div");
    module.className = "module";

    const moduleTitleContainer = document.createElement("div");
    moduleTitleContainer.className = "module-title";

    const moduleTitleContent = document.createElement("h1");

    console.log(clickable);
    moduleTitleContent.textContent = clickable.title;
    moduleTitleContent.addEventListener("click", clickable.onClick);

    moduleTitleContainer.appendChild(moduleTitleContent);
    module.appendChild(moduleTitleContainer);

    return module;
  }
}
