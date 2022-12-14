import { log } from "../logging";
import { BridgeError, BridgeErrorCode } from "../types";
import { BridgeRequest, BridgeResponse } from "./messaging.types";

declare global {
  interface Window {
    FlipFlutter: {
      postMessage: (message: string) => void;
    };
  }
}

export function isFlutterApp() {
  return "FlipFlutter" in window;
}

export function postMessage(message: BridgeRequest) {
  const isFlutter = isFlutterApp();

  if (!window.top && !isFlutter) {
    return;
  }

  const hostAppOrigin = window.flipBridgeOptions?.hostAppOrigin;

  if (!hostAppOrigin) {
    throw Error(`Please call 'initFlipBridge'.`);
  }

  if (isFlutter) {
    window.FlipFlutter.postMessage(JSON.stringify(message));
  } else {
    window.top?.postMessage(message, hostAppOrigin);
  }

  log("postMessage", {
    message,
    isFlutter,
    targetOrigin: hostAppOrigin,
  });
}

export function makeRequest<Result>(
  request: BridgeRequest
): Promise<Result | BridgeError> {
  return new Promise((resolve, reject) => {
    const handler = getRequestHandler(request, resolve, reject);

    window.addEventListener("message", handler);
    postMessage(request);
  });
}

export function getRequestHandler<Result>(
  request: BridgeRequest,
  resolve: (value: Result | PromiseLike<Result>) => void,
  reject: (error: BridgeError) => void
) {
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

  return handler;
}

export function isResponse(message: Object): message is BridgeResponse {
  return (
    typeof message === "object" &&
    "id" in message &&
    ("result" in message || "error" in message)
  );
}

export function isAllowedOrigin(origin: string): boolean {
  if (isFlutterApp()) {
    return true;
  }

  const hostAppOrigin = window.flipBridgeOptions?.hostAppOrigin;

  return origin === hostAppOrigin;
}
