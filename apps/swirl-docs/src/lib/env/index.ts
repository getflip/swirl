import { z } from "zod";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export const isProd = process.env.NODE_ENV === "production";

export const envVariables = z.object({
  NEXT_PUBLIC_ALGOLIA_APP_ID: z.string(),
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: z.string(),
  NEXT_PUBLIC_DEPLOYMENT_STAGE: z.string(),
  ALGOLIA_SEARCH_ADMIN_KEY: z.string(),
  GITLAB_ACCESS_TOKEN: z.string(),
  GITLAB_FLIP_REPO_ID: z.string(),
  REFERENCE_BRANCH: z.string(),
});
