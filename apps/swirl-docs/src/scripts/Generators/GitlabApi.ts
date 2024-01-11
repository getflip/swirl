import { Env } from "@swirl/lib/env/server.config";
import { RepositoryTreeItem } from "./FileFetcher";

const MERGED_YAML_PATH = "api/spec/v4/development/merged.yaml";

export class GitLabAPI {
  private GITLAB_ENDPOINT = "https://gitlab.com/api/v4/projects";
  private headers = {
    "PRIVATE-TOKEN": Env.GITLAB_ACCESS_TOKEN,
  };
  private refBranch = Env.REFERENCE_BRANCH;

  async fetchTreeList(pathString: string): Promise<RepositoryTreeItem[]> {
    const endpoint = this.constructEndpoint("repository/tree", {
      path: pathString,
    });
    return this.request<RepositoryTreeItem[]>(endpoint);
  }

  async fetchMergedYml(): Promise<string> {
    const endpoint = this.constructEndpoint(
      `repository/files/${encodeURIComponent(MERGED_YAML_PATH)}`
    );
    const json = await this.request<{ content: string }>(endpoint);
    return Buffer.from(json.content, "base64").toString("utf8");
  }

  async fetchDocData(doc: string): Promise<string> {
    const endpoint = this.constructEndpoint(
      `repository/files/${encodeURIComponent(doc)}`
    );
    const json = await this.request<any>(endpoint);
    return Buffer.from(json.content, "base64").toString("utf8");
  }

  async fetchFileList(type: "spec" | "docs"): Promise<RepositoryTreeItem[]> {
    const path = type === "spec" ? "" : "docs";
    const endpoint = this.constructEndpoint("repository/tree", {
      path: `api/spec/v4/${this.getDeploymentStage()}/${path}`,
    });
    return this.request<RepositoryTreeItem[]>(endpoint);
  }

  private getDeploymentStage(): string {
    if (!Env.NEXT_PUBLIC_DEPLOYMENT_STAGE) {
      throw new Error("DEPLOYMENT_ENVIRONMENT is not set");
    }
    return Env.NEXT_PUBLIC_DEPLOYMENT_STAGE === "staging"
      ? "development"
      : "development";
  }

  private async request<T>(endpoint: string): Promise<T> {
    const response = await fetch(endpoint, { headers: this.headers });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${
          response.status
        }. Full response: ${await response.text()}`
      );
    }

    return response.json();
  }

  private constructEndpoint(
    basePath: string,
    query?: Record<string, string | number>
  ): string {
    const queryString = new URLSearchParams({
      ref: this.refBranch,
      ...query,
    }).toString();

    return `${this.GITLAB_ENDPOINT}/${Env.GITLAB_FLIP_REPO_ID}/${basePath}?${queryString}`;
  }
}
