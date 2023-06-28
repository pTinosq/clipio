export default class ModuleExchangeItem {
  constructor() {
    this.uid = "";
    this.name = "";
    this.description = "";
    this.author = "";
    this.version = "";
    this.installed = false;
    this.installedVersion = "vx.x.x";
  }

  buildHTML() {
    /*
    <div class="module-exchange-body-item">
          <h2>Google Translate Module</h2>
          <p class="mebi-author">@ptinosq • v0.2.4</p>
          <p class="mebi-description">
            This module allows you to translate text from one language to
            another using Google Translate.
          </p>
          <button class="mebi-button mebi-button-info">Install</button>
        </div>
         */

    let moduleExchangeItem = document.createElement("div");
    moduleExchangeItem.classList.add("module-exchange-body-item");

    let moduleName = document.createElement("h2");
    moduleName.innerText = this.name;
    moduleExchangeItem.appendChild(moduleName);

    let moduleAuthor = document.createElement("p");
    moduleAuthor.classList.add("mebi-author");
    moduleAuthor.innerText = `@${this.author} • v${this.version}`;
    moduleExchangeItem.appendChild(moduleAuthor);

    let moduleDescription = document.createElement("p");
    moduleDescription.classList.add("mebi-description");

    moduleDescription.innerText = this.description;
    moduleExchangeItem.appendChild(moduleDescription);

    if (this.installed) {
      // Module is installed so options are to remove or disable or update
      if (this.installedVersion !== this.version) {
        // Module is installed but needs to be updated
        let updateButton = document.createElement("button");
        updateButton.classList.add("mebi-button");
        updateButton.classList.add("mebi-button-info");
        updateButton.innerText = "Update";
        moduleExchangeItem.appendChild(updateButton);
      }

      let disableButton = document.createElement("button");
      disableButton.classList.add("mebi-button");
      disableButton.classList.add("mebi-button-warning");
      disableButton.innerText = "Disable";

      let removeButton = document.createElement("button");
      removeButton.classList.add("mebi-button");
      removeButton.classList.add("mebi-button-danger");
      removeButton.innerText = "Remove";

      moduleExchangeItem.appendChild(disableButton);
      moduleExchangeItem.appendChild(removeButton);
    } else {
      // Module is not installed so option is to install
      let installButton = document.createElement("button");
      installButton.classList.add("mebi-button");
      installButton.classList.add("mebi-button-info");
      installButton.innerText = "Install";
      moduleExchangeItem.appendChild(installButton);
    }
    console.log(moduleExchangeItem);

    return moduleExchangeItem;
  }
}
