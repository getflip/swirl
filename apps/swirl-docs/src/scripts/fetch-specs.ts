import fetch from "node-fetch";
import fs from "fs";
import { env } from "@swirl/lib/env/server.config";
import path from "path";

type RepositoryTreeItem = {
  id: string;
  name: string;
  type: string;
  path: string;
  mode: string;
};

const GITLAB_ENDPOINT = "https://gitlab.com/api/v4/projects";
const headers = {
  "PRIVATE-TOKEN": env.GITLAB_ACCESS_TOKEN,
};
const refBranch = "15252-api-spec-automation--legcay-api-implementation";
const globalSpecs = ["shared.yml", "problem.yml"];

function getDeploymentStage() {
  if (!env.DEPLOYMENT_STAGE) {
    throw new Error("DEPLOYMENT_ENVIRONMENT is not set");
  }

  if (env.DEPLOYMENT_STAGE === "staging") {
    return "development";
  }

  return "published";
}

const createSpecGitlabEndpoint = (spec: RepositoryTreeItem) => {
  return `${GITLAB_ENDPOINT}/${
    env.GITLAB_FLIP_REPO_ID
  }/repository/files/${encodeURIComponent(spec.path)}?ref=${refBranch}`;
};

const createDocGitlabEndpoint = (doc: string) => {
  return `${GITLAB_ENDPOINT}/${
    env.GITLAB_FLIP_REPO_ID
  }/repository/files/${encodeURIComponent(doc)}?ref=${refBranch}`;
};

async function fetchDocData(doc: string, root?: string) {
  console.log("Fetching doc data...");

  try {
    const response = await fetch(createDocGitlabEndpoint(doc), {
      headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    const docData = Buffer.from(json.content, "base64").toString("utf8");

    let docPath = "./src/documents/api";
    if (root) {
      fs.mkdirSync(path.join(docPath, root), { recursive: true });
      const docName = doc.split("/").pop()?.split(".")[0];
      docPath = `${docPath}/${root}/${docName}.mdx`;
    } else {
      const docName = doc.split("/").pop()?.split(".")[0];
      docPath = `${docPath}/${docName}.mdx`;
    }

    fs.writeFileSync(docPath, docData, "utf8");
    return docPath;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchSpecData(spec: RepositoryTreeItem) {
  console.log(`Fetching spec data for ${spec.name}...`);

  try {
    const response = await fetch(createSpecGitlabEndpoint(spec), {
      headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    const specData = Buffer.from(json.content, "base64").toString("utf8");
    const specPath = `./specs/${spec.name.replace(".yaml", ".yml")}`;

    checkAndCreateSpecsDir();

    fs.writeFileSync(specPath, specData, "utf8");
    return spec.name;
  } catch (error) {
    console.error("Error:", error);
  }
}

function checkAndCreateSpecsDir() {
  const dirPath = path.join(".", "specs");

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log("Directory 'specs' is created.");
  } else {
    console.log("Directory 'specs' already exists.");
  }

  // Continue with the rest of your program...
}

async function fetchTreeList(path: string) {
  console.log(`Fetching tree list at path ${path}...`);

  const treeListEndpoint = `${GITLAB_ENDPOINT}/${env.GITLAB_FLIP_REPO_ID}/repository/tree?ref=${refBranch}&path=${path}`;

  try {
    const response = await fetch(treeListEndpoint, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const treeList = (await response.json()) as RepositoryTreeItem[];

    return treeList;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function processFileOrTree(
  item: RepositoryTreeItem,
  root?: string
): Promise<any> {
  if (item.type === "blob") {
    if (root) {
      return fetchDocData(item.path, root);
    }

    return fetchDocData(item.path);
  } else if (item.type === "tree") {
    const itemsInTree = await fetchTreeList(item.path);

    if (itemsInTree) {
      return Promise.all(
        itemsInTree.map((item: RepositoryTreeItem) => {
          const length = item.path.split("/").length;
          const root = item.path.split("/")[length - 2];
          return processFileOrTree(item, root);
        })
      );
    }
  }
}

// Function to fetch file list from GitLab repository
async function fetchFileList(type: "spec" | "docs") {
  console.log("Fetching file list...");

  const stage = getDeploymentStage();
  const path = type === "spec" ? "" : "docs";

  const fileListEndpoint = `${GITLAB_ENDPOINT}/${env.GITLAB_FLIP_REPO_ID}/repository/tree?ref=${refBranch}&path=api/spec/v3/${stage}/${path}`;

  try {
    const response = await fetch(fileListEndpoint, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const fileList = (await response.json()) as RepositoryTreeItem[];

    return fileList;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchData() {
  const specs = await fetchFileList("spec");
  const specFiles = specs?.filter((spec) => spec.type === "blob");

  if (specFiles) {
    await Promise.all(specFiles.map((spec) => fetchSpecData(spec)));
    cleanGlobalSpecs();
  }

  const docs = await fetchFileList("docs");

  if (docs) {
    await Promise.all(docs.map((doc) => processFileOrTree(doc)));
  }
}

fetchData();

/**
 * Spec maniuipulation functions
 */
function cleanGlobalSpecs() {
  console.log("Cleaning global specs...");
  deleteGlobalSpecs();
  console.log("Moving global specs...");
  moveGlobalSpecs();
  console.log("Deleting api directory...");
  deleteAllInDirectory("./src/documents/api");
}

function moveGlobalSpecs() {
  globalSpecs.forEach((spec) => moveSpec(spec));
}

function moveSpec(spec: string) {
  const sourcePath = path.join("specs", `${spec}`);
  const destinationPath = path.join(".", `${spec}`);

  fs.rename(sourcePath, destinationPath, (err) => {
    if (err) {
      console.error(`Error: Unable to rename ${spec}`, err);
      return;
    }
    console.log(`Moved global spec ${spec} to root for oasBuilder`);
  });
}

function deleteGlobalSpecs() {
  deleteSpec("version-info.yml");
  deleteSpec("merged.yml");
}

function deleteSpec(spec: string) {
  const specPath = path.join("specs", `${spec}`);

  fs.unlink(specPath, (err) => {
    if (err) {
      console.error(`Error: Unable to delete ${spec}`, err);
      return;
    }
    console.log(`Deleted spec ${spec}`);
  });
}

function deleteAllInDirectory(directory: string): void {
  if (fs.existsSync(directory)) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.lstatSync(filePath);

      if (stat.isDirectory()) {
        deleteAllInDirectory(filePath); // Recursive call for subdirectory
        fs.rmdirSync(filePath); // Remove the now-empty directory
      } else if (stat.isFile()) {
        fs.unlinkSync(filePath); // Remove the file
      }
    }
  } else {
    console.log(`Directory ${directory} does not exist.`);
  }
}
