import { FileDeleter } from "./FileDeleter";
import { FileFetcher } from "./FileFetcher";
import {
  ApiSpecsNavigationGenerator,
  ApiDocsNavigationGenerator,
} from "./NavigationGenerator";

export interface DeploymentStrategy {
  strategy: "production" | "staging";
  fetchData(): Promise<void>;
  handleFileDeletion(): void;
  generateApiNavigation(): Promise<void>;
}

export class ProductionDeployment implements DeploymentStrategy {
  strategy: DeploymentStrategy["strategy"] = "production";

  async fetchData() {
    const fetcher = new FileFetcher();
    await fetcher.fetchFiles();
  }

  async handleFileDeletion() {
    const deleter = new FileDeleter(this.strategy);
    await deleter.moveAndDeleteSpecs();
  }

  async generateApiNavigation() {
    const apiSpecNavigationGenerator = new ApiSpecsNavigationGenerator();
    const apiDocsNavigationGenerator = new ApiDocsNavigationGenerator();

    await apiSpecNavigationGenerator.generate();
    await apiDocsNavigationGenerator.generate();
  }
}

export class StagingDeployment implements DeploymentStrategy {
  strategy: DeploymentStrategy["strategy"] = "staging";

  async fetchData() {
    const fetcher = new FileFetcher();
    await fetcher.fetchFiles();
  }

  async handleFileDeletion() {
    const deleter = new FileDeleter(this.strategy);
    await deleter.moveAndDeleteSpecs();
  }

  async generateApiNavigation() {
    const apiSpecNavigationGenerator = new ApiSpecsNavigationGenerator();
    const apiDocsNavigationGenerator = new ApiDocsNavigationGenerator();

    await apiSpecNavigationGenerator.generate();
    await apiDocsNavigationGenerator.generate();
  }
}
