import { BridgeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import { closeDialog, createDialog, openDialog } from "./dialog";
import {
  CloseDialogRequestParams,
  CreateDialogRequestParams,
  OpenDialogRequestParams,
} from "./dialog.types";

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

describe("dialog", () => {
  beforeAll(() => {
    (global as any).flipBridgeOptions = { hostAppOrigin: "http://localhost" };
  });

  test("'createDialog' sends correct request", async () => {
    const params: CreateDialogRequestParams = {
      hideLabel: false,
      id: "my-dialog",
      label: "My Dialog",
      text: "Lorem ipsum",
      intent: "critical",
      primaryAction: {
        label: "Primary",
      },
      secondaryAction: {
        label: "Secondary",
      },
    };

    const spy = jest.fn();

    (window.top as any).postMessage = spy;

    const response = await createDialog(params);

    expect(spy).toHaveBeenCalledWith(
      {
        id: spy.mock.calls[0][0].id,
        method: BridgeMethod.CREATE_DIALOG,
        params,
      },
      "http://localhost"
    );

    expect(response?.id).toBe(params.id);
    expect(typeof response?.close).toBe("function");
    expect(typeof response?.open).toBe("function");
    expect(typeof response?.subscribeToPrimaryActionClick).toBe("function");
    expect(typeof response?.subscribeToSecondaryActionClick).toBe("function");
  });

  test("'openDialog' sends correct request", async () => {
    const params: OpenDialogRequestParams = {
      id: "my-dialog",
    };

    const spy = jest.fn();

    (window.top as any).postMessage = spy;

    const response = await openDialog(params);

    expect(spy).toHaveBeenCalledWith(
      {
        id: spy.mock.calls[0][0].id,
        method: BridgeMethod.OPEN_DIALOG,
        params,
      },
      "http://localhost"
    );

    expect(response).toBe(true);
  });

  test("'closeDialog' sends correct request", async () => {
    const params: CloseDialogRequestParams = {
      id: "my-dialog",
    };

    const spy = jest.fn();

    (window.top as any).postMessage = spy;

    const response = await closeDialog(params);

    expect(spy).toHaveBeenCalledWith(
      {
        id: spy.mock.calls[0][0].id,
        method: BridgeMethod.CLOSE_DIALOG,
        params,
      },
      "http://localhost"
    );

    expect(response).toBe(true);
  });
});
