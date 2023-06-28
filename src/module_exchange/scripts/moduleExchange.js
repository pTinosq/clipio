const { ipcRenderer } = require("electron");
const { Octokit } = require("octokit");
import ModuleExchangeItem from "./ModuleExchangeItem.js";

async function getExchangeData(token) {
  // Octokit.js
  // https://github.com/octokit/core.js#readme

  const octokit = new Octokit({
    auth: token,
  });

  return await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    owner: "ptinosq",
    repo: "clipio-modules",
    path: "modules",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

async function getModuleManifestData(token, module) {
  const octokit = new Octokit({
    auth: token,
  });

  return await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    owner: "ptinosq",
    repo: "clipio-modules",
    path: "modules/" + module + "/module-manifest.json",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Load token from storage
  let gitHubToken = ipcRenderer.sendSync("get-github-token");

  if (gitHubToken) {
    // Fetch exchange data
    getExchangeData(gitHubToken)
      .then((data) => {
        let modules = [];
        if (data.status == 200) {
          const moduleNames = data.data.map((module) => module.name);

          // Create an array of promises for fetching module manifest data
          const promises = moduleNames.map((module) =>
            getModuleManifestData(gitHubToken, module)
          );

          // Use Promise.all to wait for all the promises to resolve
          return Promise.all(promises)
            .then((responses) => {
              for (let i = 0; i < responses.length; i++) {
                let data = responses[i];
                if (data.status == 200) {
                  let moduleManifestData = {};
                  let encodedData = data.data.content;
                  let decodedData = atob(encodedData);

                  moduleManifestData = JSON.parse(decodedData);
                  moduleManifestData.uid = moduleNames[i];

                  modules.push(moduleManifestData);
                }
              }

              return modules;
            })
            .catch((error) => {
              console.error("Error fetching module manifest data:", error);
              return modules; // Return empty modules array if there was an error
            });
        } else {
          // TODO: Show a message to the user that the exchange is not available
          return modules; // Return empty modules array if the exchange is not available
        }
      })
      .then((modules) => {
        const localModules = ipcRenderer.sendSync("get-local-modules");
        /*
        {
          'uid': {'enable': true},
        }
        */
        const localModulesUIDs = Object.keys(localModules);

        for (let i = 0; i < modules.length; i++) {
          let moduleExchangeItem = new ModuleExchangeItem();
          let module = modules[i];
          // There are the only details we need to show in the exchange
          moduleExchangeItem.uid = module.uid;
          moduleExchangeItem.name = module.name;
          moduleExchangeItem.description = module.description;
          moduleExchangeItem.author = module.author;
          moduleExchangeItem.version = module.version;
          moduleExchangeItem.installed = localModulesUIDs.includes(module.uid);

          if (moduleExchangeItem.installed) {
            moduleExchangeItem.enabled = localModules[module.uid].enabled;
            if (moduleExchangeItem.installed) {
              let localModuleManifest = ipcRenderer.sendSync(
                "get-module-manifest",
                module.uid
              );
              moduleExchangeItem.installedVersion = localModuleManifest.version;
            }
          }

          let moduleHTML = moduleExchangeItem.buildHTML();
          document
            .getElementById("module-exchange-body")
            .appendChild(moduleHTML);
        }
      });
  } else {
    // TODO: Show a message to the user that they need to set a token
  }
});
