import fetch from "node-fetch";
import fs from "fs";
import { Env } from "@swirl/lib/env/server.config";
import path from "path";

type RepositoryTreeItem = {
  id: string;
  name: string;
  type: string;
  path: string;
  mode: string;
};

const GITLAB_ENDPOINT = "https://gitlab.com/api/v4/projects";

export class FileFetcher {
  private headers = {
    "PRIVATE-TOKEN": Env.GITLAB_ACCESS_TOKEN,
  };
  private refBranch = Env.REFERENCE_BRANCH;

  async fetchData() {
    const specs = await this.fetchFileList("spec");
    const specFiles = specs?.filter((spec) => spec.type === "blob");

    if (specFiles) {
      await Promise.all(specFiles.map((spec) => this.fetchSpecData(spec)));
    }

    const docs = await this.fetchFileList("docs");

    if (docs) {
      await Promise.all(docs.map((doc) => this.processFileOrTree(doc)));
    }
  }

  private async fetchDocData(doc: string, root?: string) {
    const response = await fetch(this.createDocGitlabEndpoint(doc), {
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    const docData = Buffer.from(json.content, "base64").toString("utf8");
    let docPath = "./src/documents/api";

    if (!fs.existsSync(docPath)) {
      fs.mkdirSync(docPath, { recursive: true });
    }

    if (root) {
      const docName = doc.split("/").pop()?.split(".")[0];
      docPath = `${docPath}/${root}/${docName}.mdx`;
    } else {
      const docName = doc.split("/").pop()?.split(".")[0];
      docPath = `${docPath}/${docName}.mdx`;
    }

    fs.writeFileSync(path.join("./", docPath), docData, "utf8");
    return docPath;
  }

  private createDocGitlabEndpoint(doc: string) {
    return `${GITLAB_ENDPOINT}/${
      Env.GITLAB_FLIP_REPO_ID
    }/repository/files/${encodeURIComponent(doc)}?ref=${this.refBranch}`;
  }

  private async fetchSpecData(spec: RepositoryTreeItem) {
    const response = await fetch(this.createSpecGitlabEndpoint(spec), {
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    const specData = Buffer.from(json.content, "base64").toString("utf8");
    const specPath = `./specs/${spec.name.replace(".yaml", ".yml")}`;

    this.checkAndCreateSpecsDir();
    fs.writeFileSync(specPath, specData, "utf8");
    return spec.name;
  }

  private createSpecGitlabEndpoint(spec: RepositoryTreeItem) {
    return `${GITLAB_ENDPOINT}/${
      Env.GITLAB_FLIP_REPO_ID
    }/repository/files/${encodeURIComponent(spec.path)}?ref=${this.refBranch}`;
  }

  private checkAndCreateSpecsDir() {
    const dirPath = path.join(".", "specs");

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  private async fetchFileList(type: "spec" | "docs") {
    const path = type === "spec" ? "" : "docs";
    const fileListEndpoint = `${GITLAB_ENDPOINT}/${
      Env.GITLAB_FLIP_REPO_ID
    }/repository/tree?ref=${
      this.refBranch
    }&path=api/spec/v4/${this.getDeploymentStage()}/${path}`;

    const response = await fetch(fileListEndpoint, { headers: this.headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const fileList = (await response.json()) as RepositoryTreeItem[];
    return fileList;
  }

  private getDeploymentStage() {
    if (!Env.DEPLOYMENT_STAGE) {
      throw new Error("DEPLOYMENT_ENVIRONMENT is not set");
    }

    if (Env.DEPLOYMENT_STAGE === "staging") {
      return "development";
    }

    return "development";
  }

  private async processFileOrTree(
    item: RepositoryTreeItem,
    root?: string
  ): Promise<any> {
    if (item.type === "blob") {
      if (root) {
        return this.fetchDocData(item.path, root);
      }
      return this.fetchDocData(item.path);
    } else if (item.type === "tree") {
      const itemsInTree = await this.fetchTreeList(item.path);
      if (itemsInTree) {
        return Promise.all(
          itemsInTree.map((item: RepositoryTreeItem) => {
            const length = item.path.split("/").length;
            const newRoot = item.path.split("/")[length - 2];
            return this.processFileOrTree(item, newRoot);
          })
        );
      }
    }
  }

  private async fetchTreeList(pathString: string) {
    const treeListEndpoint = `${GITLAB_ENDPOINT}/${Env.GITLAB_FLIP_REPO_ID}/repository/tree?ref=${this.refBranch}&path=${pathString}`;

    const response = await fetch(treeListEndpoint, { headers: this.headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const treeList = (await response.json()) as RepositoryTreeItem[];
    return treeList;
  }
}
