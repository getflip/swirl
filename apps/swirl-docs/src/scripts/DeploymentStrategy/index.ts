import { FileDeleter } from "./FileDeleter";
import { FileFetcher } from "./FileFetcher";
import {
  ApiSpecsNavigationGenerator,
  ApiDocsNavigationGenerator,
} from "./NavigationGenerator";

export interface DeploymentStrategy {
  fetchData(): Promise<void>;
  handleFileDeletion(): void;
  generateApiNavigation(): Promise<void>;
}

export class ProductionDeployment implements DeploymentStrategy {
  async fetchData() {
    const fetcher = new FileFetcher();
    await fetcher.fetchData();
  }

  async handleFileDeletion() {
    const deleter = new FileDeleter();
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
  async fetchData() {
    const fetcher = new FileFetcher();
    await fetcher.fetchData();
  }

  async handleFileDeletion() {
    const deleter = new FileDeleter();
    await deleter.moveAndDeleteSpecs();
  }

  async generateApiNavigation() {
    const apiSpecNavigationGenerator = new ApiSpecsNavigationGenerator();
    const apiDocsNavigationGenerator = new ApiDocsNavigationGenerator();

    await apiSpecNavigationGenerator.generate();
    await apiDocsNavigationGenerator.generate();
  }
}
