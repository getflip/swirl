import { log } from "../logging";
import {
  BridgeError,
  BridgeErrorCode,
  BridgeRequest,
  BridgeResponse,
} from "../types";

const hostAppOrigin = process.env.HOST_APP_ORIGIN || "http://localhost:4200";

export function postMessage(message: BridgeRequest) {
  if (!window.top) {
    return;
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
      if (!isAllowedOrigin(event.origin)) {
        reject({
          code: BridgeErrorCode.FORBIDDEN_ORIGIN,
        } as BridgeError);

        return;
      }

      if (event.data.id === request.id) {
        log("handleResponse", event.data);

        window.removeEventListener("message", handler);

        if (event.data.error) {
          reject(event.data.error as BridgeError);
        } else {
          resolve(event.data.result as Result);
        }
      }
    };

    window.addEventListener("message", handler);
    postMessage(request);
  });
}

export function isAllowedOrigin(origin: string): boolean {
  // TODO: check origin
  console.log(origin);

  return true;
}
