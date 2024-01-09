import { ApiEndpointGenerator } from "./Generators/ApiEndpointGenerator";
import { FileFetcher } from "./Generators/FileFetcher";
import {
  ApiDocsNavigationGenerator,
  ApiSpecsNavigationGenerator,
} from "./Generators/NavigationGenerator";

async function main() {
  const fetcher = new FileFetcher();
  await fetcher.fetchFiles();

  const apiEndpointGenerator = new ApiEndpointGenerator();
  const apiSpecNavigationGenerator = new ApiSpecsNavigationGenerator();
  const apiDocsNavigationGenerator = new ApiDocsNavigationGenerator();

  const apiDocumentations = await apiEndpointGenerator.generate();
  await apiSpecNavigationGenerator.generate(apiDocumentations);
  await apiDocsNavigationGenerator.generate();
}

main();
