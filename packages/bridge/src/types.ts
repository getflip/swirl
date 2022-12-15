import {
  CloseDialogResult,
  CreateDialogResult,
  OpenDialogResult,
} from "./dialog";
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
  CLOSE_DIALOG = "CLOSE_DIALOG",
  CREATE_DIALOG = "CREATE_DIALOG",
  GET_AVAILABLE_LANGS = "GET_AVAILABLE_LANGS",
  GET_LANG = "GET_LANG",
  GET_THEME = "GET_THEME",
  NAVIGATE = "NAVIGATE",
  OPEN_DIALOG = "OPEN_DIALOG",
  SUBSCRIBE = "SUBSCRIBE",
  UNSUBSCRIBE = "UNSUBSCRIBE",
}

export type BridgeMethodResultMapping = {
  [BridgeMethod.CLOSE_DIALOG]: CloseDialogResult;
  [BridgeMethod.CREATE_DIALOG]: CreateDialogResult;
  [BridgeMethod.GET_AVAILABLE_LANGS]: GetAvailableLangsResult;
  [BridgeMethod.GET_LANG]: GetLangResult;
  [BridgeMethod.GET_THEME]: GetThemeResult;
  [BridgeMethod.NAVIGATE]: NavigateResult;
  [BridgeMethod.OPEN_DIALOG]: OpenDialogResult;
  [BridgeMethod.SUBSCRIBE]: SubscribeResult;
  [BridgeMethod.UNSUBSCRIBE]: UnsubscribeResult;
};
