import { makeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import { IsMdmManagedRequest, IsMdmManagedResult } from "./mdm.types";

export function isMdmManaged() {
  const request: IsMdmManagedRequest = {
    id: crypto.randomUUID(),
    method: BridgeMethod.IS_MDM_MANAGED,
  };

  return makeRequest<IsMdmManagedResult>(request);
}
