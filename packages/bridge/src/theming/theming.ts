import { SwirlOSTheme } from "@getflip/swirl-components";
import { v4 as uuidv4 } from "uuid";
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
    id: uuidv4(),
    method: BridgeMethod.GET_THEME,
  };

  return makeRequest<GetThemeResult>(request);
}

export function setTheme(theme: SwirlOSTheme) {
  const request: SetThemeRequest = {
    id: uuidv4(),
    method: BridgeMethod.SET_THEME,
    params: { theme },
  };

  return makeRequest<SetThemeResult>(request);
}
