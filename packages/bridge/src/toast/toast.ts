import { v4 as uuidv4 } from "uuid";
import { makeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import { ShowToastRequestParams, ShowToastRequest } from "./toast.types";

export async function showToast(params: ShowToastRequestParams) {
  const request: ShowToastRequest = {
    id: uuidv4(),
    method: BridgeMethod.SHOW_TOAST,
    params,
  };

  return await makeRequest<ShowToastRequest>(request);
}
