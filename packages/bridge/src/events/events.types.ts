import { BridgeRequest } from "../messaging/messaging.types";
import { BridgeMethod } from "../types";

export enum BridgeEventType {
  LANG_CHANGE = "LANG_CHANGE",
  THEME_CHANGE = "THEME_CHANGE",
}

export type BridgeEvent<DataType = unknown> = {
  data?: DataType;
  type: BridgeEventType;
};

export type SubscribeRequest = BridgeRequest<
  BridgeMethod.SUBSCRIBE,
  {
    type: BridgeEventType;
  }
>;

export type UnsubscribeRequest = BridgeRequest<
  BridgeMethod.UNSUBSCRIBE,
  {
    type: BridgeEventType;
  }
>;

export type SubscribeResult = boolean;

export type UnsubscribeResult = boolean;

export type UnsubscribeFunction = () => Promise<void>;
