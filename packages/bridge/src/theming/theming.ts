import { v4 as uuidv4 } from "uuid";
import { makeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import { GetThemeRequest, GetThemeResult } from "./theming.types";

export function getTheme() {
  const request: GetThemeRequest = {
    id: uuidv4(),
    method: BridgeMethod.GET_THEME,
  };

  return makeRequest<GetThemeResult>(request);
}
