const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", function () {
  const tokenInput = document.getElementById("tokenInput");
  const tokenSave = document.getElementById("tokenSave");

  const launchModuleExchange = document.getElementById("launchModuleExchange");

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

  tokenInput.addEventListener("input", function () {
    tokenSave.classList.remove("btn-success");
    tokenSave.classList.add("btn-warn");
  });

  tokenSave.addEventListener("click", function () {
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
  });

  launchModuleExchange.addEventListener("click", function () {
    window.location.href = "../module_exchange/moduleExchange.html";
  });
});
