import { BridgeRequest } from "../messaging/messaging.types";
import { BridgeMethod } from "../types";

export type CreateModalRequestParams = {
  id: string;
  label: string;
  primaryAction?: {
    label: string;
  };
  secondaryAction?: {
    label: string;
  };
  url: string;
};

export type OpenModalRequestParams = {
  id: string;
};

export type CloseModalRequestParams = {
  id: string;
};

export type DestroyModalRequestParams = {
  id: string;
};

export type CreateModalRequest = BridgeRequest<
  BridgeMethod.CREATE_MODAL,
  CreateModalRequestParams
>;

export type OpenModalRequest = BridgeRequest<
  BridgeMethod.OPEN_MODAL,
  OpenModalRequestParams
>;

export type CloseModalRequest = BridgeRequest<
  BridgeMethod.CLOSE_MODAL,
  CloseModalRequestParams
>;

export type DestroyModalRequest = BridgeRequest<
  BridgeMethod.DESTROY_MODAL,
  CloseModalRequestParams
>;

export type CreateModalResult = boolean;

export type OpenModalResult = boolean;

export type CloseModalResult = boolean;

export type DestroyModalResult = boolean;
