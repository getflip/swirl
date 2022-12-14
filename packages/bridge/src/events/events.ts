import { v4 as uuidv4 } from "uuid";
import { log } from "../logging";
import { isAllowedOrigin, makeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import {
  BridgeEvent,
  BridgeEventType,
  SubscribeRequest,
  SubscribeResult,
  UnsubscribeFunction,
  UnsubscribeRequest,
  UnsubscribeResult,
} from "./events.types";

export async function subscribe(
  type: BridgeEventType,
  callback: (event?: BridgeEvent) => void
): Promise<UnsubscribeFunction> {
  const subscribeRequest: SubscribeRequest = {
    id: uuidv4(),
    method: BridgeMethod.SUBSCRIBE,
    params: { type },
  };

  const eventHandler = (event: MessageEvent<BridgeEvent>) => {
    if (
      !isAllowedOrigin(event.origin) ||
      !isEvent(event.data) ||
      event.data.type !== type
    ) {
      return;
    }

    log("handleEvent", event.data);

    callback(event.data);
  };

  window.addEventListener("message", eventHandler);

  const subscribed = await makeRequest<SubscribeResult>(subscribeRequest);

  if (!subscribed) {
    window.removeEventListener("message", eventHandler);
    throw new Error(`Could not subscribe to event "${type}".`);
  }

  return async () => {
    const unsubscribeRequest: UnsubscribeRequest = {
      id: uuidv4(),
      method: BridgeMethod.UNSUBSCRIBE,
      params: { type },
    };

    await makeRequest<UnsubscribeResult>(unsubscribeRequest);

    window.removeEventListener("message", eventHandler);
  };
}

export function isEvent(message: Object): message is BridgeEvent {
  return (
    "type" in message &&
    Object.values(BridgeEventType).includes(message.type as BridgeEventType)
  );
}
