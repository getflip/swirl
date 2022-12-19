import { FlipDialogIntent } from "@getflip/swirl-components/dist/types/components/flip-dialog/flip-dialog";
import { BridgeRequest } from "../messaging/messaging.types";
import { BridgeMethod } from "../types";

export type CreateDialogRequestParams = {
  hideLabel?: boolean;
  id: string;
  intent?: FlipDialogIntent;
  label: string;
  text: string;
  primaryAction?: {
    label: string;
  };
  secondaryAction?: {
    label: string;
  };
};

export type OpenDialogRequestParams = {
  id: string;
};

export type CloseDialogRequestParams = {
  id: string;
};

export type DestroyDialogRequestParams = {
  id: string;
};

export type CreateDialogRequest = BridgeRequest<
  BridgeMethod.CREATE_DIALOG,
  CreateDialogRequestParams
>;

export type OpenDialogRequest = BridgeRequest<
  BridgeMethod.OPEN_DIALOG,
  OpenDialogRequestParams
>;

export type CloseDialogRequest = BridgeRequest<
  BridgeMethod.CLOSE_DIALOG,
  CloseDialogRequestParams
>;

export type DestroyDialogRequest = BridgeRequest<
  BridgeMethod.DESTROY_DIALOG,
  CloseDialogRequestParams
>;

export type CreateDialogResult = boolean;

export type OpenDialogResult = boolean;

export type CloseDialogResult = boolean;

export type DestroyDialogResult = boolean;
