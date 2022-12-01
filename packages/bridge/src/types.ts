import { GetAvailableLangsResult, GetLangResult } from "./i18n";
import { GetNavigateResult } from "./navigation";
import { GetThemeResult } from "./theming";

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
  code: BridgeErrorCode;
};

export enum BridgeErrorCode {
  FORBIDDEN_ORIGIN = "FORBIDDEN_ORIGIN",
  INVALID_REQUEST = "INVALID_REQUEST",
}

export enum BridgeMethod {
  GET_AVAILABLE_LANGS = "GET_AVAILABLE_LANGS",
  GET_LANG = "GET_LANG",
  GET_THEME = "GET_THEME",
  NAVIGATE = "NAVIGATE",
}

export type BridgeMethodResultMapping = {
  [BridgeMethod.GET_AVAILABLE_LANGS]: GetAvailableLangsResult;
  [BridgeMethod.GET_LANG]: GetLangResult;
  [BridgeMethod.GET_THEME]: GetThemeResult;
  [BridgeMethod.NAVIGATE]: GetNavigateResult;
};
