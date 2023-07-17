const { ipcRenderer, shell } = require("electron");

function loadSavedToken() {
  // Load token from storage
  let gitHubToken = ipcRenderer.sendSync("get-github-token");
  if (gitHubToken) {
    tokenInput.value = gitHubToken;
    tokenSave.classList.remove("btn-warn");
    tokenSave.classList.add("btn-success");
  } else {
    tokenInput.value = "";
    tokenSave.classList.remove("btn-success");
    tokenSave.classList.add("btn-warn");
  }
}

function saveToken() {
  const token = tokenInput.value;
  if (!token) {
    tokenSave.classList.remove("btn-success");
    tokenSave.classList.add("btn-warn");
    return;
  }

  if (ipcRenderer.sendSync("set-github-token", token)) {
    tokenSave.classList.remove("btn-warn");
    tokenSave.classList.add("btn-success");
  } else {
    tokenSave.classList.remove("btn-success");
    tokenSave.classList.add("btn-warn");
  }
}

function launchModuleExchange() {
  window.location.href = "../module_exchange/moduleExchange.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const tokenInput = document.getElementById("tokenInput");
  const tokenSave = document.getElementById("tokenSave");
  const showPATTutorial = document.getElementById("showPATTutorial");

  const launchModuleExchangeElement = document.getElementById(
    "launchModuleExchange"
  );

  loadSavedToken();

  tokenInput.addEventListener("input", function () {
    tokenSave.classList.remove("btn-success");
    tokenSave.classList.add("btn-warn");
  });

  tokenSave.addEventListener("click", saveToken);

  showPATTutorial.addEventListener("click", function () {
    shell.openExternal(
      "https://github.com/pTinosq/clipio/tree/main/content/HOW_TO_GET_GITHUB_PAT.md"
    );
  });

  launchModuleExchangeElement.addEventListener("click", launchModuleExchange);
});

module.exports = {
  loadSavedToken,
  saveToken,
};
