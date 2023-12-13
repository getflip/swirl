import { Env } from "@swirl/lib/env/server.config";
import {
  DeploymentStrategy,
  ProductionDeployment,
  StagingDeployment,
} from "./DeploymentStrategy";

const getDeploymentStrategy = (): DeploymentStrategy => {
  if (Env.NEXT_PUBLIC_DEPLOYMENT_STAGE === "production") {
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
