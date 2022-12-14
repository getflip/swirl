import { BridgeMethod } from "../types";
import { BridgeRequest } from "../messaging/messaging.types";

export type GetAvailableLangsRequest = BridgeRequest<
  BridgeMethod.GET_AVAILABLE_LANGS,
  undefined
>;

export type GetAvailableLangsResult = string[];

export type GetLangRequest = BridgeRequest<BridgeMethod.GET_LANG, undefined>;

export type GetLangResult = string;
