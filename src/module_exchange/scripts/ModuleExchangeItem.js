export default class ModuleExchangeItem {
  constructor() {
    this.uid = "";
    this.name = "";
    this.description = "";
    this.author = "";
    this.version = "";
    this.installed = false;
    this.installedVersion = "vx.x.x";
    this.enabled = false;
  }

  buildHTML() {
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

      if (this.enabled) {
        // Module is installed and enabled so option is to disable

        let disableButton = document.createElement("button");
        disableButton.classList.add("mebi-button");
        disableButton.classList.add("mebi-button-warning");
        disableButton.innerText = "Disable";
        moduleExchangeItem.appendChild(disableButton);
      } else {
        // Module is installed but disabled so option is to enable
        let enableButton = document.createElement("button");
        enableButton.classList.add("mebi-button");
        enableButton.classList.add("mebi-button-success");
        enableButton.innerText = "Enable";
        moduleExchangeItem.appendChild(enableButton);
      }

      let removeButton = document.createElement("button");
      removeButton.classList.add("mebi-button");
      removeButton.classList.add("mebi-button-danger");
      removeButton.innerText = "Remove";

      moduleExchangeItem.appendChild(removeButton);
    } else {
      // Module is not installed so option is to install
      let installButton = document.createElement("button");
      installButton.classList.add("mebi-button");
      installButton.classList.add("mebi-button-info");
      installButton.innerText = "Install";
      moduleExchangeItem.appendChild(installButton);
    }

    return moduleExchangeItem;
  }
}
