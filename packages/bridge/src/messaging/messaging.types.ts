import { BridgeError, BridgeMethod, BridgeMethodResultMapping } from "../types";

export type BridgeRequest<
  WithMethod extends BridgeMethod | unknown = unknown,
  WithParams = Record<string, unknown> | Array<unknown>
> = {
  id: string;
  method: WithMethod;
  params?: WithParams;
};

export type BridgeResponse<ForMethod extends BridgeMethod | unknown = unknown> =
  {
    id: string;
    error?: BridgeError;
    result?: ForMethod extends BridgeMethod
      ? BridgeMethodResultMapping[ForMethod]
      : unknown;
  };
