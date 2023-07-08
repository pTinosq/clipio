import { disableModule } from "./module_buttons/disableButton.js";
import { enableModule } from "./module_buttons/enableButton.js";
import { viewSource } from "./module_buttons/viewSourceButton.js";
import { uninstallModule } from "./module_buttons/uninstallButton.js";
import { installModule } from "./module_buttons/installButton.js";
import TagGroup from "./tags/TagGroup.js";

export default class ModuleExchangeItem {
  constructor() {
    this.uid = "";
    this.name = "";
    this.description = "";
    this.author = "";
    this.version = "";
    this.tags = [];
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
    moduleName.classList.add("mebi-title");
    moduleName.innerText = this.name;
    moduleExchangeItem.appendChild(moduleName);

    // Verified modules get a special badge
    let moduleAuthor = document.createElement("p");
    moduleAuthor.classList.add("mebi-author");
    moduleAuthor.innerText = `@${this.author} • v${this.version}`;

    if (this.author == "ptinosq") {
      let verified = document.createElement("span");
      verified.classList.add("mebi-verified");
      verified.classList.add("tag");
      verified.innerText = "verified";
      moduleAuthor.appendChild(verified);
    }

    moduleExchangeItem.appendChild(moduleAuthor);

    let moduleTagGroup = document.createElement("div");
    moduleTagGroup.classList.add("mebi-tag-group");
    moduleTagGroup.id = `${this.uid}-tags`;
    moduleExchangeItem.dataset.tags = this.tags.map((tag) => tag.name);

    let tagGroup = new TagGroup(moduleTagGroup.id);

    this.tags.forEach((tag) => {
      tagGroup.addTag(tag);
    });

    moduleTagGroup.appendChild(tagGroup.buildHTML());

    moduleExchangeItem.appendChild(moduleTagGroup);

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

      removeButton.addEventListener("click", () => {
        uninstallModule(this.uid);
      });

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

        updateButton.addEventListener("click", () => {
          // remove module with reload false flag
          uninstallModule(this.uid, false);

          // install module
          installModule(this.uid);
        });
        moduleButtons.appendChild(updateButton);
      }
    } else {
      // Module is not installed so option is to install
      let installButton = document.createElement("button");
      installButton.classList.add("mebi-button");
      installButton.classList.add("mebi-button-success");
      installButton.innerText = "Install";

      installButton.addEventListener("click", () => {
        installModule(this.uid);
      });

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
