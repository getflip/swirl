import { BridgeMethod, BridgeRequest } from "../types";

export type NavigateRequest = BridgeRequest<
  BridgeMethod.NAVIGATE,
  {
    path: string;
  }
>;

export type GetNavigateResult = boolean;
