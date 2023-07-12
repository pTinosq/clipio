import { moveModuleUp, moveModuleDown } from "./sorting.js";
export class SortingPanel {
  constructor(id) {
    this.id = id;
    this.panel = document.getElementById(id);
    this.modules = [];
  }

  drawModules(modules) {
    this.removeModuleElements();
    this.modules = modules;
    this.modules.forEach((module) => {
      this.panel.appendChild(this.createModuleElement(module));
    });
  }

  removeModuleElements() {
    this.panel.innerHTML = "";
  }

  createModuleElement(module) {
    const moduleElement = document.createElement("div");
    moduleElement.classList.add("sorting-panel-item");
    moduleElement.id = `${module.uid}`;
    if (!module.enabled) {
      moduleElement.classList.add("disabled");
    }

    const moduleName = document.createElement("p");
    moduleName.innerHTML = `<b>${module.name}</b> - @${module.author} <span>(v${module.version})</span>`;
    moduleElement.appendChild(moduleName);

    if (!module.enabled){
      const moduleDisabled = document.createElement("p");
      moduleDisabled.innerHTML = `DISABLED`;
      moduleElement.appendChild(moduleDisabled);
    }


    const moduleButtons = document.createElement("div");
    moduleButtons.classList.add("sorting-panel-item-buttons");
    moduleElement.appendChild(moduleButtons);

    const upButton = document.createElement("button");
    upButton.classList.add("btn-mini", "btn-info");
    upButton.innerHTML = "Up";
    upButton.addEventListener("click", () => {
      moveModuleUp(module.uid);
      this.moveModuleUp(module.uid);
    });

    const downButton = document.createElement("button");
    downButton.classList.add("btn-mini", "btn-info");
    downButton.innerHTML = "Down";
    downButton.addEventListener("click", () => {
      moveModuleDown(module.uid);
      this.moveModuleDown(module.uid);
    });

    moduleButtons.appendChild(upButton);
    moduleButtons.appendChild(downButton);

    return moduleElement;
  }

  moveModuleUp(moduleUID) {
    const moduleElement = document.getElementById(moduleUID);
    const previousElement = moduleElement.previousElementSibling;

    if (previousElement) {
      moduleElement.parentNode.insertBefore(moduleElement, previousElement);
    }
  }

  moveModuleDown(moduleUID) {
    const moduleElement = document.getElementById(moduleUID);
    const nextElement = moduleElement.nextElementSibling;

    if (nextElement) {
      moduleElement.parentNode.insertBefore(nextElement, moduleElement);
    }
  }
}
