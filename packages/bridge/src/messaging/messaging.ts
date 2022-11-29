import { BridgeRequest } from "../types";

const hostAppOrigin = process.env.HOST_APP_ORIGIN || "http://localhost:4200";
const debug = process.env.NODE_ENV === "development";

export function postMessage(message: BridgeRequest) {
  window.postMessage(message, hostAppOrigin);

  if (debug) {
    console.log(`postMessage – `, {
      message,
      targetOrigin: hostAppOrigin,
    });
  }
}
