import { makeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import {
  ShowToastRequest,
  ShowToastRequestParams,
  ShowToastResult,
} from "./toast.types";

export async function showToast(params: ShowToastRequestParams) {
  const request: ShowToastRequest = {
    id: crypto.randomUUID(),
    method: BridgeMethod.SHOW_TOAST,
    params,
  };

  return await makeRequest<ShowToastResult>(request);
}
