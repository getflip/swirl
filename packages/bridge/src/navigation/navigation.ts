import { makeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import {
  CloseRequest,
  CloseResult,
  NavigateRequest,
  NavigateResult,
} from "./navigation.types";

export function close() {
  const request: CloseRequest = {
    id: crypto.randomUUID(),
    method: BridgeMethod.CLOSE,
  };

  return makeRequest<CloseResult>(request);
}

export function navigate(path: string) {
  const request: NavigateRequest = {
    id: crypto.randomUUID(),
    method: BridgeMethod.NAVIGATE,
    params: { path },
  };

  return makeRequest<NavigateResult>(request);
}
