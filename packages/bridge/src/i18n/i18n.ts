import { makeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import {
  GetAvailableLangsRequest,
  GetAvailableLangsResult,
  GetLangRequest,
  GetLangResult,
} from "./i18n.types";

export function getAvailableLangs() {
  const request: GetAvailableLangsRequest = {
    id: crypto.randomUUID(),
    method: BridgeMethod.GET_AVAILABLE_LANGS,
  };

  return makeRequest<GetAvailableLangsResult>(request);
}

export function getLang() {
  const request: GetLangRequest = {
    id: crypto.randomUUID(),
    method: BridgeMethod.GET_LANG,
  };

  return makeRequest<GetLangResult>(request);
}
