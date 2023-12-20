import { isProdDeployment } from "@swirl/lib/env";
import {
  DeploymentStrategy,
  ProductionDeployment,
  StagingDeployment,
} from "./DeploymentStrategy";

const getDeploymentStrategy = (): DeploymentStrategy => {
  if (isProdDeployment) {
    return new ProductionDeployment();
  }
  return new StagingDeployment();
};

const strategy = getDeploymentStrategy();

async function main() {
  await strategy.fetchData();
  await strategy.generateApiNavigation();
}

main();
