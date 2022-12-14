import { SubscribeResult, UnsubscribeResult } from "./events/events.types";
import { GetAvailableLangsResult, GetLangResult } from "./i18n";
import { NavigateResult } from "./navigation";
import { GetThemeResult } from "./theming";

export type BridgeOptions = {
  debug?: boolean;
  hostAppOrigin: string;
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
  SUBSCRIBE = "SUBSCRIBE",
  UNSUBSCRIBE = "UNSUBSCRIBE",
}

export type BridgeMethodResultMapping = {
  [BridgeMethod.GET_AVAILABLE_LANGS]: GetAvailableLangsResult;
  [BridgeMethod.GET_LANG]: GetLangResult;
  [BridgeMethod.GET_THEME]: GetThemeResult;
  [BridgeMethod.NAVIGATE]: NavigateResult;
  [BridgeMethod.SUBSCRIBE]: SubscribeResult;
  [BridgeMethod.UNSUBSCRIBE]: UnsubscribeResult;
};
