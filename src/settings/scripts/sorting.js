const { ipcRenderer } = require("electron");
import { SortingPanel } from "./SortingPanel.js";

function getModules() {
  const modules = [];
  const localModules = ipcRenderer.sendSync("get-local-modules");

  console.log(localModules);
  Object.keys(localModules).forEach((moduleUID) => {
    let moduleManifest = ipcRenderer.sendSync("get-module-manifest", moduleUID);
    /*
{
    "example-test-module": {
        "enabled": true
    }
}*/

    // Add UID to the module manifest
    moduleManifest.uid = moduleUID;
    moduleManifest.enabled = localModules[moduleUID].enabled;
    modules.push(moduleManifest);
  });

  return modules;
}

function setModules(modules) {
  const localModules = {};

  modules.forEach((module) => {
    localModules[module.uid] = {
      enabled: module.enabled,
    };
  });

  ipcRenderer.send("set-local-modules", localModules);
}

export function moveModuleUp(moduleUID) {
  let modules = getModules();

  let moduleIndex = modules.findIndex((module) => module.uid === moduleUID);

  if (moduleIndex > 0) {
    let module = modules[moduleIndex];
    modules.splice(moduleIndex, 1);
    modules.splice(moduleIndex - 1, 0, module);
  }

  setModules(modules);
}

export function moveModuleDown(moduleUID) {
  let modules = getModules();

  let moduleIndex = modules.findIndex((module) => module.uid === moduleUID);

  if (moduleIndex < modules.length - 1) {
    let module = modules[moduleIndex];
    modules.splice(moduleIndex, 1);
    modules.splice(moduleIndex + 1, 0, module);
  }

  setModules(modules);
}

document.addEventListener("DOMContentLoaded", function () {
  const modules = getModules();

  const panel = new SortingPanel("module-sorting-panel");
  panel.drawModules(modules);
});
