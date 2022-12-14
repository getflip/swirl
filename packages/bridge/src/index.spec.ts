import { initFlipBridge } from ".";
import { BridgeOptions } from "./types";

describe("index", () => {
  test("'initFlipBridge' sets global options once", async () => {
    const options: BridgeOptions = {
      hostAppOrigin: "http://localhost",
      debug: true,
    };

    initFlipBridge(options);

    expect((global as any).flipBridgeOptions).toEqual(options);

    const newOptions: BridgeOptions = {
      hostAppOrigin: "http://localhost:3000",
      debug: false,
    };

    const spy = jest.spyOn(global.console, "warn").mockImplementation();

    initFlipBridge(newOptions);

    expect(spy).toHaveBeenCalledWith(
      "'initFlipBridge' has already been called."
    );

    expect((global as any).flipBridgeOptions).not.toEqual(newOptions);
  });
});
