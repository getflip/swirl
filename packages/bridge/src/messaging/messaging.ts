import { log } from "../logging";
import {
  BridgeError,
  BridgeErrorCode,
  BridgeRequest,
  BridgeResponse,
} from "../types";

export function postMessage(message: BridgeRequest) {
  if (!window.top) {
    return;
  }

  const hostAppOrigin = window.flipBridgeOptions?.hostAppOrigin;

  if (!hostAppOrigin) {
    throw Error(`Please call 'initFlipBridge'.`);
  }

  window.top.postMessage(message, hostAppOrigin);

  log("postMessage", {
    message,
    targetOrigin: hostAppOrigin,
  });
}

export function makeRequest<Result>(
  request: BridgeRequest
): Promise<Result | BridgeError> {
  return new Promise((resolve, reject) => {
    const handler = (event: MessageEvent<BridgeResponse>) => {
      if (!isResponse(event.data) || event.data.id !== request.id) {
        return;
      }

      if (!isAllowedOrigin(event.origin)) {
        reject({
          code: BridgeErrorCode.FORBIDDEN_ORIGIN,
        } as BridgeError);

        return;
      }

      log("handleResponse", event.data);

      window.removeEventListener("message", handler);

      if (event.data.error) {
        reject(event.data.error as BridgeError);
      } else {
        resolve(event.data.result as Result);
      }
    };

    window.addEventListener("message", handler);
    postMessage(request);
  });
}

export function isResponse(message: Object): message is BridgeResponse {
  return "id" in message && ("result" in message || "error" in message);
}

export function isAllowedOrigin(origin: string): boolean {
  const hostAppOrigin = window.flipBridgeOptions?.hostAppOrigin;

  return origin === hostAppOrigin;
}
