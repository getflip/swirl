import { GetThemeRequestResult } from "./theming";

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
    result: ForMethod extends BridgeMethod
      ? BridgeMethodResultMapping[ForMethod]
      : unknown;
  };

export type BridgeError = {
  code: string;
};

export enum BridgeMethod {
  GET_THEME = "GET_THEME",
  NAVIGATE = "NAVIGATE",
  TOAST = "TOAST",
}

export type BridgeMethodResultMapping = {
  [BridgeMethod.GET_THEME]: GetThemeRequestResult;
  [BridgeMethod.NAVIGATE]: undefined;
  [BridgeMethod.TOAST]: undefined;
};
