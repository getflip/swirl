import { v4 as uuidv4 } from "uuid";
import { makeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import {
  CloseDialogRequest,
  CloseDialogRequestParams,
  CreateDialogRequest,
  CreateDialogRequestParams,
  DestroyDialogRequest,
  DestroyDialogRequestParams,
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
    destroy: async () => destroyDialog({ id: params.id }),
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

export async function destroyDialog(params: DestroyDialogRequestParams) {
  const request: DestroyDialogRequest = {
    id: uuidv4(),
    method: BridgeMethod.DESTROY_DIALOG,
    params,
  };

  return makeRequest<DestroyDialogRequest>(request);
}
