import { BridgeRequest } from "../messaging/messaging.types";
import { BridgeMethod } from "../types";

export type AppReadyRequest = BridgeRequest<
  BridgeMethod.APP_READY,
  {
    builtWith?: string;
  }
>;

export type AppReadyResult = boolean;
