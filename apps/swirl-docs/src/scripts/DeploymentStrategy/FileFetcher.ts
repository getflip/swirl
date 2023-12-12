import path from "path";
import { FileSystemHandler } from "./FileSystemHandler";
import { GitLabAPI } from "./GitlabApi";

export type RepositoryTreeItem = {
  id: string;
  name: string;
  type: string;
  path: string;
  mode: string;
};

export class FileFetcher {
  private gitlabAPI = new GitLabAPI();
  private fileSystemHandler = new FileSystemHandler();

  async fetchFiles() {
    await this.fetchSpecFile();

    const docs = await this.gitlabAPI.fetchFileList("docs");

    if (docs) {
      await Promise.all(docs.map((doc) => this.processFileOrTree(doc)));
    }
  }

  private async fetchDocFile(doc: string, root?: string) {
    const docData = await this.gitlabAPI.fetchDocData(doc);
    let docPath = "./src/documents/api";

    if (root) {
      const docName = doc.split("/").pop()?.split(".")[0];
      docPath = `${docPath}/${root}/${docName}.mdx`;
    } else {
      const docName = doc.split("/").pop()?.split(".")[0];
      docPath = `${docPath}/${docName}.mdx`;
    }

    this.fileSystemHandler.writeToFile(path.join("./", docPath), docData);
  }

  private async fetchSpecFile() {
    const specData = await this.gitlabAPI.fetchMergedYml();
    this.fileSystemHandler.checkAndCreateDir(path.join(".", "specs"));
    this.fileSystemHandler.writeToFile("./specs/merged.yml", specData);
  }

  private async processFileOrTree(
    item: RepositoryTreeItem,
    root?: string
  ): Promise<any> {
    if (item.type === "blob") {
      return this.fetchDocFile(item.path, root);
    }

    if (item.type === "tree") {
      return this.processTree(item, root);
    }
  }

  private getRootFromPath(itemPath: string): string {
    const pathComponents = itemPath.split("/");
    return pathComponents[pathComponents.length - 2];
  }

  private async processTree(
    tree: RepositoryTreeItem,
    root?: string
  ): Promise<any> {
    const itemsInTree = await this.gitlabAPI.fetchTreeList(tree.path);
    if (!itemsInTree) return;

    return Promise.all(
      itemsInTree.map((item: RepositoryTreeItem) => {
        const newRoot = root || this.getRootFromPath(item.path);
        return this.processFileOrTree(item, newRoot);
      })
    );
  }
}
