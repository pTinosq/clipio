import { disableModule } from "./module_buttons/disableButton.js";
import { enableModule } from "./module_buttons/enableButton.js";
import { viewSource } from "./module_buttons/viewSourceButton.js";

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
    moduleExchangeItem.id = this.uid;
    moduleExchangeItem.classList.add("module-exchange-body-item");

    // Colour mebi body accordingly
    if (this.installedVersion !== this.version && this.installed) {
      moduleExchangeItem.classList.add("mebi-body-yellow");
    } else if (this.installed && this.enabled) {
      moduleExchangeItem.classList.add("mebi-body-green");
    } else if (this.installed && !this.enabled) {
      moduleExchangeItem.classList.add("mebi-body-dull");
    }

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

    let moduleButtons = document.createElement("div");
    moduleButtons.classList.add("mebi-buttons");

    if (this.installed) {
      let removeButton = document.createElement("button");
      removeButton.classList.add("mebi-button");
      removeButton.classList.add("mebi-button-danger");
      removeButton.innerText = "Uninstall";

      moduleButtons.appendChild(removeButton);

      if (this.enabled) {
        // Module is installed and enabled so option is to disable

        let disableButton = document.createElement("button");
        disableButton.classList.add("mebi-button");
        disableButton.innerText = "Disable";

        disableButton.addEventListener("click", () => {
          disableModule(this.uid);
        });

        moduleButtons.appendChild(disableButton);
      } else {
        // Module is installed but disabled so option is to enable
        let enableButton = document.createElement("button");
        enableButton.classList.add("mebi-button");
        enableButton.innerText = "Enable";

        enableButton.addEventListener("click", () => {
          enableModule(this.uid);
        });

        moduleButtons.appendChild(enableButton);
      }
      // Module is installed so options are to remove or disable or update
      if (this.installedVersion !== this.version) {
        // Module is installed but needs to be updated
        let updateButton = document.createElement("button");
        updateButton.classList.add("mebi-button");
        updateButton.classList.add("mebi-button-warning");
        updateButton.innerText = "Update";

        moduleButtons.appendChild(updateButton);
      }
    } else {
      // Module is not installed so option is to install
      let installButton = document.createElement("button");
      installButton.classList.add("mebi-button");
      installButton.classList.add("mebi-button-success");
      installButton.innerText = "Install";

      let viewSourceButton = document.createElement("button");
      viewSourceButton.classList.add("mebi-button");
      viewSourceButton.innerText = "View Source";

      viewSourceButton.addEventListener("click", () => {
        viewSource(this.uid);
      });

      moduleButtons.appendChild(installButton);
      moduleButtons.appendChild(viewSourceButton);
    }

    moduleExchangeItem.appendChild(moduleButtons);
    return moduleExchangeItem;
  }
}
