import { v4 as uuidv4 } from "uuid";
import { makeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import {
  CloseModalRequest,
  CloseModalRequestParams,
  CreateModalRequest,
  CreateModalRequestParams,
  DestroyModalRequest,
  DestroyModalRequestParams,
  OpenModalRequest,
  OpenModalRequestParams,
} from "./modal.types";

export async function createModal(params: CreateModalRequestParams) {
  const request: CreateModalRequest = {
    id: uuidv4(),
    method: BridgeMethod.CREATE_MODAL,
    params,
  };

  const result = await makeRequest<CreateModalRequest>(request);

  if (!result) {
    return;
  }

  return {
    id: params.id,
    open: async () => openModal({ id: params.id }),
    close: async () => closeModal({ id: params.id }),
    destroy: async () => destroyModal({ id: params.id }),
  };
}

export async function openModal(params: OpenModalRequestParams) {
  const request: OpenModalRequest = {
    id: uuidv4(),
    method: BridgeMethod.OPEN_MODAL,
    params,
  };

  return makeRequest<OpenModalRequest>(request);
}

export async function closeModal(params: CloseModalRequestParams) {
  const request: CloseModalRequest = {
    id: uuidv4(),
    method: BridgeMethod.CLOSE_MODAL,
    params,
  };

  return makeRequest<CloseModalRequest>(request);
}

export async function destroyModal(params: DestroyModalRequestParams) {
  const request: DestroyModalRequest = {
    id: uuidv4(),
    method: BridgeMethod.DESTROY_MODAL,
    params,
  };

  return makeRequest<DestroyModalRequest>(request);
}
