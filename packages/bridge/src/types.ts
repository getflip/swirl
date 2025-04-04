import {
  CloseDialogResult,
  CreateDialogResult,
  DestroyDialogResult,
  OpenDialogResult,
} from "./dialog";
import { DownloadResult } from "./download";
import { SubscribeResult, UnsubscribeResult } from "./events/events.types";
import { GetAvailableLangsResult, GetLangResult } from "./i18n";
import {
  CloseModalResult,
  CreateModalResult,
  DestroyModalResult,
  OpenModalResult,
} from "./modal";
import { NavigateResult } from "./navigation";
import { GetThemeResult, SetThemeResult } from "./theming";
import { ShowToastResult } from "./toast";

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
  CLOSE_MODAL = "CLOSE_MODAL",
  CREATE_DIALOG = "CREATE_DIALOG",
  CREATE_MODAL = "CREATE_MODAL",
  DESTROY_DIALOG = "DESTROY_DIALOG",
  DESTROY_MODAL = "DESTROY_MODAL",
  GET_AVAILABLE_LANGS = "GET_AVAILABLE_LANGS",
  GET_LANG = "GET_LANG",
  GET_THEME = "GET_THEME",
  NAVIGATE = "NAVIGATE",
  OPEN_DIALOG = "OPEN_DIALOG",
  OPEN_MODAL = "OPEN_MODAL",
  SET_THEME = "SET_THEME",
  SHOW_TOAST = "SHOW_TOAST",
  SUBSCRIBE = "SUBSCRIBE",
  UNSUBSCRIBE = "UNSUBSCRIBE",
  DOWNLOAD = "DOWNLOAD",
}

export type BridgeMethodResultMapping = {
  [BridgeMethod.CLOSE_DIALOG]: CloseDialogResult;
  [BridgeMethod.CLOSE_MODAL]: CloseModalResult;
  [BridgeMethod.CREATE_DIALOG]: CreateDialogResult;
  [BridgeMethod.CREATE_MODAL]: CreateModalResult;
  [BridgeMethod.DESTROY_DIALOG]: DestroyDialogResult;
  [BridgeMethod.DESTROY_MODAL]: DestroyModalResult;
  [BridgeMethod.GET_AVAILABLE_LANGS]: GetAvailableLangsResult;
  [BridgeMethod.GET_LANG]: GetLangResult;
  [BridgeMethod.GET_THEME]: GetThemeResult;
  [BridgeMethod.NAVIGATE]: NavigateResult;
  [BridgeMethod.OPEN_DIALOG]: OpenDialogResult;
  [BridgeMethod.OPEN_MODAL]: OpenModalResult;
  [BridgeMethod.SET_THEME]: SetThemeResult;
  [BridgeMethod.SHOW_TOAST]: ShowToastResult;
  [BridgeMethod.SUBSCRIBE]: SubscribeResult;
  [BridgeMethod.UNSUBSCRIBE]: UnsubscribeResult;
  [BridgeMethod.DOWNLOAD]: DownloadResult;
};
