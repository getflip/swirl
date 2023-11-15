import {
  DeploymentStrategy,
  ProductionDeployment,
  StagingDeployment,
} from "./DeploymentStrategy";

import { Env } from "@swirl/lib/env/server.config";

const getDeploymentStrategy = (): DeploymentStrategy => {
  if (Env.NEXT_PUBLIC_DEPLOYMENT_STAGE === "production") {
    return new ProductionDeployment();
  }
  return new StagingDeployment();
};

const strategy = getDeploymentStrategy();

async function main() {
  await strategy.fetchData();
  await strategy.handleFileOperations();
  await strategy.generateApiNavigation();
}

main();
