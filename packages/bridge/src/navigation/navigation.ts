import { v4 as uuidv4 } from "uuid";
import { makeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import { GetNavigateResult, NavigateRequest } from "./navigation.types";

export function navigate(path: string) {
  const request: NavigateRequest = {
    id: uuidv4(),
    method: BridgeMethod.NAVIGATE,
    params: { path },
  };

  return makeRequest<GetNavigateResult>(request);
}
