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

const createGitlabEndpoint = (specPath: string) =>
  `${GITLAB_ENDPOINT}/${
    env.GITLAB_FLIP_REPO_ID
  }/repository/files/${encodeURIComponent(specPath)}?ref=master`;

const extractSpecYmlName = (specPath: string) =>
  specPath.split("/").pop()?.split(".")[0];

async function fetchData(spec: string) {
  const encodedSpecPath = `api/spec/reference/v3/${spec}`;
  console.log("Fetching data...");

  try {
    const response = await fetch(createGitlabEndpoint(encodedSpecPath), {
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

async function fetchSpecs() {
  await Promise.all(specs.map(fetchData));
  globalSpecs.forEach(moveSpec);
}

fetchSpecs();
