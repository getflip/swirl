import { log } from "./logging";

describe("logging", () => {
  test("'log' logs to console if in debug mode", async () => {
    (global as any).flipBridgeOptions = {
      debug: true,
    };

    const spy = jest.spyOn(global.console, "log").mockImplementation();

    log("Message 1", { details: "details" });
    expect(spy).toHaveBeenCalledWith("Message 1 – ", { details: "details" });

    (global as any).flipBridgeOptions = {
      debug: false,
    };

    log("Message 2", { details: "details" });
    expect(spy).not.toHaveBeenCalledWith("Message 2 – ", {
      details: "details",
    });
  });
});
