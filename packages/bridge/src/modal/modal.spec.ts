import { BridgeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import { closeModal, createModal, destroyModal, openModal } from "./modal";
import {
  CloseModalRequestParams,
  CreateModalRequestParams,
  DestroyModalRequestParams,
  OpenModalRequestParams,
} from "./modal.types";

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

describe("modal", () => {
  beforeAll(() => {
    (global as any).flipBridgeOptions = { hostAppOrigin: "http://localhost" };
  });

  test("'createModal' sends correct request", async () => {
    const params: CreateModalRequestParams = {
      id: "my-modal",
      label: "My Modal",
      primaryAction: {
        label: "Primary",
      },
      secondaryAction: {
        label: "Secondary",
      },
      url: "http://",
    };

    const spy = jest.fn();

    (window.top as any).postMessage = spy;

    const response = await createModal(params);

    expect(spy).toHaveBeenCalledWith(
      {
        id: spy.mock.calls[0][0].id,
        method: BridgeMethod.CREATE_MODAL,
        params,
      },
      "http://localhost"
    );

    expect(response?.id).toBe(params.id);
    expect(typeof response?.close).toBe("function");
    expect(typeof response?.open).toBe("function");
  });

  test("'openModal' sends correct request", async () => {
    const params: OpenModalRequestParams = {
      id: "my-modal",
    };

    const spy = jest.fn();

    (window.top as any).postMessage = spy;

    const response = await openModal(params);

    expect(spy).toHaveBeenCalledWith(
      {
        id: spy.mock.calls[0][0].id,
        method: BridgeMethod.OPEN_MODAL,
        params,
      },
      "http://localhost"
    );

    expect(response).toBe(true);
  });

  test("'closeModal' sends correct request", async () => {
    const params: CloseModalRequestParams = {
      id: "my-modal",
    };

    const spy = jest.fn();

    (window.top as any).postMessage = spy;

    const response = await closeModal(params);

    expect(spy).toHaveBeenCalledWith(
      {
        id: spy.mock.calls[0][0].id,
        method: BridgeMethod.CLOSE_MODAL,
        params,
      },
      "http://localhost"
    );

    expect(response).toBe(true);
  });

  test("'destroyModal' sends correct request", async () => {
    const params: DestroyModalRequestParams = {
      id: "my-modal",
    };

    const spy = jest.fn();

    (window.top as any).postMessage = spy;

    const response = await destroyModal(params);

    expect(spy).toHaveBeenCalledWith(
      {
        id: spy.mock.calls[0][0].id,
        method: BridgeMethod.DESTROY_MODAL,
        params,
      },
      "http://localhost"
    );

    expect(response).toBe(true);
  });
});
