import { postMessage } from "../messaging";
import { BridgeMethod } from "../types";
import { GetThemeRequest } from "./theming.types";
import { v4 as uuidv4 } from "uuid";

export function getTheme() {
  const request: GetThemeRequest = {
    id: uuidv4(),
    method: BridgeMethod.GET_THEME,
  };

  postMessage(request);
}
