const { ipcRenderer } = require("electron");
const { Octokit } = require("octokit");
const path = require("path");
const fs = require("fs");

async function getModuleFolderContents(token, uid) {
  const octokit = new Octokit({
    auth: token,
  });

  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "ptinosq",
      repo: "clipio-modules",
      path: "modules/" + uid,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  return data;
}

async function downloadModuleFolder(token, uid, destinationPath) {
  const octokit = new Octokit({
    auth: token,
  });

  const folderContents = await getModuleFolderContents(token, uid);

  for (const item of folderContents) {
    let itemPath = item.path;
    itemPath = itemPath.split("/").slice(2).join("/"); // Remove "modules/{uid}/" from path

    const itemDestinationPath = path.join(destinationPath, itemPath);

    if (item.type === "file") {
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: "ptinosq",
          repo: "clipio-modules",
          path: "modules/" + uid + "/" + itemPath,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      const fileContent = Buffer.from(data.content, "base64").toString();
      fs.writeFileSync(itemDestinationPath, fileContent);
    } else if (item.type === "dir") {
      fs.mkdirSync(itemDestinationPath, { recursive: true });

      await downloadModuleFolder(
        token,
        uid + "/" + item.name,
        itemDestinationPath
      );
    }
  }
}

async function runInstallation(token, uid, destinationPath) {
  // return promise

  // fs.mkdirSync(destinationPath, { recursive: true });
  // downloadModuleFolder(token, uid, destinationPath);

  return new Promise((resolve, reject) => {
    fs.mkdir(destinationPath, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        downloadModuleFolder(token, uid, destinationPath).then(() => {
          resolve();
        });
      }
    });
  });
}

export function installModule(uid) {
  const localModules = ipcRenderer.sendSync("get-local-modules");
  localModules[uid] = {
    enabled: true,
  };

  const token = ipcRenderer.sendSync("get-github-token");

  const destinationPath = ipcRenderer.sendSync("get-app-path", uid);

  runInstallation(token, uid, destinationPath).then(() => {
    ipcRenderer.send("set-local-modules", localModules);
    window.location.reload();
  });
}
