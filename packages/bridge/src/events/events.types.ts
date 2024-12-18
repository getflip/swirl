import { BridgeRequest } from "../messaging/messaging.types";
import { BridgeMethod } from "../types";

export enum BridgeEventType {
  NAVIGATION_END = "NAVIGATION_END",
  PRIMARY_ACTION_CLICK = "PRIMARY_ACTION_CLICK",
  LANG_CHANGE = "LANG_CHANGE",
  SECONDARY_ACTION_CLICK = "SECONDARY_ACTION_CLICK",
  THEME_CHANGE = "THEME_CHANGE",
  TITLE_CHANGE = "TITLE_CHANGE",
}

export type BridgeEvent<DataType = unknown> = {
  data?: DataType;
  id: string;
  type: BridgeEventType;
};

export type SubscribeRequest = BridgeRequest<
  BridgeMethod.SUBSCRIBE,
  {
    id: string;
    type: BridgeEventType;
  }
>;

export type UnsubscribeRequest = BridgeRequest<
  BridgeMethod.UNSUBSCRIBE,
  {
    id: string;
    type: BridgeEventType;
  }
>;

export type SubscribeResult = boolean;

export type UnsubscribeResult = boolean;

export type UnsubscribeFunction = () => Promise<void>;

export type SubscribeOptions = {
  id?: string;
};
