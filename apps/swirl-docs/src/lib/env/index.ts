import { z } from "zod";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export const envVariables = z.object({
  GOOGLE_TAG_MANAGER_ID: z.string(),
  NEXT_PUBLIC_ALGOLIA_APP_ID: z.string(),
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: z.string(),
  ALGOLIA_SEARCH_ADMIN_KEY: z.string(),
  GITLAB_ACCESS_TOKEN: z.string(),
  GITLAB_FLIP_REPO_ID: z.string(),
  DEPLOYMENT_STAGE: z.string(),
  REFERENCE_BRANCH: z.string(),
});
