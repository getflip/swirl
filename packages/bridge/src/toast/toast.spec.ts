import { BridgeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import { showToast } from "./toast";
import { ShowToastRequestParams } from "./toast.types";

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

describe("toast", () => {
  beforeAll(() => {
    (global as any).flipBridgeOptions = { hostAppOrigin: "http://localhost" };
  });

  test("'showToast' sends correct request", async () => {
    const params: ShowToastRequestParams = {
      text: "My toast",
      duration: 5000,
      icon: "icon",
      intent: "success",
    };

    const spy = jest.fn();

    (window.top as any).postMessage = spy;

    const response = await showToast(params);

    expect(spy).toHaveBeenCalledWith(
      {
        id: spy.mock.calls[0][0].id,
        method: BridgeMethod.SHOW_TOAST,
        params,
      },
      "http://localhost"
    );

    expect(response).toBe(true);
  });
});
