import { makeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import { AppReadyRequest, AppReadyResult } from "./app.types";

export function notifyAppReady(options?: { builtWith?: string }) {
  const request: AppReadyRequest = {
    id: crypto.randomUUID(),
    method: BridgeMethod.APP_READY,
    params: options,
  };

  return makeRequest<AppReadyResult>(request);
}
