import { BridgeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import { SwirlToastIntent } from "@getflip/swirl-components/loader";

export type ShowToastRequestParams = {
  text: string;
  duration?: number;
  icon?: string;
  intent?: SwirlToastIntent;
};

export type ShowToastRequest = BridgeRequest<
  BridgeMethod.SHOW_TOAST,
  ShowToastRequestParams
>;

export type ShowToastResult = boolean;
