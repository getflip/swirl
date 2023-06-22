import fetch from "node-fetch";
import fs from "fs";
import { env } from "@swirl/lib/env/server.config";

const TASKS_SPEC = encodeURIComponent("api/spec/reference/v3/tasks.yml");
const USERS_SPEC = encodeURIComponent("api/spec/reference/v3/users.yaml");
const SHARED_SPEC = encodeURIComponent("api/spec/reference/v3/shared.yml");
const MERGED_SPEC = encodeURIComponent("api/spec/reference/v3/merged.yaml");
const PROBLEM_SPEC = encodeURIComponent("api/spec/reference/v3/problem.yml");
const VERSION_INFO_SPEC = encodeURIComponent(
  "api/spec/reference/v3/version-info.yml"
);

const specs = [
  TASKS_SPEC,
  USERS_SPEC,
  SHARED_SPEC,
  MERGED_SPEC,
  PROBLEM_SPEC,
  VERSION_INFO_SPEC,
];

const createGitlabEndpoint = (specPath: string) =>
  `https://gitlab.com/api/v4/projects/${env.GITLAB_FLIP_REPO_ID}/repository/files/${specPath}?ref=master`;

const headers = {
  "PRIVATE-TOKEN": env.GITLAB_ACCESS_TOKEN,
};

function extractSpecYmlName(specPath: string) {
  return specPath.split("/").pop()?.split(".")[0];
}

async function fetchData(encodedSpecPath: string) {
  console.log("Fetching data...");

  try {
    const response = await fetch(createGitlabEndpoint(encodedSpecPath), {
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      const spec = Buffer.from(json.content, "base64").toString("utf-8");

      console.log(
        "EXTRACTED SPECNAME",
        extractSpecYmlName(decodeURIComponent(encodedSpecPath))
      );

      console.log("SPEC", spec.length);

      fs.writeFileSync(
        `./specs/${extractSpecYmlName(
          decodeURIComponent(encodedSpecPath)
        )}.yml`,
        spec,
        "utf8"
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchSpecs() {
  specs.forEach((spec) => fetchData(spec));
}

fetchSpecs();
