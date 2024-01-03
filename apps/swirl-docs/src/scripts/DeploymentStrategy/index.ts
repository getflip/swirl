import { ApiEndpointGenerator } from "./ApiEndpointGenerator";
import { FileFetcher } from "./FileFetcher";
import {
  ApiDocsNavigationGenerator,
  ApiSpecsNavigationGenerator,
} from "./NavigationGenerator";

export interface DeploymentStrategy {
  strategy: "production" | "staging";
  fetchData(): Promise<void>;
  generateApiNavigation(): Promise<void>;
}

export class ProductionDeployment implements DeploymentStrategy {
  strategy: DeploymentStrategy["strategy"] = "production";

  async fetchData() {
    const fetcher = new FileFetcher();
    await fetcher.fetchFiles();
  }

  async generateApiNavigation() {
    const apiSpecNavigationGenerator = new ApiSpecsNavigationGenerator();
    const apiDocsNavigationGenerator = new ApiDocsNavigationGenerator();
    const apiEndpointGenerator = new ApiEndpointGenerator();

    await apiSpecNavigationGenerator.generate();
    await apiDocsNavigationGenerator.generate();
    await apiEndpointGenerator.generate();
  }
}

export class StagingDeployment implements DeploymentStrategy {
  strategy: DeploymentStrategy["strategy"] = "staging";

  async fetchData() {
    const fetcher = new FileFetcher();
    await fetcher.fetchFiles();
  }

  async generateApiNavigation() {
    const apiSpecNavigationGenerator = new ApiSpecsNavigationGenerator();
    const apiDocsNavigationGenerator = new ApiDocsNavigationGenerator();
    const apiEndpointGenerator = new ApiEndpointGenerator();

    await apiSpecNavigationGenerator.generate();
    await apiDocsNavigationGenerator.generate();
    await apiEndpointGenerator.generate();
  }
}
