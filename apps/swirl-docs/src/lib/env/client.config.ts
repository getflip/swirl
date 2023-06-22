import { z } from "zod";
import { envVariables } from ".";

const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  console.log("client.config", process.env);
  if (!unvalidatedEnvironmentVariable) {
    // throw new Error(
    //   `Couldn't find environment variable: ${environmentVariable}`
    // );
    return "";
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const env: z.infer<typeof envVariables> = {
  GOOGLE_TAG_MANAGER_ID: getEnvironmentVariable("GOOGLE_TAG_MANAGER_ID"),
  GITLAB_ACCESS_TOKEN: getEnvironmentVariable("GITLAB_ACCESS_TOKEN"),
  GITLAB_FLIP_REPO_ID: getEnvironmentVariable("GITLAB_FLIP_REPO_ID"),
  NEXT_PUBLIC_ALGOLIA_APP_ID: getEnvironmentVariable(
    "NEXT_PUBLIC_ALGOLIA_APP_ID"
  ),
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: getEnvironmentVariable(
    "NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY"
  ),
  ALGOLIA_SEARCH_ADMIN_KEY: getEnvironmentVariable("ALGOLIA_SEARCH_ADMIN_KEY"),
};
