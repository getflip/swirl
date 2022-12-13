import { BridgeErrorCode, BridgeMethod, BridgeRequest } from "../types";
import {
  isAllowedOrigin,
  isFlutterApp,
  isResponse,
  postMessage,
} from "./messaging";

describe("messaging", () => {
  const request: BridgeRequest = {
    id: "ID",
    method: BridgeMethod.NAVIGATE,
    params: { path: "/" },
  };

  beforeEach(() => {
    (global as any).flipBridgeOptions = { hostAppOrigin: "http://localhost" };
  });

  test("'postMessage' fails without init call", async () => {
    (global as any).flipBridgeOptions = undefined;

    const postMessageWrapper = () => postMessage(request);

    expect(postMessageWrapper).toThrowError("Please call 'initFlipBridge'.");
  });

  test("'postMessage' posts a request", async () => {
    const spy = jest.fn();

    (window.top as any).postMessage = spy;

    postMessage(request);
    expect(spy).toHaveBeenCalledWith(request, "http://localhost");
  });

  test("'postMessage' posts a request within the Flutter app", async () => {
    const spy = jest.fn();

    (global as any).FlipFlutter = { postMessage: spy };

    postMessage(request);

    expect(isFlutterApp()).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(JSON.stringify(request));
  });

  test("'isResponse' checks response type", async () => {
    expect(isResponse({})).toBe(false);

    expect(
      isResponse({
        id: "test",
      })
    ).toBe(false);

    expect(
      isResponse({
        id: "test",
        error: {
          code: BridgeErrorCode.FORBIDDEN_ORIGIN,
        },
      })
    ).toBe(true);

    expect(
      isResponse({
        id: "test",
        result: true,
      })
    ).toBe(true);

    expect(
      isResponse({
        error: {
          code: BridgeErrorCode.FORBIDDEN_ORIGIN,
        },
      })
    ).toBe(false);
  });

  test("'isAllowedOrigin' validates origins", async () => {
    expect(isAllowedOrigin("http://")).toBe(false);
    expect(isAllowedOrigin("")).toBe(false);
    expect(isAllowedOrigin("http://localhost:3000")).toBe(false);
    expect(isAllowedOrigin("http://localhost")).toBe(true);
  });
});
