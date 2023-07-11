const { clipboard } = require("electron");

export class InteractorFactory {
  buildOnclickMethod(interactor) {
    // Construct onclick method from clickableBuilder
    return (event) => {
      let clipboardContent = clipboard.readText();

      clipboardContent = interactor.run(clipboardContent);

      this.clipboard.writeText(clipboardContent);

      if (!event.shiftKey) {
        window.close();
      }
    };
  }

  buildInteractor(interactor) {
    interactor.onClick = this.buildOnclickMethod(interactor);
    return interactor;
  }

  buildHTML(interactor) {
    // Construct HTML data from built interactor
    const module = document.createElement("div");
    module.className = "module";

    // Title container
    const moduleTitleContainer = document.createElement("div");
    moduleTitleContainer.className = "module-title";

    for (let i = 0; i < interactor.titleElements.length; i++) {
      let titleElement = interactor.titleElements[i].element;
      let isClickable = interactor.titleElements[i].isClickable;
      if (isClickable) {
        titleElement.addEventListener("click", interactor.onClick);
      }

      moduleTitleContainer.appendChild(titleElement);
    }

    module.appendChild(moduleTitleContainer);

    // Content container
    const moduleContentContainer = document.createElement("div");
    moduleContentContainer.className = "module-content";

    for (let i = 0; i < interactor.contentElements.length; i++) {
      let contentElement = interactor.contentElements[i].element;
      moduleContentContainer.appendChild(contentElement);
    }

    module.appendChild(moduleContentContainer);

    return module;
  }
}
