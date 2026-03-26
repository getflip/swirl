import { BridgeMethod } from "../types";
import { BridgeRequest } from "../messaging/messaging.types";

export type CloseRequest = BridgeRequest<BridgeMethod.CLOSE>;

export type CloseResult = boolean;

export type NavigateRequest = BridgeRequest<
  BridgeMethod.NAVIGATE,
  {
    path: string;
  }
>;

export type NavigateResult = boolean;
