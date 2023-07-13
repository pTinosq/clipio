const { ipcRenderer } = require("electron");
import { loadSavedToken, saveToken, launchModuleExchange } from "../../src/settings/scripts/settings";

jest.mock("electron", () => ({
  ipcRenderer: {
    sendSync: jest.fn(),
  },
}));

describe("loadSavedToken", () => {
  let tokenInput;
  let tokenSave;

  beforeEach(() => {
    document.body.innerHTML = `
      <input id="tokenInput" type="text" />
      <button id="tokenSave" class="btn-warn"></button>
    `;
    tokenInput = document.getElementById("tokenInput");
    tokenSave = document.getElementById("tokenSave");
  });

  it("should load token from storage and set it to tokenInput value", () => {
    const gitHubToken = "test-token";
    ipcRenderer.sendSync.mockReturnValue(gitHubToken);

    loadSavedToken();

    expect(ipcRenderer.sendSync).toHaveBeenCalledWith("get-github-token");
    expect(tokenInput.value).toBe(gitHubToken);
    expect(tokenSave.classList).toContain("btn-success");
    expect(tokenSave.classList).not.toContain("btn-warn");
  });

  it("should clear tokenInput value and set tokenSave class to btn-warn if token is not found in storage", () => {
    ipcRenderer.sendSync.mockReturnValue(null);

    loadSavedToken();

    expect(ipcRenderer.sendSync).toHaveBeenCalledWith("get-github-token");
    expect(tokenInput.value).toBe("");
    expect(tokenSave.classList).toContain("btn-warn");
    expect(tokenSave.classList).not.toContain("btn-success");
  });
});

describe("saveToken", () => {
  let tokenInput;
  let tokenSave;

  beforeEach(() => {
    document.body.innerHTML = `
      <input id="tokenInput" type="text" />
      <button id="tokenSave" class="btn-warn"></button>
    `;
    tokenInput = document.getElementById("tokenInput");
    tokenSave = document.getElementById("tokenSave");
  });

  it("should set tokenSave class to btn-warn if token is empty", () => {
    tokenInput.value = "";

    saveToken();

    expect(tokenSave.classList).toContain("btn-warn");
    expect(tokenSave.classList).not.toContain("btn-success");
  });

  it("should set tokenSave class to btn-success if token is not empty and successfully saved to storage", () => {
    const token = "test-token";
    ipcRenderer.sendSync.mockReturnValue(true);
    tokenInput.value = token;

    saveToken();

    expect(ipcRenderer.sendSync).toHaveBeenCalledWith(
      "set-github-token",
      token
    );
    expect(tokenSave.classList).toContain("btn-success");
    expect(tokenSave.classList).not.toContain("btn-warn");
  });

  it("should set tokenSave class to btn-warn if token is not empty but failed to save to storage", () => {
    const token = "test-token";
    ipcRenderer.sendSync.mockReturnValue(false);
    tokenInput.value = token;

    saveToken();

    expect(ipcRenderer.sendSync).toHaveBeenCalledWith(
      "set-github-token",
      token
    );
    expect(tokenSave.classList).toContain("btn-warn");
    expect(tokenSave.classList).not.toContain("btn-success");
  });
});