import { SwirlOSTheme } from "@getflip/swirl-components";
import { makeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import {
  GetThemeRequest,
  GetThemeResult,
  SetThemeRequest,
  SetThemeResult,
} from "./theming.types";

export function getTheme() {
  const request: GetThemeRequest = {
    id: crypto.randomUUID(),
    method: BridgeMethod.GET_THEME,
  };

  return makeRequest<GetThemeResult>(request);
}

export function setTheme(theme: SwirlOSTheme) {
  const request: SetThemeRequest = {
    id: crypto.randomUUID(),
    method: BridgeMethod.SET_THEME,
    params: { theme },
  };

  return makeRequest<SetThemeResult>(request);
}
