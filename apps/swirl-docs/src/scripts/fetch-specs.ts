import fetch from "node-fetch";
import fs from "fs";
import { env } from "@swirl/lib/env/server.config";
import path from "path";

const globalSpecs = ["problem.yml", "shared.yml"];
const specs = ["tasks.yml", "users.yaml", "merged.yaml", ...globalSpecs];
const GITLAB_ENDPOINT = "https://gitlab.com/api/v4/projects";
const headers = {
  "PRIVATE-TOKEN": env.GITLAB_ACCESS_TOKEN,
};

const createSpecGitlabEndpoint = (spec: string) => {
  return `${GITLAB_ENDPOINT}/${
    env.GITLAB_FLIP_REPO_ID
  }/repository/files/api/spec/reference/v3/${encodeURIComponent(
    spec
  )}?ref=master`;
};

const createDocGitlabEndpoint = (doc: string) => {
  return `${GITLAB_ENDPOINT}/${
    env.GITLAB_FLIP_REPO_ID
  }/repository/files/api/docs/${encodeURIComponent(doc)}?ref=master`;
};

const extractSpecYmlName = (specPath: string) =>
  specPath.split("/").pop()?.split(".")[0];

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

async function fetchDocData(doc: string) {
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
    const docName = doc.split("/").pop()?.split(".")[0];
    const docPath = `./src/documents/api/${docName}.mdx`;

    fs.writeFileSync(docPath, docData, "utf8");
    return docPath;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchSpecData(spec: string) {
  console.log("Fetching spec data...");

  try {
    const response = await fetch(createSpecGitlabEndpoint(spec), {
      headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    const specData = Buffer.from(json.content, "base64").toString("utf8");
    const specName = extractSpecYmlName(spec);
    const specPath = `./specs/${specName}.yml`;

    fs.writeFileSync(specPath, specData, "utf8");
    return specName;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchData() {
  await Promise.all(specs.map(fetchSpecData));
  globalSpecs.forEach(moveSpec);
}

// Function to fetch file list from GitLab repository
async function fetchFileList(path: "reference/v3" | "docs") {
  console.log("Fetching file list...");

  const fileListEndpoint = `${GITLAB_ENDPOINT}/${env.GITLAB_FLIP_REPO_ID}/repository/tree?ref=master&path=api/spec/${path}`;

  try {
    const response = await fetch(fileListEndpoint, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const fileList = await response.json();

    const fileListMap = fileList.map((file: any) => file.path);

    console.log(fileListMap);

    return fileList.map((file: any) => file.path);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchFileList("reference/v3");
fetchFileList("docs");

// fetchData();
