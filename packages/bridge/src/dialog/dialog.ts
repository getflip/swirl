import { v4 as uuidv4 } from "uuid";
import { BridgeEvent, BridgeEventType, subscribe } from "../events";
import { makeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import {
  CloseDialogRequest,
  CloseDialogRequestParams,
  CreateDialogRequest,
  CreateDialogRequestParams,
  OpenDialogRequest,
  OpenDialogRequestParams,
} from "./dialog.types";

export async function createDialog(params: CreateDialogRequestParams) {
  const request: CreateDialogRequest = {
    id: uuidv4(),
    method: BridgeMethod.CREATE_DIALOG,
    params,
  };

  const result = await makeRequest<CreateDialogRequest>(request);

  if (!result) {
    return;
  }

  return {
    id: params.id,
    open: async () => openDialog({ id: params.id }),
    close: async () => closeDialog({ id: params.id }),
    subscribeToPrimaryActionClick: (
      callback: (event?: BridgeEvent<{ dialogId: string }>) => void
    ) => {
      return subscribe(BridgeEventType.PRIMARY_ACTION_CLICK, callback);
    },
    subscribeToSecondaryActionClick: (
      callback: (event?: BridgeEvent<{ dialogId: string }>) => void
    ) => {
      return subscribe(BridgeEventType.SECONDARY_ACTION_CLICK, callback);
    },
  };
}

export async function openDialog(params: OpenDialogRequestParams) {
  const request: OpenDialogRequest = {
    id: uuidv4(),
    method: BridgeMethod.OPEN_DIALOG,
    params,
  };

  return makeRequest<OpenDialogRequest>(request);
}

export async function closeDialog(params: CloseDialogRequestParams) {
  const request: CloseDialogRequest = {
    id: uuidv4(),
    method: BridgeMethod.CLOSE_DIALOG,
    params,
  };

  return makeRequest<CloseDialogRequest>(request);
}
