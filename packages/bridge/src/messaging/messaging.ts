import { log } from "../logging";
import { BridgeError, BridgeRequest, BridgeResponse } from "../types";

const hostAppOrigin = process.env.HOST_APP_ORIGIN || "http://localhost:4200";

export function postMessage(message: BridgeRequest) {
  window.postMessage(message, hostAppOrigin);

  log("postMessage", {
    message,
    targetOrigin: hostAppOrigin,
  });
}

export function makeRequest<Result>(
  request: BridgeRequest
): Promise<Result | BridgeError> {
  // TODO: handle non-IFrame integrations

  return new Promise((resolve, reject) => {
    const handler = (event: MessageEvent<BridgeResponse>) => {
      // TODO: check message origin

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
