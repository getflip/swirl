import { BridgeRequest } from "../messaging/messaging.types";
import { subscribe } from "./events";
import { BridgeEventType } from "./events.types";

jest.mock("../messaging", () => {
  const originalModule = jest.requireActual("../messaging");

  return {
    __esModule: true,
    ...originalModule,
    makeRequest: async (request: BridgeRequest) => {
      originalModule.makeRequest(request);
      return true;
    },
  };
});

describe("events", () => {
  beforeEach(() => {
    (global as any).flipBridgeOptions = { hostAppOrigin: "http://localhost" };
  });

  test("'subscribe' sends subscription request", async () => {
    const spy = jest.fn();

    (window.top as any).postMessage = spy;

    subscribe(BridgeEventType.LANG_CHANGE, () => {});

    expect(spy).toHaveBeenCalledWith(
      {
        id: spy.mock.calls[0][0].id,
        method: "SUBSCRIBE",
        params: {
          id: spy.mock.calls[0][0].params.id,
          type: "LANG_CHANGE",
        },
      },
      "http://localhost"
    );
  });

  test("'subscribe' registers listener with callback function", async () => {
    const callback = jest.fn();

    const unsubscribe = await subscribe(BridgeEventType.LANG_CHANGE, callback, {
      id: "SUBSCRIPTION_ID",
    });

    global.dispatchEvent(
      new MessageEvent("message", {
        source: window,
        origin: (global as any).flipBridgeOptions.hostAppOrigin,
        data: {
          data: "DATA",
          id: "SUBSCRIPTION_ID",
          type: BridgeEventType.LANG_CHANGE,
        },
      })
    );

    expect(callback).toHaveBeenCalledWith({
      data: "DATA",
      id: "SUBSCRIPTION_ID",
      type: "LANG_CHANGE",
    });

    await unsubscribe();
  });

  test("'subscribe' returns function to unsubscribe", async () => {
    const spy = jest.fn();

    (window.top as any).postMessage = spy;

    const unsubscribe = await subscribe(BridgeEventType.LANG_CHANGE, () => {});
    expect(typeof unsubscribe).toBe("function");

    await unsubscribe();
    expect(spy).toHaveBeenCalledWith(
      {
        id: spy.mock.calls[1][0].id,
        method: "UNSUBSCRIBE",
        params: {
          id: spy.mock.calls[1][0].params.id,
          type: "LANG_CHANGE",
        },
      },
      "http://localhost"
    );
  });
});
